export const SERVER_EVENTS = {
  CHALLENGE_CREATED: 'challenge:created',
  CHALLENGE_ACTIVATED: 'challenge:activated',
  CHALLENGE_CLOSED: 'challenge:closed',
  SOLVED: 'solve:success',
  FIRST_SOLVER: 'solve:first',
  STREAK_UPDATED: 'streak:updated',
  FREEZE_USED: 'streak:freeze',
  MISSED: 'streak:missed',
  ACTIVITY_CREATED: 'activity:created',
  LEADERBOARD_UPDATED: 'leaderboard:update',
  PARTICIPATION_UPDATED: 'participation:update',
  ERROR: 'socket:error',
};

export const CLIENT_EVENTS = {
  JOIN_GROUP: 'join-group',
  LEAVE_GROUP: 'leave-group',
};

export default {
  SERVER_EVENTS,
  CLIENT_EVENTS,
};
