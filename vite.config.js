import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'
import XLSXModule from 'xlsx'
const XLSX = XLSXModule.default || XLSXModule

const leadsApiPlugin = () => ({
  name: 'leads-api-plugin',
  configureServer(server) {
    server.middlewares.use('/api/leads', (req, res) => {
      if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
          try {
            const data = JSON.parse(body || '{}');
            const filePath = path.resolve(__dirname, 'public/contact_leads.xlsx');
            
            const newRow = {
              "Timestamp": new Date().toLocaleString(),
              "Full Name": data.name || '',
              "Gmail / Insta Handle": data.email || '',
              "Business / Company Name": data.company || '',
              "Target Service Domain": data.service || 'AI Integration',
              "Scope & Budget": data.budget || '₹5k - ₹10k',
              "Project Objectives / Message": data.message || ''
            };

            let workbook;
            let existingData = [];
            
            if (fs.existsSync(filePath)) {
              workbook = XLSX.readFile(filePath);
              const sheetName = workbook.SheetNames[0] || 'Contact Leads';
              const sheet = workbook.Sheets[sheetName];
              if (sheet) {
                existingData = XLSX.utils.sheet_to_json(sheet);
              }
            } else {
              workbook = XLSX.utils.book_new();
            }

            existingData.push(newRow);
            const updatedSheet = XLSX.utils.json_to_sheet(existingData, {
              header: [
                "Timestamp",
                "Full Name",
                "Gmail / Insta Handle",
                "Business / Company Name",
                "Target Service Domain",
                "Scope & Budget",
                "Project Objectives / Message"
              ]
            });

            updatedSheet['!cols'] = [
              { wch: 22 },
              { wch: 22 },
              { wch: 26 },
              { wch: 28 },
              { wch: 24 },
              { wch: 18 },
              { wch: 45 }
            ];

            if (workbook.SheetNames.length === 0) {
              XLSX.utils.book_append_sheet(workbook, updatedSheet, 'Contact Leads');
            } else {
              workbook.Sheets[workbook.SheetNames[0]] = updatedSheet;
            }

            XLSX.writeFile(workbook, filePath);

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, message: 'Lead added to contact_leads.xlsx', lead: newRow }));
          } catch (err) {
            console.error('Error writing to contact_leads.xlsx:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: err.message }));
          }
        });
      } else if (req.method === 'GET') {
        const filePath = path.resolve(__dirname, 'public/contact_leads.xlsx');
        if (fs.existsSync(filePath)) {
          const workbook = XLSX.readFile(filePath);
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const data = XLSX.utils.sheet_to_json(sheet);
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true, leads: data }));
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
