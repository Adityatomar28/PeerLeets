import http from 'http';
import app from './app.js';
import { initSocketServer } from './sockets/socket.server.js';

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

// Initialize Socket.IO and bind it to the HTTP server
initSocketServer(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
