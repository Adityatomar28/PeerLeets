import prisma from "../../config/db.js";
import activityRepository from "./activity.repository.js";

/**
 * Maps time in seconds to a friendly "in XX mins" format.
 */
const formatTime = (seconds) => {
  if (!seconds) return "";
  const mins = Math.round(seconds / 60);
  return ` in ${mins} mins`;
};

/**
 * Creates an activity event log directly.
 */
export const createActivityEvent = async ({ userId, groupId, challengeId, type, message, metadata }) => {
  return activityRepository.createActivityLog({
    userId,
    groupId,
    challengeId,
    type,
    message,
    metadata,
  });
};

/**
 * Process event asynchronous subscriber.
 * Automatically translates system event codes into descriptive social feed lines.
 * Queries user name asynchronously and logs the event to PostgreSQL.
 * @param {object} params
 * @param {string} params.type System event code
 * @param {object} params.payload Event context
 */
export const processEvent = async ({ type, payload }) => {
  const { userId, groupId, challengeId, metadata } = payload;
  if (!userId || !groupId) return;

  // Retrieve user name asynchronously to build the social message
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true },
  });
  const userName = user ? user.name : "A user";

  let message = "";

  switch (type) {
    case 'CHALLENGE_CREATED':
      message = `${userName} created today's challenge slot 🧠`;
      break;
    case 'CHALLENGE_ACTIVATED':
      message = `${userName} activated today's challenge slot 🧠`;
      break;
    case 'SOLVED':
      const timeStr = metadata?.timeTaken ? formatTime(metadata.timeTaken) : "";
      message = `${userName} solved today's challenge${timeStr} 🔥`;
      break;
    case 'STREAK_UPDATED':
      message = `${userName} reached a ${metadata?.currentStreak || 1}-day streak 🚀`;
      break;
    case 'FIRST_SOLVER':
      message = `${userName} was the first solver for today's challenge 🏆`;
      break;
    case 'FREEZE_USED':
      message = `${userName} used a streak freeze to protect their streak ❄️`;
      break;
    default:
      return; // Ignore unmatched events
  }

  await activityRepository.createActivityLog({
    userId,
    groupId,
    challengeId,
    type,
    message,
    metadata,
  });
};

/**
 * Fetches paginated activity feed logs for a group.
 */
export const getActivityFeedService = async ({ groupId, page = 1, limit = 10 }) => {
  if (!groupId) {
    throw new Error("Group ID is required");
  }

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);

  const skip = (Math.max(1, isNaN(pageNum) ? 1 : pageNum) - 1) * (isNaN(limitNum) ? 10 : limitNum);
  const take = Math.min(100, Math.max(1, isNaN(limitNum) ? 10 : limitNum));

  return activityRepository.getActivityFeed(groupId, skip, take);
};

export default {
  createActivityEvent,
  processEvent,
  getActivityFeedService,
};
