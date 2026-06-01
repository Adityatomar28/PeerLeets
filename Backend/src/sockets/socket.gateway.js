import { CLIENT_EVENTS, SERVER_EVENTS } from "./socket.events.js";
import { joinGroupRoom, leaveGroupRoom } from "./socket.rooms.js";

// Global reference to Socket.IO server instance
let ioInstance = null;

// Simple in-memory sliding-window rate limiter cache
// socketId -> Array of execution timestamps
const rateLimiterCache = new Map();
const RATE_WINDOW_MS = 10000; // 10-second window
const RATE_MAX_BURST = 10;   // Maximum 10 events per window

/**
 * Checks if a socket has exceeded its operation rate limits.
 * Protects server against socket room join/leave spam.
 */
const checkRateLimit = (socketId) => {
  const now = Date.now();
  if (!rateLimiterCache.has(socketId)) {
    rateLimiterCache.set(socketId, [now]);
    return false;
  }

  const timestamps = rateLimiterCache.get(socketId).filter(ts => now - ts < RATE_WINDOW_MS);
  if (timestamps.length >= RATE_MAX_BURST) {
    return true;
  }

  timestamps.push(now);
  rateLimiterCache.set(socketId, timestamps);
  return false;
};

/**
 * Clears the rate limit tracking history for a disconnected socket.
 */
const clearRateLimit = (socketId) => {
  rateLimiterCache.delete(socketId);
};

/**
 * Set the global io instance context.
 */
export const setIoInstance = (io) => {
  ioInstance = io;
};

/**
 * Retrieve the active global Socket.IO instance.
 */
export const getIoInstance = () => {
  return ioInstance;
};

/**
 * Broadcasts an event to a specific group's room channel.
 * Designed to be Redis-adapter safe: works out-of-the-box in multi-server horizontal configurations
 * once the Socket.IO Redis adapter is configured, as it uses the standard room emission protocol.
 * Gracefully degrades with logs if Socket.IO is not yet initialized.
 */
export const sendToGroup = (groupId, eventName, payload) => {
  if (!ioInstance) {
    console.warn(`[Socket Gateway] Broadcast attempted on group "${groupId}" but Socket.IO server is not running.`);
    return false;
  }
  try {
    const roomName = `group:${groupId}`;
    ioInstance.to(roomName).emit(eventName, payload);
    console.log(`[Socket Gateway] Broadcast -> Room "${roomName}" | Event: "${eventName}"`);
    return true;
  } catch (err) {
    console.error(`[Socket Gateway] Broadcast failed to room "group:${groupId}":`, err.message);
    return false;
  }
};

/**
 * Initializes listeners for incoming socket connections and handles client-to-server commands.
 */
export const initGatewayListeners = (io) => {
  setIoInstance(io);

  io.on("connection", (socket) => {
    const userName = socket.user?.name || "Unknown";
    const userId = socket.user?.id || "Unknown";

    console.log(`[Socket Gateway] Connection established | Socket ID: ${socket.id} | User: ${userName} (${userId})`);

    // Handle group room join request
    socket.on(CLIENT_EVENTS.JOIN_GROUP, async (data = {}) => {
      const { groupId } = data;
      
      if (checkRateLimit(socket.id)) {
        console.warn(`[Socket Gateway] Rate Limit Tripped | Socket: ${socket.id} | Action: JOIN`);
        socket.emit(SERVER_EVENTS.ERROR, {
          message: "Rate limit exceeded. Please wait before joining rooms again.",
          code: "RATE_LIMIT_EXCEEDED"
        });
        return;
      }

      await joinGroupRoom(socket, groupId);
    });

    // Handle group room leave request
    socket.on(CLIENT_EVENTS.LEAVE_GROUP, async (data = {}) => {
      const { groupId } = data;

      if (checkRateLimit(socket.id)) {
        console.warn(`[Socket Gateway] Rate Limit Tripped | Socket: ${socket.id} | Action: LEAVE`);
        socket.emit(SERVER_EVENTS.ERROR, {
          message: "Rate limit exceeded. Please wait before leaving rooms again.",
          code: "RATE_LIMIT_EXCEEDED"
        });
        return;
      }

      await leaveGroupRoom(socket, groupId);
    });

    // Handle connection termination
    socket.on("disconnect", () => {
      console.log(`[Socket Gateway] Connection closed | Socket ID: ${socket.id} | User: ${userName} (${userId})`);
      clearRateLimit(socket.id);
    });
  });
};

export default {
  setIoInstance,
  getIoInstance,
  sendToGroup,
  initGatewayListeners,
};
