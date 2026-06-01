import { connectionOptions } from './redis.js';

/**
 * Standard configuration options for all added BullMQ jobs.
 */
export const DEFAULT_JOB_OPTIONS = {
  attempts: 3, // Retry failed jobs up to 3 times
  backoff: {
    type: 'exponential',
    delay: 2000, // Exponential retry: 2s, 4s, 8s...
  },
  removeOnComplete: {
    count: 100, // Retain last 100 completed jobs in Redis logs
    age: 24 * 3600, // Auto-prune after 24 hours
  },
  removeOnFail: {
    count: 500, // Retain last 500 failed jobs for debugging
    age: 7 * 24 * 3600, // Auto-prune after 7 days
  },
};

/**
 * Standard default settings for all instantiated Worker loops.
 */
export const DEFAULT_WORKER_OPTIONS = {
  connection: connectionOptions,
  concurrency: 5, // Concurrent tasks handled by a single worker
  limiter: {
    max: 100, // Limit worker load: max 100 jobs processed per 10 seconds
    duration: 10000,
  },
};

export default {
  DEFAULT_JOB_OPTIONS,
  DEFAULT_WORKER_OPTIONS,
};
