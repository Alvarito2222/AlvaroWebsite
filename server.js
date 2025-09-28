import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/AlvaroResume.pdf', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'AlvaroResume.pdf'));
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

async function fetchIPData() {
  const apiKey = process.env.IPTOEARTH_API_KEY || 'your-api-key-here';
  const url = `https://iptoearth.expeditedaddons.com/?api_key=${apiKey}&ip=68.10.149.45`;
  try {
    const response = await fetch(url);
    if (!response.ok) { // or check for response.status
      throw new Error('Network response was not ok: ' + response.statusText);
    }
    const data = await response.json();
    console.log('Response data:', data);
  } catch (error) {
    console.error('Failed to fetch IP data:', error);
  }
}

fetchIPData();


