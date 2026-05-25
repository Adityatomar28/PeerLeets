import prisma from "../../config/db.js";

/**
 * Creates a new Submission record.
 * Supports transaction client passing.
 */
export const createSubmission = async ({ userId, groupId, challengeId, timeTaken }, tx) => {
  const db = tx || prisma;
  return db.submission.create({
    data: {
      userId,
      groupId,
      challengeId,
      timeTaken,
      solved: true,
    },
  });
};

/**
 * Finds a unique submission by userId and challengeId.
 */
export const findSubmission = async (userId, challengeId) => {
  return prisma.submission.findUnique({
    where: {
      userId_challengeId: {
        userId,
        challengeId,
      },
    },
  });
};

/**
 * Updates UserGroupStats.
 * Supports transaction client passing.
 */
export const updateUserStats = async (userId, groupId, data, tx) => {
  const db = tx || prisma;
  return db.userGroupStats.update({
    where: {
      userId_groupId: {
        userId,
        groupId,
      },
    },
    data,
  });
};

/**
 * Finds unique UserGroupStats by userId and groupId.
 */
export const findUserStats = async (userId, groupId) => {
  return prisma.userGroupStats.findUnique({
    where: {
      userId_groupId: {
        userId,
        groupId,
      },
    },
  });
};

/**
 * Retrieves all submissions for a specific user in a group.
 */
export const getUserSubmissions = async (userId, groupId) => {
  return prisma.submission.findMany({
    where: {
      userId,
      groupId,
    },
    orderBy: {
      solvedAt: "desc",
    },
  });
};

/**
 * Retrieves all submissions for a challenge, selecting nested user profiles.
 * Prevents N+1 queries by pre-fetching relations.
 */
export const getChallengeSubmissions = async (challengeId) => {
  return prisma.submission.findMany({
    where: {
      challengeId,
    },
    select: {
      id: true,
      userId: true,
      groupId: true,
      challengeId: true,
      solved: true,
      solvedAt: true,
      timeTaken: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      solvedAt: "asc",
    },
  });
};

export default {
  createSubmission,
  findSubmission,
  updateUserStats,
  findUserStats,
  getUserSubmissions,
  getChallengeSubmissions,
};
