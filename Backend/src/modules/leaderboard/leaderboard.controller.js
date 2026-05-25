import leaderboardService from "./leaderboard.service.js";
import activityService from "../activity/activity.service.js";

/**
 * Controller to handle fetching Global Leaderboard.
 * Endpoint: GET /api/groups/:groupId/leaderboard
 */
export const getLeaderboardController = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const { page, limit } = req.query;

    const data = await leaderboardService.getLeaderboardService({
      groupId,
      type: "global",
      page,
      limit,
    });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to handle fetching Weekly Leaderboard.
 * Endpoint: GET /api/groups/:groupId/leaderboard/weekly
 */
export const getWeeklyLeaderboardController = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const { page, limit } = req.query;

    const data = await leaderboardService.getLeaderboardService({
      groupId,
      type: "weekly",
      page,
      limit,
    });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to handle fetching Monthly Leaderboard.
 * Endpoint: GET /api/groups/:groupId/leaderboard/monthly
 */
export const getMonthlyLeaderboardController = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const { page, limit } = req.query;

    const data = await leaderboardService.getLeaderboardService({
      groupId,
      type: "monthly",
      page,
      limit,
    });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to handle fetching participation indicators for today's challenge.
 * Endpoint: GET /api/groups/:groupId/challenges/:challengeId/status
 */
export const getChallengeParticipationController = async (req, res, next) => {
  try {
    const { groupId, challengeId } = req.params;

    const data = await leaderboardService.getChallengeParticipationService({
      groupId,
      challengeId,
    });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to handle fetching group activity feed.
 * Endpoint: GET /api/groups/:groupId/activity
 */
export const getActivityFeedController = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const { page, limit } = req.query;

    const data = await activityService.getActivityFeedService({
      groupId,
      page,
      limit,
    });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to handle fetching inactive users in a group.
 * Endpoint: GET /api/groups/:groupId/users/inactive
 */
export const getInactiveUsersController = async (req, res, next) => {
  try {
    const { groupId } = req.params;

    const data = await leaderboardService.detectInactiveUsers({
      groupId,
    });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getLeaderboardController,
  getWeeklyLeaderboardController,
  getMonthlyLeaderboardController,
  getChallengeParticipationController,
  getActivityFeedController,
  getInactiveUsersController,
};
