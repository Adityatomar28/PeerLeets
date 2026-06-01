import { getLeaderboardService, getChallengeParticipationService } from "../modules/leaderboard/leaderboard.service.js";
import { sendToGroup } from "../sockets/socket.gateway.js";
import { SERVER_EVENTS } from "../sockets/socket.events.js";

/**
 * Realtime Service.
 * Translates domain lifecycle and transaction events into real-time Socket.IO broadcasts.
 * Automatically handles data fetching for state-sensitive channels (Leaderboard, Participation).
 */

/**
 * Broadcasts a challenge creation alert.
 */
export const emitChallengeCreated = async ({ groupId, challengeId, userId }) => {
  try {
    sendToGroup(groupId, SERVER_EVENTS.CHALLENGE_CREATED, {
      groupId,
      challengeId,
      userId,
    });
  } catch (error) {
    console.error("[Realtime Service] emitChallengeCreated failed:", error.message);
  }
};

/**
 * Broadcasts a challenge activation event (providing problem link).
 */
export const emitChallengeActivated = async ({ groupId, challengeId, userId, problemLink }) => {
  try {
    sendToGroup(groupId, SERVER_EVENTS.CHALLENGE_ACTIVATED, {
      groupId,
      challengeId,
      userId,
      problemLink,
    });
  } catch (error) {
    console.error("[Realtime Service] emitChallengeActivated failed:", error.message);
  }
};

/**
 * Broadcasts a challenge closure event.
 */
export const emitChallengeClosed = async ({ groupId, challengeId }) => {
  try {
    sendToGroup(groupId, SERVER_EVENTS.CHALLENGE_CLOSED, {
      groupId,
      challengeId,
    });
  } catch (error) {
    console.error("[Realtime Service] emitChallengeClosed failed:", error.message);
  }
};

/**
 * Broadcasts a successful solve event.
 */
export const emitSolveSuccess = async ({ groupId, challengeId, userId, timeTaken }) => {
  try {
    sendToGroup(groupId, SERVER_EVENTS.SOLVED, {
      groupId,
      challengeId,
      userId,
      timeTaken,
    });
  } catch (error) {
    console.error("[Realtime Service] emitSolveSuccess failed:", error.message);
  }
};

/**
 * Broadcasts a first-solver achievement badge.
 */
export const emitFirstSolver = async ({ groupId, challengeId, userId }) => {
  try {
    sendToGroup(groupId, SERVER_EVENTS.FIRST_SOLVER, {
      groupId,
      challengeId,
      userId,
    });
  } catch (error) {
    console.error("[Realtime Service] emitFirstSolver failed:", error.message);
  }
};

/**
 * Broadcasts a user's streak increase/update.
 */
export const emitStreakUpdated = async ({ groupId, userId, currentStreak }) => {
  try {
    sendToGroup(groupId, SERVER_EVENTS.STREAK_UPDATED, {
      groupId,
      userId,
      currentStreak,
    });
  } catch (error) {
    console.error("[Realtime Service] emitStreakUpdated failed:", error.message);
  }
};

/**
 * Broadcasts that a user used a streak freeze.
 */
export const emitFreezeUsed = async ({ groupId, userId, challengeId, remainingFreezes }) => {
  try {
    sendToGroup(groupId, SERVER_EVENTS.FREEZE_USED, {
      groupId,
      userId,
      challengeId,
      remainingFreezes,
    });
  } catch (error) {
    console.error("[Realtime Service] emitFreezeUsed failed:", error.message);
  }
};

/**
 * Broadcasts that a user missed a challenge deadline.
 */
export const emitMissed = async ({ groupId, userId, challengeId }) => {
  try {
    sendToGroup(groupId, SERVER_EVENTS.MISSED, {
      groupId,
      userId,
      challengeId,
    });
  } catch (error) {
    console.error("[Realtime Service] emitMissed failed:", error.message);
  }
};

/**
 * Streams a social feed activity log instantly as it processes.
 */
export const emitActivity = async (groupId, activity) => {
  try {
    sendToGroup(groupId, SERVER_EVENTS.ACTIVITY_CREATED, activity);
  } catch (error) {
    console.error("[Realtime Service] emitActivity failed:", error.message);
  }
};

/**
 * Fetches the up-to-date global group leaderboard ranks and broadcasts them.
 */
export const emitLeaderboardUpdate = async (groupId) => {
  try {
    console.log(`[Realtime Service] Generating fresh leaderboard state for group ${groupId}`);
    const data = await getLeaderboardService({ groupId, type: 'global', page: 1, limit: 100 });
    
    sendToGroup(groupId, SERVER_EVENTS.LEADERBOARD_UPDATED, {
      groupId,
      leaderboard: data.leaderboard,
    });
  } catch (error) {
    console.error(`[Realtime Service] emitLeaderboardUpdate failed for group ${groupId}:`, error.message);
  }
};

/**
 * Fetches the up-to-date participation grid (solved, pending, missed, firstSolver) for today's challenge and broadcasts it.
 */
export const emitParticipationUpdate = async (groupId, challengeId) => {
  try {
    if (!challengeId) {
      console.warn(`[Realtime Service] Skip participation grid broadcast: challengeId is null for group ${groupId}`);
      return;
    }
    console.log(`[Realtime Service] Generating fresh participation grid for challenge ${challengeId} in group ${groupId}`);
    const grid = await getChallengeParticipationService({ groupId, challengeId });
    
    sendToGroup(groupId, SERVER_EVENTS.PARTICIPATION_UPDATED, {
      groupId,
      challengeId,
      ...grid,
    });
  } catch (error) {
    console.error(`[Realtime Service] emitParticipationUpdate failed for group ${groupId}:`, error.message);
  }
};

export default {
  emitChallengeCreated,
  emitChallengeActivated,
  emitChallengeClosed,
  emitSolveSuccess,
  emitFirstSolver,
  emitStreakUpdated,
  emitFreezeUsed,
  emitMissed,
  emitActivity,
  emitLeaderboardUpdate,
  emitParticipationUpdate,
};
