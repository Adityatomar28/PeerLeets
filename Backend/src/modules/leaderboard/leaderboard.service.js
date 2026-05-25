import prisma from "../../config/db.js";
import leaderboardRepository from "./leaderboard.repository.js";
import challengeRepository from "../challenge/challenge.repository.js";
import { calculateLeaderboardScore } from "../../utils/score.utils.js";

/**
 * Custom error helper.
 */
const createError = (message, status) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

/**
 * Validates group ID format before querying.
 */
const validateGroupId = (groupId) => {
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  if (!groupId || !uuidRegex.test(groupId)) {
    throw createError("Invalid Group ID format", 400);
  }
};

/**
 * Validates challenge ID format.
 */
const validateChallengeId = (challengeId) => {
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  if (!challengeId || !uuidRegex.test(challengeId)) {
    throw createError("Invalid Challenge ID format", 400);
  }
};

/**
 * Service to retrieve dynamic rankings and leaderboards.
 * Globally: sorts by dynamic score descending.
 * Weekly: sorts by last7DaysSolved descending.
 * Monthly: sorts by last30DaysSolved descending.
 */
export const getLeaderboardService = async ({ groupId, type = 'global', page = 1, limit = 10 }) => {
  validateGroupId(groupId);

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);

  const skip = (Math.max(1, isNaN(pageNum) ? 1 : pageNum) - 1) * (isNaN(limitNum) ? 10 : limitNum);
  const take = Math.min(100, Math.max(1, isNaN(limitNum) ? 10 : limitNum));

  const stats = await leaderboardRepository.getGroupStats(groupId);

  // Map scores
  const ranked = stats.map(s => {
    const score = calculateLeaderboardScore(s);
    return {
      userId: s.userId,
      name: s.user.name,
      email: s.user.email,
      currentStreak: s.currentStreak,
      longestStreak: s.longestStreak,
      totalSolved: s.totalSolved,
      last7DaysSolved: s.last7DaysSolved,
      last30DaysSolved: s.last30DaysSolved,
      score,
    };
  });

  // Sort deterministically based on leaderboard criteria type
  ranked.sort((a, b) => {
    if (type === 'weekly') {
      if (b.last7DaysSolved !== a.last7DaysSolved) return b.last7DaysSolved - a.last7DaysSolved;
    } else if (type === 'monthly') {
      if (b.last30DaysSolved !== a.last30DaysSolved) return b.last30DaysSolved - a.last30DaysSolved;
    }
    // Fallback to overall score desc, then current streak desc, then deterministic alphabetically
    if (b.score !== a.score) return b.score - a.score;
    if (b.currentStreak !== a.currentStreak) return b.currentStreak - a.currentStreak;
    return a.name.localeCompare(b.name);
  });

  return {
    type,
    leaderboard: ranked.slice(skip, skip + take),
  };
};

/**
 * Service to retrieve challenge participation indicadores (solved, pending, missed).
 * Also maps the first solver.
 */
export const getChallengeParticipationService = async ({ groupId, challengeId }) => {
  validateGroupId(groupId);
  validateChallengeId(challengeId);

  const challenge = await challengeRepository.findChallengeById(challengeId);
  if (!challenge) {
    throw createError("Challenge not found", 404);
  }
  if (challenge.groupId !== groupId) {
    throw createError("Challenge does not belong to the requested group", 400);
  }

  // Get ordered group members
  const members = await challengeRepository.getGroupMembersOrdered(groupId);
  if (!members || members.length === 0) {
    return { solved: [], pending: [], missed: [], firstSolver: null };
  }

  // Get target challenge submissions
  const submissions = await leaderboardRepository.getChallengeParticipation(challengeId);
  const submissionsMap = new Map(submissions.map(s => [s.userId, s]));

  // Get user profile details
  const memberIds = members.map(m => m.userId);
  const users = await prisma.user.findMany({
    where: { id: { in: memberIds } },
    select: { id: true, name: true, email: true },
  });
  const usersMap = new Map(users.map(u => [u.id, u]));

  const solved = [];
  const pending = [];
  const missed = [];

  for (const m of members) {
    const user = usersMap.get(m.userId);
    if (!user) continue;

    const sub = submissionsMap.get(m.userId);

    if (sub) {
      solved.push({
        userId: user.id,
        name: user.name,
        email: user.email,
        solvedAt: sub.solvedAt,
        timeTaken: sub.timeTaken,
      });
    } else {
      if (challenge.status === "CLOSED") {
        missed.push({
          userId: user.id,
          name: user.name,
          email: user.email,
        });
      } else {
        pending.push({
          userId: user.id,
          name: user.name,
          email: user.email,
        });
      }
    }
  }

  // First Solver is determined by oldest solveAt
  let firstSolver = null;
  if (submissions.length > 0) {
    const firstSub = submissions[0];
    const firstUser = usersMap.get(firstSub.userId);
    if (firstUser) {
      firstSolver = {
        userId: firstUser.id,
        name: firstUser.name,
        email: firstUser.email,
        solvedAt: firstSub.solvedAt,
        timeTaken: firstSub.timeTaken,
      };
    }
  }

  return {
    solved,
    pending,
    missed,
    firstSolver,
  };
};

/**
 * Service to retrieve inactive group members (0 solves in the last 7 days).
 */
export const detectInactiveUsers = async ({ groupId }) => {
  validateGroupId(groupId);

  const stats = await leaderboardRepository.getInactiveUsers(groupId);
  return stats.map(s => ({
    userId: s.userId,
    name: s.user.name,
    email: s.user.email,
  }));
};

export default {
  calculateLeaderboardScore,
  getLeaderboardService,
  getChallengeParticipationService,
  detectInactiveUsers,
};
