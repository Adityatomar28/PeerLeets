/**
 * Normalizes a date to UTC midnight.
 * Prevents timezone shifting or daylight saving bugs.
 * @param {Date|string|number} [date] Optional input date
 * @returns {Date} Normalized UTC Date
 */
export const normalizeToUtcMidnight = (date) => {
  const d = date ? new Date(date) : new Date();
  const utcDate = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0, 0));
  return utcDate;
};

/**
 * Computes difference in days between two normalized UTC dates.
 * @param {Date} date1 Newer date
 * @param {Date} date2 Older date
 * @returns {number} Difference in days
 */
export const getDaysDifference = (date1, date2) => {
  const d1 = normalizeToUtcMidnight(date1);
  const d2 = normalizeToUtcMidnight(date2);
  const diffMs = d1.getTime() - d2.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
};

export default {
  normalizeToUtcMidnight,
  getDaysDifference,
};
