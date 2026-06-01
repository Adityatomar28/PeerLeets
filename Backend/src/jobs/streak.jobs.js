import prisma from '../config/db.js';
import challengeRepository from '../modules/challenge/challenge.repository.js';
import { updateConsistencyStats } from '../services/consistency.service.js';
import activityQueue from '../queues/activity.queue.js';

/**
 * Main worker execution method for evaluating missed users.
 * Processes each non-solving member atomically, checking for streak freeze availability.
 * Guarded against duplicates via log audits.
 */
export const processMissedUsers = async ({ challengeId, groupId }) => {
  console.log(`[Streak Engine] Evaluating missed users for challenge ${challengeId} in group ${groupId}`);
  
  const challenge = await challengeRepository.findChallengeById(challengeId);
  if (!challenge) {
    throw new Error(`Challenge ${challengeId} not found`);
  }
  
  if (challenge.status !== "CLOSED") {
    console.log(`[Streak Engine] Challenge ${challengeId} is not CLOSED yet. Skipping streak updates.`);
    return { skipped: true };
  }
  
  // 1. Get all group members
  const members = await challengeRepository.getGroupMembersOrdered(groupId);
  if (!members || members.length === 0) {
    console.log(`[Streak Engine] Group ${groupId} has no members. Skipping.`);
    return { processed: 0 };
  }
  
  // 2. Get all successful submissions for the challenge
  const submissions = await prisma.submission.findMany({
    where: {
      challengeId,
      solved: true,
    },
    select: {
      userId: true,
    },
  });
  
  const solverIds = new Set(submissions.map(s => s.userId));
  let processedCount = 0;
  
  for (const member of members) {
    const { userId } = member;
    
    // If user solved the challenge, skip
    if (solverIds.has(userId)) {
      continue;
    }
    
    // --- IDEMPOTENCY GUARD ---
    // Check if we have already logged a FREEZE_USED or MISSED activity log for this user & challenge.
    const alreadyProcessed = await prisma.activityLog.findFirst({
      where: {
        userId,
        challengeId,
        type: { in: ['FREEZE_USED', 'MISSED'] },
      },
    });
    
    if (alreadyProcessed) {
      console.log(`[Streak Engine] User ${userId} already processed for challenge ${challengeId}. Skipping.`);
      continue;
    }
    
    // --- TRANSACTION BLOCK ---
    await prisma.$transaction(async (tx) => {
      let stats = await tx.userGroupStats.findUnique({
        where: {
          userId_groupId: { userId, groupId },
        },
      });
      
      if (!stats) {
        // Initialize if stats are missing
        stats = await tx.userGroupStats.create({
          data: { userId, groupId },
        });
      }
      
      const rollingStats = await updateConsistencyStats({ userId, groupId, tx });
      
      if (stats.freezeCount > 0) {
        // Consume one streak freeze
        const updatedStats = await tx.userGroupStats.update({
          where: { id: stats.id },
          data: {
            freezeCount: stats.freezeCount - 1,
            last7DaysSolved: rollingStats.last7DaysSolved,
            last30DaysSolved: rollingStats.last30DaysSolved,
          },
        });
        
        console.log(`[Streak Engine] User ${userId} protected by streak freeze (Consumed 1 freeze, remaining: ${updatedStats.freezeCount})`);
        
        // Push activity event task to Activity Queue
        await activityQueue.add('FREEZE_USED', {
          userId,
          groupId,
          challengeId,
          metadata: { remainingFreezes: updatedStats.freezeCount },
        });
        
      } else {
        // No freezes available: Reset current streak to 0
        const updatedStats = await tx.userGroupStats.update({
          where: { id: stats.id },
          data: {
            currentStreak: 0,
            last7DaysSolved: rollingStats.last7DaysSolved,
            last30DaysSolved: rollingStats.last30DaysSolved,
          },
        });
        
        console.log(`[Streak Engine] User ${userId} had 0 freezes. Streak reset to 0.`);
        
        // Push activity event task to Activity Queue
        await activityQueue.add('MISSED', {
          userId,
          groupId,
          challengeId,
        });
      }
      
      processedCount++;
    });
  }
  
  console.log(`[Streak Engine] Completed missed user checks. Processed ${processedCount} users.`);
  return { processed: processedCount };
};

export default {
  processMissedUsers,
};
