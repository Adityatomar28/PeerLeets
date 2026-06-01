import prisma from '../config/db.js';
import challengeRepository from '../modules/challenge/challenge.repository.js';
import activityQueue from '../queues/activity.queue.js';

/**
 * Scans all groups with ACTIVE challenges and compiles solve reminders.
 * Made idempotent: checks if a reminder has already been triggered for the user & challenge today.
 */
export const processDailyReminders = async () => {
  console.log("[Reminders Engine] Starting active challenge reminders compilation...");
  
  // 1. Fetch all ACTIVE challenges
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
  
  let reminderCount = 0;
  
  for (const challenge of activeChallenges) {
    try {
      const { id: challengeId, groupId } = challenge;
      
      // Get all group members
      const members = await challengeRepository.getGroupMembersOrdered(groupId);
      if (!members || members.length === 0) continue;
      
      // Get all solvers
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
      const pendingMembers = members.filter(m => !solverIds.has(m.userId));
      
      const totalPending = pendingMembers.length;
      if (totalPending === 0) {
        console.log(`[Reminders Engine] Challenge ${challengeId} in group "${challenge.group.name}" is 100% solved. Skipping reminders.`);
        continue;
      }
      
      for (const member of pendingMembers) {
        const { userId } = member;
        
        // --- IDEMPOTENCY GUARD ---
        // Prevent reminder spam: check if they already received a reminder for today's challenge.
        const alreadyReminded = await prisma.activityLog.findFirst({
          where: {
            userId,
            challengeId,
            type: 'REMINDER_TRIGGERED',
          },
        });
        
        if (alreadyReminded) {
          continue;
        }
        
        // Retrieve user statistics for customized notification triggers
        const stats = await prisma.userGroupStats.findUnique({
          where: {
            userId_groupId: { userId, groupId },
          },
        });
        
        const streak = stats ? stats.currentStreak : 0;
        
        // Determine reminder message logic based on conditions
        let message = "";
        let reminderType = "generic";
        
        if (totalPending === 1) {
          message = "You are the last pending user for today's challenge! The squad is waiting on you ⏱️";
          reminderType = "last_pending";
        } else if (streak > 0) {
          message = `Your ${streak}-day streak is at risk! Solve today's challenge before cutoff ⚠️`;
          reminderType = "streak_at_risk";
        } else {
          message = "Only a few hours left to solve today's daily challenge slot! Solve and log now 🧠";
          reminderType = "hours_left";
        }
        
        // Dispatch REMINDER_TRIGGERED event asynchronously via Activity Queue
        await activityQueue.add('REMINDER_TRIGGERED', {
          userId,
          groupId,
          challengeId,
          metadata: {
            message,
            reminderType,
            currentStreak: streak,
          },
        });
        
        console.log(`[Reminders Engine] Queued ${reminderType} reminder for user ${userId} in group "${challenge.group.name}"`);
        reminderCount++;
      }
    } catch (err) {
      console.error(`[Reminders Engine] Failed to compile reminders for challenge ${challenge.id}:`, err.message);
    }
  }
  
  console.log(`[Reminders Engine] Completed reminder processing. Queued: ${reminderCount}`);
  return { compiled: reminderCount };
};

export default {
  processDailyReminders,
};
