import { Queue } from 'bullmq';
import { connectionOptions } from '../config/redis.js';
import { DEFAULT_JOB_OPTIONS } from '../config/bullmq.js';

export const activityQueue = new Queue('activity-queue', {
  connection: connectionOptions,
  defaultJobOptions: DEFAULT_JOB_OPTIONS,
});

export default activityQueue;
