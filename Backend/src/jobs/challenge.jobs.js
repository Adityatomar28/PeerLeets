import prisma from '../config/db.js';
import challengeRepository from '../modules/challenge/challenge.repository.js';
import challengeService from '../modules/challenge/challenge.service.js';
import challengeUtils from '../modules/challenge/challenge.utils.js';
import streakQueue from '../queues/streak.queue.js';
import activityQueue from '../queues/activity.queue.js';

/**
 * Iterates through all groups in the system to create a daily WAITING challenge slot.
 * Made idempotent: checks if today's slot already exists for each group before generating.
 */
export const processCreateDailyChallenges = async () => {
  console.log("Starting bulk daily challenge slot creation...");
  const groups = await prisma.group.findMany({ select: { id: true, name: true } });
  
  let createdCount = 0;
  let skippedCount = 0;
  
  for (const group of groups) {
    try {
      const today = challengeUtils.getTodayUtc();
      const existing = await challengeRepository.findTodayChallenge(group.id, today);
      
      if (existing) {
        console.log(`[Challenge Slots] Group "${group.name}" already has today's slot. Skipping.`);
        skippedCount++;
        continue;
      }
      
      const slot = await challengeService.createDailyChallengeSlot({ groupId: group.id });
      console.log(`[Challenge Slots] Created slot for group "${group.name}" (Assigned Challenger: ${slot.createdBy})`);
      createdCount++;
    } catch (err) {
      console.error(`[Challenge Slots] Failed to create slot for group "${group.name}":`, err.message);
    }
  }
  
  console.log(`Bulk slot creation completed. Created: ${createdCount}, Skipped: ${skippedCount}`);
  return { created: createdCount, skipped: skippedCount };
};

/**
 * Automatically transitions all ACTIVE daily challenges to CLOSED.
 * After closure, it queues downstream streak evaluations and missed user detection.
 */
export const processCloseChallenges = async () => {
  console.log("Starting bulk daily challenge closure...");
  
  const activeChallenges = await prisma.dailyChallenge.findMany({
    where: {
      status: "ACTIVE",
    },
    include: {
      group: {
        select: {
          name: true,
        },
      },
    },
  });
  
  let closedCount = 0;
  
  for (const challenge of activeChallenges) {
    try {
      // Idempotent: double-check current status in a fresh query
      const freshChallenge = await challengeRepository.findChallengeById(challenge.id);
      if (!freshChallenge || freshChallenge.status !== "ACTIVE") {
        console.log(`[Challenge Closure] Challenge ${challenge.id} is already processed. Skipping.`);
        continue;
      }
      
      // Close the challenge status
      await challengeRepository.updateChallenge(challenge.id, {
        status: "CLOSED",
      });
      
      console.log(`[Challenge Closure] Closed challenge slot ${challenge.id} for group "${challenge.group.name}"`);
      closedCount++;
      
      // Add downstream social activity events to activity queue
      await activityQueue.add('CHALLENGE_CLOSED', {
        challengeId: challenge.id,
        groupId: challenge.groupId,
        userId: challenge.createdBy || "", // Challenger who set it
      });

      // Queue streak and missed user checks
      await streakQueue.add('process-missed-users', {
        challengeId: challenge.id,
        groupId: challenge.groupId,
      });
      
    } catch (err) {
      console.error(`[Challenge Closure] Failed to close challenge ${challenge.id}:`, err.message);
    }
  }
  
  console.log(`Bulk challenge closure completed. Closed: ${closedCount}`);
  return { closed: closedCount };
};

export default {
  processCreateDailyChallenges,
  processCloseChallenges,
};
