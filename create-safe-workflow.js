const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Read the workflow file
const workflowPath = path.join(__dirname, 'workflows', 'workflow_translate ALL__file__srt_in_folder_of_drive_from_english_to_vnese.json');
const workflow = JSON.parse(fs.readFileSync(workflowPath, 'utf8'));

// Replace sensitive values with environment variables
function replaceSensitiveData(obj) {
  if (typeof obj === 'object' && obj !== null) {
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        replaceSensitiveData(obj[key]);
      } else if (typeof obj[key] === 'string') {
        // Replace credential IDs
        if (obj[key] === process.env.GOOGLE_DRIVE_CREDENTIAL_ID) {
          obj[key] = '${GOOGLE_DRIVE_CREDENTIAL_ID}';
        }
        if (obj[key] === process.env.GOOGLE_GEMINI_CREDENTIAL_ID) {
          obj[key] = '${GOOGLE_GEMINI_CREDENTIAL_ID}';
        }
        if (obj[key] === process.env.WEBHOOK_ID) {
          obj[key] = '${WEBHOOK_ID}';
        }
        if (obj[key] === process.env.INSTANCE_ID) {
          obj[key] = '${INSTANCE_ID}';
        }
        if (obj[key] === process.env.VERSION_ID) {
          obj[key] = '${VERSION_ID}';
        }
        if (obj[key] === process.env.WORKFLOW_ID) {
          obj[key] = '${WORKFLOW_ID}';
        }
      }
    }
  }
}

// Create a safe version of the workflow
const safeWorkflow = JSON.parse(JSON.stringify(workflow));
replaceSensitiveData(safeWorkflow);

// Save the safe version
const safeWorkflowPath = path.join(__dirname, 'workflows', 'srt-translation-safe.json');
fs.writeFileSync(safeWorkflowPath, JSON.stringify(safeWorkflow, null, 2));

console.log('Safe workflow created at:', safeWorkflowPath);
console.log('This version can be safely shared publicly.');
