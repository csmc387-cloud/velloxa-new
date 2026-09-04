import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import ExcelJS from 'exceljs';

const HEADERS = [
  'Timestamp',
  'Full Name',
  'Gmail / Insta Handle',
  'Business / Company Name',
  'Target Service Domain',
  'Scope & Budget',
  'Project Objectives / Message',
];

const COLUMN_KEYS = [
  { header: 'Timestamp', key: 'timestamp', width: 24 },
  { header: 'Full Name', key: 'name', width: 24 },
  { header: 'Gmail / Insta Handle', key: 'email', width: 28 },
  { header: 'Business / Company Name', key: 'company', width: 30 },
  { header: 'Target Service Domain', key: 'service', width: 26 },
  { header: 'Scope & Budget', key: 'budget', width: 20 },
  { header: 'Project Objectives / Message', key: 'message', width: 50 },
];

function getFormattedTimestamp() {
  return new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
}

function escapeCsvField(field) {
  if (field === null || field === undefined) return '""';
  const str = String(field).replace(/"/g, '""');
  return `"${str}"`;
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, company, service, budget, message } = data || {};

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required.' },
        { status: 400 }
      );
    }

    const timestamp = getFormattedTimestamp();
    const leadRecord = {
      timestamp,
      name: String(name || '').trim(),
      email: String(email || '').trim(),
      company: String(company || '').trim(),
      service: String(service || 'AI Integration').trim(),
      budget: String(budget || '₹5k - ₹10k').trim(),
      message: String(message || '').trim(),
    };

    console.log('[VELOXA INTAKE LEAD RECEIVED]', leadRecord);

    const publicDir = path.join(process.cwd(), 'public');
    const xlsxPath = path.join(publicDir, 'contact_leads.xlsx');
    const csvPath = path.join(publicDir, 'contact_leads.csv');

    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // 1. Update XLSX Workbook using ExcelJS
    try {
      const workbook = new ExcelJS.Workbook();
      let worksheet;

      if (fs.existsSync(xlsxPath)) {
        await workbook.xlsx.readFile(xlsxPath);
        worksheet = workbook.getWorksheet('Contact Leads') || workbook.worksheets[0];
      }

      if (!worksheet) {
        worksheet = workbook.addWorksheet('Contact Leads');
        worksheet.columns = COLUMN_KEYS;
        const headerRow = worksheet.getRow(1);
        headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
        headerRow.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF1A1A1A' },
        };
      }

      // Add Row matching the exact sections
      const row = worksheet.addRow([
        leadRecord.timestamp,
        leadRecord.name,
        leadRecord.email,
        leadRecord.company,
        leadRecord.service,
        leadRecord.budget,
        leadRecord.message,
      ]);

      row.alignment = { vertical: 'middle', horizontal: 'left' };

      await workbook.xlsx.writeFile(xlsxPath);
      console.log('[VELOXA INTAKE LEAD] Successfully appended to XLSX:', xlsxPath);
    } catch (xlsxErr) {
      console.warn('[VELOXA INTAKE LEAD] XLSX Write Warning:', xlsxErr.message);
      // Fallback for read-only serverless container
      try {
        const tmpXlsx = path.join('/tmp', 'contact_leads.xlsx');
        const tmpWb = new ExcelJS.Workbook();
        if (fs.existsSync(tmpXlsx)) {
          await tmpWb.xlsx.readFile(tmpXlsx);
        }
        const ws = tmpWb.getWorksheet('Contact Leads') || tmpWb.addWorksheet('Contact Leads');
        if (ws.rowCount === 0) ws.columns = COLUMN_KEYS;
        ws.addRow([
          leadRecord.timestamp,
          leadRecord.name,
          leadRecord.email,
          leadRecord.company,
          leadRecord.service,
          leadRecord.budget,
          leadRecord.message,
        ]);
        await tmpWb.xlsx.writeFile(tmpXlsx);
      } catch (tmpErr) {
        console.error('[VELOXA INTAKE LEAD] Temp XLSX write failed:', tmpErr.message);
      }
    }

    // 2. Synchronize CSV backup
    try {
      const csvLine = [
        escapeCsvField(leadRecord.timestamp),
        escapeCsvField(leadRecord.name),
        escapeCsvField(leadRecord.email),
        escapeCsvField(leadRecord.company),
        escapeCsvField(leadRecord.service),
        escapeCsvField(leadRecord.budget),
        escapeCsvField(leadRecord.message),
      ].join(',') + '\n';

      if (!fs.existsSync(csvPath)) {
        const csvHeader = HEADERS.map(escapeCsvField).join(',') + '\n';
        fs.writeFileSync(csvPath, csvHeader + csvLine, 'utf8');
      } else {
        fs.appendFileSync(csvPath, csvLine, 'utf8');
      }
      console.log('[VELOXA INTAKE LEAD] Successfully appended to CSV:', csvPath);
    } catch (csvErr) {
      console.warn('[VELOXA INTAKE LEAD] CSV Write Warning:', csvErr.message);
    }

    return NextResponse.json({
      success: true,
      message: 'Lead captured and appended to contact_leads.xlsx successfully.',
      lead: leadRecord,
    });
  } catch (error) {
    console.error('Lead processing error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process lead intake.' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const download = searchParams.get('download');
    const xlsxPath = path.join(process.cwd(), 'public', 'contact_leads.xlsx');

    if (download === '1' && fs.existsSync(xlsxPath)) {
      const fileBuffer = fs.readFileSync(xlsxPath);
      return new Response(fileBuffer, {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': 'attachment; filename="contact_leads.xlsx"',
        },
      });
    }

    if (fs.existsSync(xlsxPath)) {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(xlsxPath);
      const worksheet = workbook.getWorksheet('Contact Leads') || workbook.worksheets[0];
      const leads = [];

      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
          const values = row.values;
          leads.push({
            timestamp: values[1] || '',
            name: values[2] || '',
            email: values[3] || '',
            company: values[4] || '',
            service: values[5] || '',
            budget: values[6] || '',
            message: values[7] || '',
          });
        }
      });

      return NextResponse.json({
        success: true,
        count: leads.length,
        leads,
      });
    }

    return NextResponse.json({
      success: true,
      count: 0,
      leads: [],
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
