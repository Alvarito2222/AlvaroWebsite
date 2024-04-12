import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Specific route for the PDF file
app.get('/AlvaroResume.pdf', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'AlvaroResume.pdf'));
});

// Handle SPA routing by returning the index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


var request = require('request');

request('https://iptoearth.expeditedaddons.com/?api_key=46DML4235XRISJPTV1E02WH7OY9073Z986QKG8BC5F1AUN&ip=68.10.149.45', function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});