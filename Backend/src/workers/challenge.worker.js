import { Worker } from 'bullmq';
import { connectionOptions } from '../config/redis.js';
import { DEFAULT_WORKER_OPTIONS } from '../config/bullmq.js';
import challengeJobs from '../jobs/challenge.jobs.js';

export const challengeWorker = new Worker('challenge-queue', async (job) => {
  console.log(`[Challenge Worker] Job ${job.id} started. Task: "${job.name}"`);
  
  if (job.name === 'create-daily-challenges') {
    return challengeJobs.processCreateDailyChallenges();
  }
  
  if (job.name === 'close-daily-challenges') {
    return challengeJobs.processCloseChallenges();
  }
  
  console.warn(`[Challenge Worker] Unknown job name captured: "${job.name}"`);
}, {
  ...DEFAULT_WORKER_OPTIONS,
  connection: connectionOptions,
});

challengeWorker.on('completed', (job, result) => {
  console.log(`[Challenge Worker] Job ${job.id} ("${job.name}") completed. Result:`, JSON.stringify(result));
});

challengeWorker.on('failed', (job, err) => {
  console.error(`[Challenge Worker] Job ${job?.id} ("${job?.name}") failed:`, err.message);
});

export default challengeWorker;
