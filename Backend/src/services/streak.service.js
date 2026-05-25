import { getDaysDifference, normalizeToUtcMidnight } from "../utils/date.utils.js";

/**
 * Calculates current streak, longest streak, and freeze counts during a solve operation.
 * @param {object} params
 * @param {object} params.stats Existing UserGroupStats record
 * @param {Date} params.todayDate Normalized UTC midnight today
 * @returns {object} Updated streak/freeze properties to persist
 */
export const calculateStreakAndFreeze = ({ stats, todayDate }) => {
  const normalizedToday = normalizeToUtcMidnight(todayDate);
  const currentStreak = stats.currentStreak;
  let longestStreak = stats.longestStreak;
  let freezeCount = stats.freezeCount;
  const lastSolvedDate = stats.lastSolvedDate;

  // Case 1: First solve ever
  if (!lastSolvedDate) {
    const nextStreak = 1;
    longestStreak = Math.max(longestStreak, nextStreak);
    return {
      currentStreak: nextStreak,
      longestStreak,
      freezeCount,
      lastSolvedDate: normalizedToday,
    };
  }

  const normalizedLastSolved = normalizeToUtcMidnight(lastSolvedDate);
  const diffDays = getDaysDifference(normalizedToday, normalizedLastSolved);

  // Case 2: Solved again on the same day (should not increment streak again)
  if (diffDays === 0) {
    return {
      currentStreak,
      longestStreak,
      freezeCount,
      lastSolvedDate: normalizedToday,
    };
  }

  // Case 3: Consecutive day solve (yesterday)
  if (diffDays === 1) {
    const nextStreak = currentStreak + 1;
    longestStreak = Math.max(longestStreak, nextStreak);
    return {
      currentStreak: nextStreak,
      longestStreak,
      freezeCount,
      lastSolvedDate: normalizedToday,
    };
  }

  // Case 4: Missed day(s) detected
  const missedDays = diffDays - 1;

  if (missedDays <= freezeCount) {
    // Consume freezes to cover the gap
    freezeCount -= missedDays;
    // Streak preserved, increment by today's solve
    const nextStreak = currentStreak + 1;
    longestStreak = Math.max(longestStreak, nextStreak);
    return {
      currentStreak: nextStreak,
      longestStreak,
      freezeCount,
      lastSolvedDate: normalizedToday,
    };
  } else {
    // Not enough freezes -> reset streak
    freezeCount = 0; // Consume all remaining freezes
    const nextStreak = 1;
    longestStreak = Math.max(longestStreak, nextStreak);
    return {
      currentStreak: nextStreak,
      longestStreak,
      freezeCount,
      lastSolvedDate: normalizedToday,
    };
  }
};

/**
 * Utility to calculate missed days.
 * @param {object} params
 * @param {Date|null} params.lastSolvedDate
 * @param {Date} params.todayDate
 * @returns {number} Number of missed days
 */
export const detectMissedDays = ({ lastSolvedDate, todayDate }) => {
  if (!lastSolvedDate) return 0;
  const d1 = normalizeToUtcMidnight(todayDate);
  const d2 = normalizeToUtcMidnight(lastSolvedDate);
  const diff = getDaysDifference(d1, d2);
  return diff > 1 ? diff - 1 : 0;
};

export default {
  calculateStreakAndFreeze,
  detectMissedDays,
};
