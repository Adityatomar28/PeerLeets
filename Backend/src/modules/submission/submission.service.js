import prisma from "../../config/db.js";
import submissionRepository from "./submission.repository.js";
import challengeRepository from "../challenge/challenge.repository.js";
import groupRepository from "../group/group.repository.js";
import { calculateStreakAndFreeze } from "../../services/streak.service.js";
import { updateConsistencyStats } from "../../services/consistency.service.js";

/**
 * Creates custom error with status codes for controller mapping.
 */
const createError = (message, status) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

/**
 * Validates ID uuid string formatting.
 */
const validateId = (id, fieldName) => {
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  if (!id || !uuidRegex.test(id)) {
    throw createError(`Invalid ${fieldName} format`, 400);
  }
};

/**
 * Performs challenge solving logic.
 * Updates user streaks, freeze usage, and precomputed consistency metrics.
 * Runs atomically in a database transaction.
 */
export const solveChallengeService = async ({ userId, groupId, challengeId, timeTaken }) => {
  validateId(userId, "User ID");
  validateId(groupId, "Group ID");
  validateId(challengeId, "Challenge ID");

  if (timeTaken !== undefined && timeTaken !== null) {
    const timeSec = parseInt(timeTaken, 10);
    if (isNaN(timeSec) || timeSec < 0) {
      throw createError("Invalid timeTaken value", 400);
    }
  }

  // 1. Fetch challenge details
  const challenge = await challengeRepository.findChallengeById(challengeId);
  if (!challenge) {
    throw createError("Challenge not found", 404);
  }

  // Verify group ownership of target challenge
  if (challenge.groupId !== groupId) {
    throw createError("Challenge does not belong to the requested group", 400);
  }

  // Verify state constraint (only ACTIVE challenges can be solved)
  if (challenge.status === "CLOSED") {
    throw createError("Cannot solve a closed challenge", 400);
  }
  if (challenge.status === "WAITING") {
    throw createError("Cannot solve a challenge that has not been activated yet", 400);
  }

  // 2. Validate group membership
  const isMember = await groupRepository.isAlreadyMember(userId, groupId);
  if (!isMember) {
    throw createError("Access Denied: You are not a member of this group", 403);
  }

  // 3. Assert single-solve unique constraint
  const existingSubmission = await submissionRepository.findSubmission(userId, challengeId);
  if (existingSubmission) {
    throw createError("You have already solved this challenge", 409);
  }

  // 4. Run database transaction to ensure atomicity
  return prisma.$transaction(async (tx) => {
    // A. Create submission
    const submission = await submissionRepository.createSubmission({
      userId,
      groupId,
      challengeId,
      timeTaken: timeTaken ? parseInt(timeTaken, 10) : null,
    }, tx);

    // B. Get user statistics block
    let stats = await submissionRepository.findUserStats(userId, groupId);
    if (!stats) {
      stats = await tx.userGroupStats.create({
        data: {
          userId,
          groupId,
        },
      });
    }

    // C. Calculate streaks and freezes
    const streakUpdates = calculateStreakAndFreeze({ stats, todayDate: new Date() });

    // D. Compute rolling statistics
    const rollingStats = await updateConsistencyStats({ userId, groupId, tx });

    // E. Save stats
    const updatedStats = await submissionRepository.updateUserStats(userId, groupId, {
      currentStreak: streakUpdates.currentStreak,
      longestStreak: streakUpdates.longestStreak,
      freezeCount: streakUpdates.freezeCount,
      lastSolvedDate: streakUpdates.lastSolvedDate,
      totalSolved: stats.totalSolved + 1,
      last7DaysSolved: rollingStats.last7DaysSolved,
      last30DaysSolved: rollingStats.last30DaysSolved,
    }, tx);

    return {
      submission,
      stats: updatedStats,
    };
  });
};

/**
 * Service to retrieve submissions for a specific challenge.
 */
export const getSubmissionsForChallengeService = async ({ challengeId, userId }) => {
  validateId(challengeId, "Challenge ID");
  validateId(userId, "User ID");

  const challenge = await challengeRepository.findChallengeById(challengeId);
  if (!challenge) {
    throw createError("Challenge not found", 404);
  }

  return submissionRepository.getChallengeSubmissions(challengeId);
};

/**
 * Service to retrieve statistics block for a user.
 */
export const getUserStatsService = async ({ userId, groupId }) => {
  validateId(userId, "User ID");
  validateId(groupId, "Group ID");

  const stats = await submissionRepository.findUserStats(userId, groupId);
  if (!stats) {
    throw createError("Stats not found for the requested user in this group", 404);
  }

  return stats;
};

export default {
  solveChallengeService,
  getSubmissionsForChallengeService,
  getUserStatsService,
};
