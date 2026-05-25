import submissionService from "./submission.service.js";

/**
 * Controller to handle problem solving submission.
 * Endpoint: POST /api/groups/:groupId/challenges/:challengeId/solve
 */
export const solveChallengeController = async (req, res, next) => {
  try {
    const { groupId, challengeId } = req.params;
    const { timeTaken } = req.body;
    const userId = req.user.id;

    const data = await submissionService.solveChallengeService({
      userId,
      groupId,
      challengeId,
      timeTaken,
    });

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to handle fetching submissions for a specific challenge.
 * Endpoint: GET /api/groups/:groupId/challenges/:challengeId/submissions
 */
export const getChallengeSubmissionsController = async (req, res, next) => {
  try {
    const { challengeId } = req.params;
    const userId = req.user.id;

    const data = await submissionService.getSubmissionsForChallengeService({
      challengeId,
      userId,
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
 * Controller to handle fetching a user's stats in a group.
 * Endpoint: GET /api/groups/:groupId/users/:userId/stats
 */
export const getUserStatsController = async (req, res, next) => {
  try {
    const { groupId, userId } = req.params;

    const data = await submissionService.getUserStatsService({
      userId,
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
  solveChallengeController,
  getChallengeSubmissionsController,
  getUserStatsController,
};
