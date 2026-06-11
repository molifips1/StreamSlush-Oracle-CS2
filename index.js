const http = require('http');

// Create the server object
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('StreamSlush Oracle is running!');
});

// Bind to the correct port and 0.0.0.0 for Railway
const port = process.env.PORT || 3000;
server.listen(port, '0.0.0.0', () => {
  console.log(`StreamSlush Oracle running on port ${port}`);
});
