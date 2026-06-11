const http = require('http');
const { WebSocketServer } = require('ws');

// Standard HTTP server for health checks
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('StreamSlush Oracle is running!');
});

// Initialize WebSocket Server attached to the HTTP server
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Connection established with a Relay App');

  // Listen for live CS2 GSI events sent from the streamer's local app
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      
      // Example: Detect round over events
      if (data.round && data.round.phase === 'over') {
        console.log(`Round ended. Winner: ${data.round.win_team}`);
        // TODO: Trigger Smart Contract resolution here
      }

    } catch (error) {
      console.error('Failed to parse incoming event payload:', error.message);
    }
  });

  ws.on('close', () => {
    console.log('Relay App disconnected');
  });
});

// Bind to Railway environment parameters
const port = process.env.PORT || 3000;
server.listen(port, '0.0.0.0', () => {
  console.log(`StreamSlush Oracle and WebSocket running on port ${port}`);
});
