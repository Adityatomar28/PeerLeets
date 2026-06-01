import { Worker } from 'bullmq';
import { connectionOptions } from '../config/redis.js';
import { DEFAULT_WORKER_OPTIONS } from '../config/bullmq.js';
import streakJobs from '../jobs/streak.jobs.js';

export const streakWorker = new Worker('streak-queue', async (job) => {
  console.log(`[Streak Worker] Job ${job.id} started. Task: "${job.name}"`);
  
  if (job.name === 'process-missed-users') {
    const { challengeId, groupId } = job.data;
    if (!challengeId || !groupId) {
      throw new Error("Missing required challengeId or groupId parameters in job payload");
    }
    return streakJobs.processMissedUsers({ challengeId, groupId });
  }
  
  console.warn(`[Streak Worker] Unknown job name captured: "${job.name}"`);
}, {
  ...DEFAULT_WORKER_OPTIONS,
  connection: connectionOptions,
});

streakWorker.on('completed', (job, result) => {
  console.log(`[Streak Worker] Job ${job.id} ("${job.name}") completed. Result:`, JSON.stringify(result));
});

streakWorker.on('failed', (job, err) => {
  console.error(`[Streak Worker] Job ${job?.id} ("${job?.name}") failed:`, err.message);
});

export default streakWorker;
