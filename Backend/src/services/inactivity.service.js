import prisma from '../config/db.js';

/**
 * Service to analyze platform engagement, scanning for low-activity user bases,
 * dead groups, and low-engagement streaks to power re-engagement analytics.
 */

/**
 * Scans groups with zero challenges created or activated in the last 7 days.
 */
export const detectDeadGroups = async () => {
  console.log("[Inactivity Service] Auditing inactive groups...");
  
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setUTCDate(sevenDaysAgo.getUTCDate() - 7);
  
  // Find groups that have not had challenge updates in the last 7 days
  const activeGroupsCount = await prisma.dailyChallenge.findMany({
    where: {
      updatedAt: {
        gte: sevenDaysAgo,
      },
    },
    select: {
      groupId: true,
    },
  });
  
  const activeGroupIds = new Set(activeGroupsCount.map(c => c.groupId));
  
  const allGroups = await prisma.group.findMany({
    select: {
      id: true,
      name: true,
      createdAt: true,
    },
  });
  
  const deadGroups = allGroups.filter(g => !activeGroupIds.has(g.id));
  
  console.log(`[Inactivity Service] Audit complete. Found ${deadGroups.length} inactive groups out of ${allGroups.length} total.`);
  return deadGroups;
};

/**
 * Scans for groups whose members have a combined solving percentage below 30% on recent active challenges.
 */
export const detectLowEngagementGroups = async () => {
  console.log("[Inactivity Service] Auditing low engagement groups...");
  
  const groups = await prisma.group.findMany({
    select: {
      id: true,
      name: true,
      members: {
        select: {
          userId: true,
        },
      },
    },
  });
  
  const lowEngagementGroups = [];
  
  for (const group of groups) {
    const memberCount = group.members.length;
    if (memberCount === 0) continue;
    
    // Fetch last 5 closed challenges in this group
    const challenges = await prisma.dailyChallenge.findMany({
      where: {
        groupId: group.id,
        status: "CLOSED",
      },
      orderBy: {
        date: "desc",
      },
      take: 5,
      select: {
        id: true,
      },
    });
    
    if (challenges.length === 0) continue;
    
    const challengeIds = challenges.map(c => c.id);
    
    // Count successful submissions
    const solveCount = await prisma.submission.count({
      where: {
        challengeId: { in: challengeIds },
        solved: true,
      },
    });
    
    // Solve percentage = solveCount / (memberCount * challengeCount)
    const maxPossibleSolves = memberCount * challenges.length;
    const solvePercentage = (solveCount / maxPossibleSolves) * 100;
    
    if (solvePercentage < 30) {
      console.log(`[Inactivity] Group "${group.name}" flagged as low engagement (Solving rate: ${solvePercentage.toFixed(1)}%)`);
      lowEngagementGroups.push({
        groupId: group.id,
        name: group.name,
        solvePercentage,
        memberCount,
      });
    }
  }
  
  return lowEngagementGroups;
};

export default {
  detectDeadGroups,
  detectLowEngagementGroups,
};
