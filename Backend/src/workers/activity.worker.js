import { Worker } from 'bullmq';
import { connectionOptions } from '../config/redis.js';
import { DEFAULT_WORKER_OPTIONS } from '../config/bullmq.js';
import activityService from '../modules/activity/activity.service.js';

export const activityWorker = new Worker('activity-queue', async (job) => {
  console.log(`[Activity Worker] Job ${job.id} started. Event Code: "${job.name}"`);
  
  // Directly delegate log formatting and persistence to the activity service
  await activityService.processEvent({
    type: job.name,
    payload: job.data,
  });
  
}, {
  ...DEFAULT_WORKER_OPTIONS,
  connection: connectionOptions,
});

activityWorker.on('completed', (job) => {
  console.log(`[Activity Worker] Job ${job.id} ("${job.name}") logged successfully`);
});

activityWorker.on('failed', (job, err) => {
  console.error(`[Activity Worker] Job ${job?.id} ("${job?.name}") failed:`, err.message);
});

export default activityWorker;
