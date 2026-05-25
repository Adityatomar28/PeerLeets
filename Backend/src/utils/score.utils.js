/**
 * Calculates the overall dynamic consistency score for a user.
 * Formula:
 * score = (last7DaysSolved * 5) + (last30DaysSolved * 2) + (currentStreak * 1) + (totalSolved * 0.5)
 * @param {object} stats UserGroupStats database object
 * @returns {number} Dynamic consistency score
 */
export const calculateLeaderboardScore = (stats) => {
  if (!stats) return 0;
  return (
    (stats.last7DaysSolved || 0) * 5 +
    (stats.last30DaysSolved || 0) * 2 +
    (stats.currentStreak || 0) * 1 +
    (stats.totalSolved || 0) * 0.5
  );
};

export default {
  calculateLeaderboardScore,
};
