import jwt from "jsonwebtoken";
import { findUserById } from "../modules/auth/auth.repository.js";

/**
 * Socket.IO connection authentication middleware.
 * Validates the JWT on connection, fetches and verifies user existence,
 * and attaches a sanitized user object to the socket instance.
 */
export const socketAuthMiddleware = async (socket, next) => {
  try {
    let token = socket.handshake.auth?.token || socket.handshake.headers?.authorization;

    if (!token) {
      const err = new Error("Authentication error: Token missing");
      err.data = { code: 'TOKEN_MISSING' };
      return next(err);
    }

    // Handle Bearer token prefix if supplied
    if (typeof token === 'string' && token.startsWith('Bearer ')) {
      token = token.slice(7);
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        const error = new Error("Authentication error: Token expired");
        error.data = { code: 'TOKEN_EXPIRED' };
        return next(error);
      }
      const error = new Error("Authentication error: Invalid token");
      error.data = { code: 'INVALID_TOKEN' };
      return next(error);
    }

    if (!decodedToken || !decodedToken.id) {
      const err = new Error("Authentication error: Malformed token payload");
      err.data = { code: 'MALFORMED_TOKEN' };
      return next(err);
    }

    const user = await findUserById(decodedToken.id);

    if (!user) {
      const err = new Error("Authentication error: User revoked or deleted");
      err.data = { code: 'USER_REVOKED' };
      return next(err);
    }

    // Attach sanitized user context to socket session
    socket.user = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    console.log(`[Socket Auth] User Authenticated: ${user.name} (${user.id})`);
    next();
  } catch (error) {
    console.error("[Socket Auth] Internal authentication server error:", error.message);
    const err = new Error("Authentication error: Internal error");
    err.data = { code: 'INTERNAL_ERROR' };
    return next(err);
  }
};

export default socketAuthMiddleware;
