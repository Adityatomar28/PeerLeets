import prisma from "../../config/db.js";

/**
 * Creates a new ActivityLog entry.
 * @param {object} data
 * @param {string} data.userId
 * @param {string} data.groupId
 * @param {string} [data.challengeId]
 * @param {string} data.type Event type code
 * @param {string} data.message Structured text description
 * @param {object} [data.metadata] Optional JSON details
 * @returns {Promise<object>} Created ActivityLog entry
 */
export const createActivityLog = async ({ userId, groupId, challengeId, type, message, metadata }) => {
  return prisma.activityLog.create({
    data: {
      userId,
      groupId,
      challengeId,
      type,
      message,
      metadata,
    },
  });
};

/**
 * Retrieves paginated ActivityLog entries for a group.
 * Orders by createdAt desc, pre-fetching nested user profile info.
 */
export const getActivityFeed = async (groupId, skip = 0, take = 10) => {
  return prisma.activityLog.findMany({
    where: {
      groupId,
    },
    skip,
    take,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      userId: true,
      groupId: true,
      challengeId: true,
      type: true,
      message: true,
      metadata: true,
      createdAt: true,
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
  createActivityLog,
  getActivityFeed,
};
