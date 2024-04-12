const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'dist'))); // Serve static files

// Place this before any other route definitions
app.get('/AlvaroResume.pdf', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'AlvaroResume.pdf'));
});

// Catch-all handler for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
