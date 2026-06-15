import { validateEnvironment } from './config/env.js';
import http from 'http';
import app from './app.js';
import { initSocketServer } from './sockets/socket.server.js';

validateEnvironment();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const server = http.createServer(app);

// Initialize Socket.IO and bind it to the HTTP server
initSocketServer(server);

server.listen(PORT, HOST, () => {
  console.log(`Server running on ${HOST}:${PORT}`);
});
