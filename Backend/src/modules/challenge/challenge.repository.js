import prisma from "../../config/db.js";

/**
 * Creates a DailyChallenge in WAITING status.
 * Supports transaction client passing.
 * @param {object} data
 * @param {string} data.groupId
 * @param {Date} data.date
 * @param {string} data.createdBy Assigned challenger ID
 * @param {object} [tx] Prisma transaction client
 * @returns {Promise<object>} Created challenge
 */
export const createChallenge = async ({ groupId, date, createdBy }, tx) => {
  const db = tx || prisma;
  return db.dailyChallenge.create({
    data: {
      groupId,
      date,
      createdBy,
      status: "WAITING",
    },
  });
};

/**
 * Finds today's challenge in a group.
 * @param {string} groupId
 * @param {Date} date normalized to UTC midnight
 * @returns {Promise<object|null>}
 */
export const findTodayChallenge = async (groupId, date) => {
  return prisma.dailyChallenge.findUnique({
    where: {
      groupId_date: {
        groupId,
        date,
      },
    },
    include: {
      creator: {
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
 * Finds a challenge by its unique ID.
 * @param {string} id
 * @returns {Promise<object|null>}
 */
export const findChallengeById = async (id) => {
  return prisma.dailyChallenge.findUnique({
    where: {
      id,
    },
  });
};

/**
 * Updates a challenge.
 * Supports transaction client passing.
 * @param {string} id
 * @param {object} data
 * @param {object} [tx] Prisma transaction client
 * @returns {Promise<object>} Updated challenge
 */
export const updateChallenge = async (id, data, tx) => {
  const db = tx || prisma;
  return db.dailyChallenge.update({
    where: {
      id,
    },
    data,
  });
};

/**
 * Returns paginated historical challenges for a group.
 * Prevents N+1 queries by pre-selecting standard nested relations.
 * @param {string} groupId
 * @param {number} skip
 * @param {number} take
 * @returns {Promise<Array>}
 */
export const getChallengeHistory = async (groupId, skip = 0, take = 10) => {
  return prisma.dailyChallenge.findMany({
    where: {
      groupId,
    },
    skip,
    take,
    orderBy: {
      date: "desc",
    },
    select: {
      id: true,
      date: true,
      problemLink: true,
      status: true,
      createdBy: true,
      createdAt: true,
      updatedAt: true,
      creator: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      submissions: {
        select: {
          id: true,
          userId: true,
          solvedAt: true,
          timeTaken: true,
          user: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          solvedAt: "asc",
        },
      },
    },
  });
};

/**
 * Retrieves group members ordered by joinedAt ascending.
 * @param {string} groupId
 * @returns {Promise<Array>}
 */
export const getGroupMembersOrdered = async (groupId) => {
  return prisma.groupMember.findMany({
    where: {
      groupId,
    },
    orderBy: {
      joinedAt: "asc",
    },
    select: {
      userId: true,
      joinedAt: true,
    },
  });
};

/**
 * Retrieves the most recent challenge created with an assigned challenger.
 * @param {string} groupId
 * @returns {Promise<object|null>}
 */
export const findLastChallenger = async (groupId) => {
  return prisma.dailyChallenge.findFirst({
    where: {
      groupId,
      createdBy: {
        not: null,
      },
    },
    orderBy: {
      date: "desc",
    },
  });
};

export default {
  createChallenge,
  findTodayChallenge,
  findChallengeById,
  updateChallenge,
  getChallengeHistory,
  getGroupMembersOrdered,
  findLastChallenger,
};
