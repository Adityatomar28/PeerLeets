import { Worker } from 'bullmq';
import { connectionOptions } from '../config/redis.js';
import { DEFAULT_WORKER_OPTIONS } from '../config/bullmq.js';
import reminderJobs from '../jobs/reminder.jobs.js';

export const reminderWorker = new Worker('reminder-queue', async (job) => {
  console.log(`[Reminder Worker] Job ${job.id} started. Task: "${job.name}"`);
  
  if (job.name === 'process-reminders') {
    return reminderJobs.processDailyReminders();
  }
  
  console.warn(`[Reminder Worker] Unknown job name captured: "${job.name}"`);
}, {
  ...DEFAULT_WORKER_OPTIONS,
  connection: connectionOptions,
});

reminderWorker.on('completed', (job, result) => {
  console.log(`[Reminder Worker] Job ${job.id} ("${job.name}") completed. Result:`, JSON.stringify(result));
});

reminderWorker.on('failed', (job, err) => {
  console.error(`[Reminder Worker] Job ${job?.id} ("${job?.name}") failed:`, err.message);
});

export default reminderWorker;
