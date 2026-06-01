import { Queue } from 'bullmq';
import { connectionOptions } from '../config/redis.js';
import { DEFAULT_JOB_OPTIONS } from '../config/bullmq.js';

export const challengeQueue = new Queue('challenge-queue', {
  connection: connectionOptions,
  defaultJobOptions: DEFAULT_JOB_OPTIONS,
});

export default challengeQueue;
