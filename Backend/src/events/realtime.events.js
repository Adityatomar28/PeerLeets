import { eventEmitter } from "../services/event.service.js";
import realtimeService from "../services/realtime.service.js";

/**
 * Binds system event listener triggers to Realtime Socket.IO broadcasts.
 * Intercepts in-process domain events, fetches dynamic metrics, and pushes
 * up-to-date states directly to group channels.
 */
export const initRealtimeEventBridge = () => {
  console.log("[Realtime Event Bridge] Initializing event bridges to Socket.IO...");

  // Capture challenge creation slot
  eventEmitter.on("CHALLENGE_CREATED", async (payload = {}) => {
    const { groupId, challengeId, userId } = payload;
    console.log(`[Event Bridge] CAPTURE "CHALLENGE_CREATED" | Group: ${groupId} | Challenge: ${challengeId}`);
    
    await realtimeService.emitChallengeCreated({ groupId, challengeId, userId });
    await realtimeService.emitParticipationUpdate(groupId, challengeId);
  });

  // Capture challenge activation
  eventEmitter.on("CHALLENGE_ACTIVATED", async (payload = {}) => {
    const { groupId, challengeId, userId, problemLink } = payload;
    console.log(`[Event Bridge] CAPTURE "CHALLENGE_ACTIVATED" | Group: ${groupId} | Challenge: ${challengeId}`);

    let pLink = problemLink;
    if (!pLink) {
      try {
        const prisma = (await import("../config/db.js")).default;
        const challenge = await prisma.dailyChallenge.findUnique({
          where: { id: challengeId },
          select: { problemLink: true },
        });
        pLink = challenge?.problemLink;
      } catch (err) {
        console.error("[Event Bridge] Failed to fetch activated challenge problemLink:", err.message);
      }
    }

    await realtimeService.emitChallengeActivated({ groupId, challengeId, userId, problemLink: pLink });
    await realtimeService.emitParticipationUpdate(groupId, challengeId);
  });

  // Capture challenge closure
  eventEmitter.on("CHALLENGE_CLOSED", async (payload = {}) => {
    const { groupId, challengeId } = payload;
    console.log(`[Event Bridge] CAPTURE "CHALLENGE_CLOSED" | Group: ${groupId} | Challenge: ${challengeId}`);

    await realtimeService.emitChallengeClosed({ groupId, challengeId });
    await realtimeService.emitParticipationUpdate(groupId, challengeId);
    await realtimeService.emitLeaderboardUpdate(groupId);
  });

  // Capture successful challenge solves
  eventEmitter.on("SOLVED", async (payload = {}) => {
    const { groupId, challengeId, userId, metadata } = payload;
    const timeTaken = metadata?.timeTaken;
    console.log(`[Event Bridge] CAPTURE "SOLVED" | Group: ${groupId} | User: ${userId}`);

    await realtimeService.emitSolveSuccess({ groupId, challengeId, userId, timeTaken });
    await realtimeService.emitParticipationUpdate(groupId, challengeId);
    await realtimeService.emitLeaderboardUpdate(groupId);
  });

  // Capture first solver badge
  eventEmitter.on("FIRST_SOLVER", async (payload = {}) => {
    const { groupId, challengeId, userId } = payload;
    console.log(`[Event Bridge] CAPTURE "FIRST_SOLVER" | Group: ${groupId} | User: ${userId}`);

    await realtimeService.emitFirstSolver({ groupId, challengeId, userId });
    await realtimeService.emitParticipationUpdate(groupId, challengeId);
  });

  // Capture streak updates
  eventEmitter.on("STREAK_UPDATED", async (payload = {}) => {
    const { groupId, userId, challengeId, metadata } = payload;
    const currentStreak = metadata?.currentStreak || 1;
    console.log(`[Event Bridge] CAPTURE "STREAK_UPDATED" | Group: ${groupId} | User: ${userId} | Streak: ${currentStreak}`);

    await realtimeService.emitStreakUpdated({ groupId, userId, currentStreak });
    await realtimeService.emitLeaderboardUpdate(groupId);
  });

  // Capture streak freeze usage
  eventEmitter.on("FREEZE_USED", async (payload = {}) => {
    const { groupId, userId, challengeId, metadata } = payload;
    const remainingFreezes = metadata?.remainingFreezes;
    console.log(`[Event Bridge] CAPTURE "FREEZE_USED" | Group: ${groupId} | User: ${userId}`);

    await realtimeService.emitFreezeUsed({ groupId, userId, challengeId, remainingFreezes });
    await realtimeService.emitLeaderboardUpdate(groupId);
    await realtimeService.emitParticipationUpdate(groupId, challengeId);
  });

  // Capture missed deadlines
  eventEmitter.on("MISSED", async (payload = {}) => {
    const { groupId, userId, challengeId } = payload;
    console.log(`[Event Bridge] CAPTURE "MISSED" | Group: ${groupId} | User: ${userId}`);

    await realtimeService.emitMissed({ groupId, userId, challengeId });
    await realtimeService.emitLeaderboardUpdate(groupId);
    await realtimeService.emitParticipationUpdate(groupId, challengeId);
  });

  // Capture activity feed log streams
  eventEmitter.on("ACTIVITY_CREATED", async (payload = {}) => {
    const { groupId, activityLog } = payload;
    if (!groupId || !activityLog) return;
    
    console.log(`[Event Bridge] CAPTURE "ACTIVITY_CREATED" | Group: ${groupId} | Stream message: "${activityLog.message}"`);
    await realtimeService.emitActivity(groupId, activityLog);
  });

  // Capture membership revocation / leaving
  eventEmitter.on("MEMBERSHIP_REVOKED", async (payload = {}) => {
    const { userId, groupId } = payload;
    console.log(`[Event Bridge] CAPTURE "MEMBERSHIP_REVOKED" | User: ${userId} | Group: ${groupId} -> Evicting active socket sessions...`);
    
    const { evictUserFromGroupRoom } = await import("../sockets/socket.gateway.js");
    evictUserFromGroupRoom(userId, groupId);
  });

  console.log("[Realtime Event Bridge] Binding complete");
};

export default initRealtimeEventBridge;
