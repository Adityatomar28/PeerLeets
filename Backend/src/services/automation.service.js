import challengeQueue from '../queues/challenge.queue.js';
import reminderQueue from '../queues/reminder.queue.js';

/**
 * Initializes and registers repeatable cron schedulers in BullMQ queues.
 * Configured in UTC timezone.
 */
export const startCronSchedulers = async () => {
  console.log("[Automation Service] Registering automated CRON schedulers...");
  
  try {
    // 1. Daily Challenge Creator Slot Scheduling (00:00 UTC)
    // Automatically schedules WAITING challenge slots for active groups
    await challengeQueue.add(
      'create-daily-challenges', 
      {}, 
      {
        repeat: {
          pattern: '0 0 * * *', // UTC midnight
          utc: true,
        },
        jobId: 'cron-create-daily-challenges',
      }
    );
    console.log("[Automation Service] Registered Challenge Creator Cron (Daily at 00:00 UTC)");

    // 2. Daily Challenge Closer Cutoff Trigger (23:59 UTC)
    // Automatically closes active slots and schedules streak evaluations
    await challengeQueue.add(
      'close-daily-challenges', 
      {}, 
      {
        repeat: {
          pattern: '59 23 * * *', // 23:59 UTC
          utc: true,
        },
        jobId: 'cron-close-daily-challenges',
      }
    );
    console.log("[Automation Service] Registered Challenge Closer Cron (Daily at 23:59 UTC)");

    // 3. Solve Reminders Engagement Engine (Every 30 minutes)
    // Runs periodically to verify solving status and alert at-risk streaks
    await reminderQueue.add(
      'process-reminders', 
      {}, 
      {
        repeat: {
          pattern: '*/30 * * * *', // Every 30 minutes
          utc: true,
        },
        jobId: 'cron-process-reminders',
      }
    );
    console.log("[Automation Service] Registered Periodic Solve Reminder Cron (Every 30 minutes)");

    console.log("[Automation Service] Repeatable CRON schedulers registered successfully.");
  } catch (err) {
    console.error("[Automation Service] Error registering repeatable cron schedulers:", err.message);
  }
};

/**
 * Helper utility to stop or clear repeatable schedulers.
 * Extremely useful during deployments, restarts, or test runs.
 */
export const clearCronSchedulers = async () => {
  console.log("[Automation Service] Clearing registered repeatable jobs...");
  
  try {
    // Clean up repeatable challenges
    const challengeRepeatables = await challengeQueue.getRepeatableJobs();
    for (const job of challengeRepeatables) {
      await challengeQueue.removeRepeatableByKey(job.key);
      console.log(`[Automation] Removed challenge repeatable job: ${job.name}`);
    }

    // Clean up repeatable reminders
    const reminderRepeatables = await reminderQueue.getRepeatableJobs();
    for (const job of reminderRepeatables) {
      await reminderQueue.removeRepeatableByKey(job.key);
      console.log(`[Automation] Removed reminder repeatable job: ${job.name}`);
    }
    
    console.log("[Automation Service] Finished clearing repeatable cron schedulers.");
  } catch (err) {
    console.error("[Automation Service] Error clearing cron schedulers:", err.message);
  }
};

export default {
  startCronSchedulers,
  clearCronSchedulers,
};
