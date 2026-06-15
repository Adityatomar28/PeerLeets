import { Server } from "socket.io";
import { socketAuthMiddleware } from "./socket.middleware.js";
import { initGatewayListeners } from "./socket.gateway.js";

/**
 * Bootstraps the Socket.IO server by attaching to the standard Node HTTP server.
 * Installs connection authorization middleware and wires up gateway channels.
 * 
 * @param {object} httpServer The native Node HTTP server instance
 * @returns {Server} Configured Socket.IO server instance
 */
export const initSocketServer = (httpServer) => {
  console.log("[Socket Server] Binding Socket.IO to HTTP server...");

  const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173,http://localhost:5174')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  const io = new Server(httpServer, {
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST"],
      credentials: true,
    },
    // Configured for resilience against browser disconnects and reconnect storms
    pingTimeout: 60000,
    pingInterval: 25000,
    connectTimeout: 45000,
  });

  // Register JWT authentication middleware at connection handshake
  io.use(socketAuthMiddleware);

  // Wire up connection and room managers
  initGatewayListeners(io);

  console.log("[Socket Server] Realtime server bound and active");
  return io;
};

export default initSocketServer;
