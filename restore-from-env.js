const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Read the safe workflow file
const safeWorkflowPath = path.join(__dirname, 'workflows', 'srt-translation-safe.json');
if (!fs.existsSync(safeWorkflowPath)) {
  console.error('Safe workflow file not found. Run "npm run create-safe" first.');
  process.exit(1);
}

const workflow = JSON.parse(fs.readFileSync(safeWorkflowPath, 'utf8'));

// Replace environment variable placeholders with actual values
function restoreRealValues(obj) {
  if (typeof obj === 'object' && obj !== null) {
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        restoreRealValues(obj[key]);
      } else if (typeof obj[key] === 'string') {
        // Replace environment variable placeholders
        obj[key] = obj[key]
          .replace('${GOOGLE_DRIVE_CREDENTIAL_ID}', process.env.GOOGLE_DRIVE_CREDENTIAL_ID || '')
          .replace('${GOOGLE_GEMINI_CREDENTIAL_ID}', process.env.GOOGLE_GEMINI_CREDENTIAL_ID || '')
          .replace('${WEBHOOK_ID}', process.env.WEBHOOK_ID || '')
          .replace('${INSTANCE_ID}', process.env.INSTANCE_ID || '')
          .replace('${VERSION_ID}', process.env.VERSION_ID || '')
          .replace('${WORKFLOW_ID}', process.env.WORKFLOW_ID || '');
      }
    }
  }
}

// Create a restored version of the workflow
const restoredWorkflow = JSON.parse(JSON.stringify(workflow));
restoreRealValues(restoredWorkflow);

// Save the restored version
const restoredWorkflowPath = path.join(__dirname, 'workflows', 'srt-translation-restored.json');
fs.writeFileSync(restoredWorkflowPath, JSON.stringify(restoredWorkflow, null, 2));

console.log('Restored workflow created at:', restoredWorkflowPath);
console.log('This version contains your real credentials and can be imported to n8n.');
