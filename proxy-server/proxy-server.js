const express = require('express');
const httpProxy = require('http-proxy');
const cors = require('cors');

const app = express();
const apiProxy = httpProxy.createProxyServer();

// Use cors middleware
app.use(cors());

// Define a route for your API
app.all('/api/*', (req, res) => {
  // Forward the request to the API server
  apiProxy.web(req, res, { target: 'http://10.20.101.220:880' });
});

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});