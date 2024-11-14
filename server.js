const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'public_html' directory
app.use(express.static(path.join(__dirname, 'public_html')));

// Catch-all route to send 'index.html' for any request
// This is important for single-page applications (SPAs) to handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public_html', 'index.html'));
});

module.exports = app;