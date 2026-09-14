import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import pg from 'pg';

const { Pool } = pg;

const CRM_BASE_DIR = '/Users/cosmic/new brand crm ';
const CRM_CONTAINER_NAME = 'newbrandcrm-web-1';
const CRM_DB_URL = process.env.CRM_DATABASE_URL || 'postgres://postgres:changeme_in_production@localhost:5432/agency_crm';
const DEFAULT_ORG_ID = '00000000-0000-0000-0000-000000000001';

let poolInstance = null;

function getCrmPool() {
  if (!poolInstance) {
    poolInstance = new Pool({
      connectionString: CRM_DB_URL,
      max: 5,
      idleTimeoutMillis: 10000,
      connectionTimeoutMillis: 3000,
    });
    poolInstance.on('error', (err) => {
      console.warn('[CRM Sync DB Pool] Warning:', err.message);
    });
  }
  return poolInstance;
}

/**
 * Copies the freshly updated contact_leads.csv and contact_leads.xlsx
 * across all CRM filesystem locations and into the live Docker container.
 */
export async function syncFilesToCrmDirectories(sourceCsvPath, sourceXlsxPath) {
  const syncResults = { filesCopied: [], dockerCopied: false, errors: [] };

  const targetDirs = [
    path.join(process.cwd(), 'public'),
    path.join(CRM_BASE_DIR, 'contacts'),
    path.join(CRM_BASE_DIR, 'packages', 'web', 'public'),
    path.join(CRM_BASE_DIR, 'leads_data'),
  ];

  for (const dir of targetDirs) {
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      if (sourceCsvPath && fs.existsSync(sourceCsvPath)) {
        const destCsv = path.join(dir, 'contact_leads.csv');
        fs.copyFileSync(sourceCsvPath, destCsv);
        syncResults.filesCopied.push(destCsv);
      }

      if (sourceXlsxPath && fs.existsSync(sourceXlsxPath)) {
        const destXlsx = path.join(dir, 'contact_leads.xlsx');
        fs.copyFileSync(sourceXlsxPath, destXlsx);
        syncResults.filesCopied.push(destXlsx);
      }
    } catch (err) {
      console.warn(`[CRM Sync] File copy warning for ${dir}:`, err.message);
      syncResults.errors.push(`File copy to ${dir}: ${err.message}`);
    }
  }

  // Sync directly into live Docker container if active
  if (sourceCsvPath && fs.existsSync(sourceCsvPath)) {
    try {
      await new Promise((resolve) => {
        exec(`docker cp "${sourceCsvPath}" ${CRM_CONTAINER_NAME}:/app/packages/web/public/contact_leads.csv`, (err) => {
          if (!err) {
            syncResults.dockerCopied = true;
            console.log('[CRM Sync] Docker CSV hot-sync complete');
          }
          resolve();
        });
      });
    } catch (dErr) {
      console.warn('[CRM Sync] Docker CSV sync skipped:', dErr.message);
    }
  }

  if (sourceXlsxPath && fs.existsSync(sourceXlsxPath)) {
    try {
      await new Promise((resolve) => {
        exec(`docker cp "${sourceXlsxPath}" ${CRM_CONTAINER_NAME}:/app/packages/web/public/contact_leads.xlsx`, () => {
          resolve();
        });
      });
    } catch (dErr) {
      // ignore
    }
  }

  return syncResults;
}

/**
 * Inserts the lead directly into PostgreSQL tables:
 * contacts, deals, and pipeline_cards (under "Lead In" stage)
 */
export async function syncLeadToCrmDatabase(leadRecord) {
  try {
    const pool = getCrmPool();
    const { name, email, company, service, budget, message, timestamp } = leadRecord;

    // 1. Resolve pipeline & Lead In stage
    let stageRes = await pool.query(
      `SELECT s.id 
       FROM stages s 
       JOIN pipelines p ON s.pipeline_id = p.id 
       WHERE p.org_id = $1 AND s.name = 'Lead In' 
       LIMIT 1`,
      [DEFAULT_ORG_ID]
    );

    let stageId = stageRes.rows[0]?.id;

    if (!stageId) {
      // Ensure pipeline exists
      let pRes = await pool.query(
        'SELECT id FROM pipelines WHERE org_id = $1 LIMIT 1',
        [DEFAULT_ORG_ID]
      );
      let pipelineId = pRes.rows[0]?.id;
      if (!pipelineId) {
        const newP = await pool.query(
          'INSERT INTO pipelines (org_id, name, position) VALUES ($1, $2, 0) RETURNING id',
          [DEFAULT_ORG_ID, 'Sales Pipeline']
        );
        pipelineId = newP.rows[0].id;
      }

      // Create Lead In stage if missing
      const newStage = await pool.query(
        `INSERT INTO stages (pipeline_id, name, color, position)
         VALUES ($1, 'Lead In', '#FFFFFF', 0) RETURNING id`,
        [pipelineId]
      );
      stageId = newStage.rows[0].id;
    }

    // 2. Parse deal value
    let dealValue = 10000;
    if (budget && (budget.includes('15k - ₹20k') || budget.includes('20k'))) {
      dealValue = 20000;
    } else if (budget && budget.includes('10k - ₹15k')) {
      dealValue = 15000;
    }

    // 3. Insert or update contact
    const contactRes = await pool.query(
      `INSERT INTO contacts (org_id, first_name, email, custom_fields, lead_score)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [
        DEFAULT_ORG_ID,
        name,
        email,
        JSON.stringify({
          company: company || 'Independent',
          service: service || 'AI Integration',
          budget: budget || '₹5k - ₹10k',
          message: message || '',
          source: 'Velloxa Website',
          submittedAt: timestamp || new Date().toISOString(),
        }),
        85,
      ]
    );

    const contactId = contactRes.rows[0].id;

    // 4. Create Deal
    const dealRes = await pool.query(
      `INSERT INTO deals (org_id, contact_id, value, currency, status)
       VALUES ($1, $2, $3, 'INR', 'open')
       RETURNING id`,
      [DEFAULT_ORG_ID, contactId, dealValue]
    );
    const dealId = dealRes.rows[0].id;

    // 5. Create Pipeline Card under "Lead In"
    const cardRes = await pool.query(
      `INSERT INTO pipeline_cards (stage_id, contact_id, deal_id, position)
       VALUES ($1, $2, $3, 0)
       RETURNING id`,
      [stageId, contactId, dealId]
    );

    console.log('[CRM Sync] Lead successfully committed to PostgreSQL database:', {
      contactId,
      dealId,
      pipelineCardId: cardRes.rows[0].id,
      stage: 'Lead In',
    });

    return {
      success: true,
      contactId,
      dealId,
      pipelineCardId: cardRes.rows[0].id,
    };
  } catch (dbErr) {
    console.warn('[CRM Sync DB Error] (Non-fatal, files preserved):', dbErr.message);
    return { success: false, error: dbErr.message };
  }
}
