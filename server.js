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

// IP Geolocation Service for Analytics
async function initIPGeolocation() {
  if (!process.env.IPTOEARTH_API_KEY) {
    console.log('IP geolocation service not configured');
    return;
  }

  const apiKey = process.env.IPTOEARTH_API_KEY;
  
  // Add endpoint for client-side IP lookup
  app.get('/api/visitor-info', async (req, res) => {
    try {
      const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      const url = `https://iptoearth.expeditedaddons.com/?api_key=${apiKey}&ip=${clientIP}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('IP service unavailable');
      }
      
      const data = await response.json();
      
      // Return only non-sensitive location data
      res.json({
        country: data.country,
        region: data.region,
        city: data.city,
        timezone: data.timezone
      });
    } catch (error) {
      console.error('IP geolocation error:', error);
      res.status(500).json({ error: 'Service unavailable' });
    }
  });
}

initIPGeolocation();


