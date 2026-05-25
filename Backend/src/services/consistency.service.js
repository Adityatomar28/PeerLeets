import prisma from "../config/db.js";
import { normalizeToUtcMidnight } from "../utils/date.utils.js";

/**
 * Computes rolling consistency statistics (last 7 days, last 30 days) inside the transaction.
 * @param {object} params
 * @param {string} params.userId
 * @param {string} params.groupId
 * @param {object} [tx] Prisma transaction client
 * @returns {Promise<object>} Solved count updates for stats record
 */
export const updateConsistencyStats = async ({ userId, groupId, tx }) => {
  const db = tx || prisma;
  const today = normalizeToUtcMidnight(new Date());

  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setUTCDate(sevenDaysAgo.getUTCDate() - 7);

  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setUTCDate(thirtyDaysAgo.getUTCDate() - 30);

  // Count submissions within the rolling 7-day window
  const last7DaysSolved = await db.submission.count({
    where: {
      userId,
      groupId,
      solved: true,
      solvedAt: {
        gte: sevenDaysAgo,
      },
    },
  });

  // Count submissions within the rolling 30-day window
  const last30DaysSolved = await db.submission.count({
    where: {
      userId,
      groupId,
      solved: true,
      solvedAt: {
        gte: thirtyDaysAgo,
      },
    },
  });

  return {
    last7DaysSolved,
    last30DaysSolved,
  };
};

export default {
  updateConsistencyStats,
};
