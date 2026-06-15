import './env.js';
import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL;
const redisHost = process.env.REDIS_HOST || '127.0.0.1';
const redisPort = parseInt(process.env.REDIS_PORT || '6379', 10);

// Configuration options required for BullMQ compatibility
export const connectionOptions = redisUrl
  ? {
      url: redisUrl,
      maxRetriesPerRequest: null, // Required by BullMQ
    }
  : {
      host: redisHost,
      port: redisPort,
      maxRetriesPerRequest: null, // Required by BullMQ
    };

/**
 * Factory helper to create new Redis client instances.
 * Useful when multiple connections are needed by BullMQ producers, workers, or subscribers.
 */
export const createRedisClient = () => {
  if (redisUrl) {
    return new Redis(redisUrl, { maxRetriesPerRequest: null });
  }
  return new Redis({
    host: redisHost,
    port: redisPort,
    maxRetriesPerRequest: null,
  });
};

export default {
  connectionOptions,
  createRedisClient,
};
