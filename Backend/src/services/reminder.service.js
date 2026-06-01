import prisma from '../config/db.js';
import challengeRepository from '../modules/challenge/challenge.repository.js';
import challengeUtils from '../modules/challenge/challenge.utils.js';

/**
 * Service providing solve progress utilities.
 */

/**
 * Returns a list of members in a group who have not solved the active challenge today,
 * filtered by those whose streaks are currently at risk (currentStreak > 0).
 */
export const getUsersAtRisk = async (groupId) => {
  const today = challengeUtils.getTodayUtc();
  const challenge = await challengeRepository.findTodayChallenge(groupId, today);
  
  if (!challenge || challenge.status !== 'ACTIVE') {
    return [];
  }

  const members = await challengeRepository.getGroupMembersOrdered(groupId);
  if (!members || members.length === 0) return [];

  const submissions = await prisma.submission.findMany({
    where: {
      challengeId: challenge.id,
      solved: true,
    },
    select: {
      userId: true,
    },
  });

  const solverIds = new Set(submissions.map(s => s.userId));
  const pendingUserIds = members.filter(m => !solverIds.has(m.userId)).map(m => m.userId);

  if (pendingUserIds.length === 0) return [];

  // Query UserGroupStats for current streak statuses
  const stats = await prisma.userGroupStats.findMany({
    where: {
      groupId,
      userId: { in: pendingUserIds },
      currentStreak: { gt: 0 },
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return stats.map(s => ({
    userId: s.userId,
    name: s.user.name,
    email: s.user.email,
    currentStreak: s.currentStreak,
  }));
};

/**
 * Compiles a list of members currently pending solve submissions for today's active challenge.
 */
export const getPendingSolvers = async (groupId) => {
  const today = challengeUtils.getTodayUtc();
  const challenge = await challengeRepository.findTodayChallenge(groupId, today);
  
  if (!challenge || challenge.status !== 'ACTIVE') {
    return [];
  }

  const members = await challengeRepository.getGroupMembersOrdered(groupId);
  if (!members || members.length === 0) return [];

  const submissions = await prisma.submission.findMany({
    where: {
      challengeId: challenge.id,
      solved: true,
    },
    select: {
      userId: true,
    },
  });

  const solverIds = new Set(submissions.map(s => s.userId));
  const pendingMembers = members.filter(m => !solverIds.has(m.userId));

  if (pendingMembers.length === 0) return [];

  const pendingUserIds = pendingMembers.map(m => m.userId);
  
  return prisma.user.findMany({
    where: { id: { in: pendingUserIds } },
    select: { id: true, name: true, email: true },
  });
};

export default {
  getUsersAtRisk,
  getPendingSolvers,
};
