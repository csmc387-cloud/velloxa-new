import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'
import ExcelJS from 'exceljs'

const leadsApiPlugin = () => ({
  name: 'leads-api-plugin',
  configureServer(server) {
    server.middlewares.use('/api/leads', async (req, res) => {
      const filePath = path.resolve(__dirname, 'public/contact_leads.xlsx');
      if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', async () => {
          try {
            const data = JSON.parse(body || '{}');
            const newRow = [
              new Date().toLocaleString(),
              data.name || '',
              data.email || '',
              data.company || '',
              data.service || 'AI Integration',
              data.budget || '₹5k - ₹10k',
              data.message || ''
            ];

            const workbook = new ExcelJS.Workbook();
            let worksheet;

            if (fs.existsSync(filePath)) {
              await workbook.xlsx.readFile(filePath);
              worksheet = workbook.getWorksheet('Contact Leads') || workbook.worksheets[0];
            } else {
              worksheet = workbook.addWorksheet('Contact Leads');
              worksheet.columns = [
                { header: 'Timestamp', key: 'timestamp', width: 22 },
                { header: 'Full Name', key: 'name', width: 22 },
                { header: 'Gmail / Insta Handle', key: 'email', width: 26 },
                { header: 'Business / Company Name', key: 'company', width: 28 },
                { header: 'Target Service Domain', key: 'service', width: 24 },
                { header: 'Scope & Budget', key: 'budget', width: 18 },
                { header: 'Project Objectives / Message', key: 'message', width: 45 }
              ];
            }

            worksheet.addRow(newRow);
            await workbook.xlsx.writeFile(filePath);

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, message: 'Lead added to contact_leads.xlsx', lead: data }));
          } catch (err) {
            console.error('Error writing to contact_leads.xlsx:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: err.message }));
          }
        });
      } else if (req.method === 'GET') {
        if (fs.existsSync(filePath)) {
          const workbook = new ExcelJS.Workbook();
          await workbook.xlsx.readFile(filePath);
          const worksheet = workbook.getWorksheet('Contact Leads') || workbook.worksheets[0];
          const leads = [];
          worksheet.eachRow((row, rowNumber) => {
            if (rowNumber > 1) {
              leads.push({
                "Timestamp": row.getCell(1).value,
                "Full Name": row.getCell(2).value,
                "Gmail / Insta Handle": row.getCell(3).value,
                "Business / Company Name": row.getCell(4).value,
                "Target Service Domain": row.getCell(5).value,
                "Scope & Budget": row.getCell(6).value,
                "Project Objectives / Message": row.getCell(7).value
              });
            }
          });
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true, leads }));
        } else {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true, leads: [] }));
        }
      }
    });
  }
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), leadsApiPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three') || id.includes('shadergradient')) {
              return 'vendor-three';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-framer';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-lucide';
            }
            if (id.includes('react')) {
              return 'vendor-react';
            }
          }
        }
      }
    }
  }
})
