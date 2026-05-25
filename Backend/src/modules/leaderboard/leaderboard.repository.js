import prisma from "../../config/db.js";

/**
 * Retrieves stats block for all group members, fetching user profiles nested.
 * @param {string} groupId
 * @returns {Promise<Array>} List of UserGroupStats records
 */
export const getGroupStats = async (groupId) => {
  return prisma.userGroupStats.findMany({
    where: {
      groupId,
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
};

/**
 * Retrieves submissions for a challenge, ordered by solvedAt ascending.
 * @param {string} challengeId
 * @returns {Promise<Array>} List of submissions
 */
export const getChallengeParticipation = async (challengeId) => {
  return prisma.submission.findMany({
    where: {
      challengeId,
    },
    select: {
      userId: true,
      solvedAt: true,
      timeTaken: true,
    },
    orderBy: {
      solvedAt: "asc",
    },
  });
};

/**
 * Retrieves group members with zero solves in the last 7 days.
 * @param {string} groupId
 * @returns {Promise<Array>} List of inactive stats records
 */
export const getInactiveUsers = async (groupId) => {
  return prisma.userGroupStats.findMany({
    where: {
      groupId,
      last7DaysSolved: 0,
    },
    select: {
      userId: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

export default {
  getGroupStats,
  getChallengeParticipation,
  getInactiveUsers,
};
