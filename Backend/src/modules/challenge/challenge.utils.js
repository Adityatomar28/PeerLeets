/**
 * Normalizes the current date to UTC midnight.
 * Guarantees exactly one challenge slot per day per group.
 * @returns {Date} Normalized UTC midnight Date
 */
export const getTodayUtc = () => {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  return d;
};

/**
 * Challenger Rotation Algorithm.
 * Determines the next challenger in round-robin fashion.
 * Handles skipped/removed group members automatically.
 * @param {Array} members List of active GroupMember objects ordered by joinedAt asc
 * @param {string|null} lastChallengerId User ID of the previous challenge creator
 * @returns {string} User ID of the next assigned challenger
 */
export const getNextChallenger = (members, lastChallengerId) => {
  if (!members || members.length === 0) {
    throw new Error("Cannot rotate challenger: Group has no members");
  }

  // If this is the first challenge ever, assign the first joined member
  if (!lastChallengerId) {
    return members[0].userId;
  }

  // Find the index of the previous challenger in the active members list
  const prevIndex = members.findIndex(m => m.userId === lastChallengerId);

  // If the previous challenger was removed, fallback gracefully to the first member
  if (prevIndex === -1) {
    return members[0].userId;
  }

  // Rotate to the next member in round-robin fashion
  const nextIndex = (prevIndex + 1) % members.length;
  return members[nextIndex].userId;
};

export default {
  getTodayUtc,
  getNextChallenger,
};
