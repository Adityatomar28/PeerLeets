import challengeService from "./challenge.service.js";

/**
 * Controller to handle creating a daily challenge slot.
 * Endpoint: POST /api/groups/:groupId/challenges
 */
export const createDailyChallengeSlotController = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const data = await challengeService.createDailyChallengeSlot({ groupId });

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to handle activating a daily challenge.
 * Endpoint: PATCH /api/groups/:groupId/challenges/:challengeId/activate
 */
export const activateChallengeController = async (req, res, next) => {
  try {
    const { challengeId } = req.params;
    const { problemLink } = req.body;
    const userId = req.user.id;

    const data = await challengeService.activateChallengeService({
      challengeId,
      userId,
      problemLink,
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
 * Controller to handle fetching today's challenge slot.
 * Endpoint: GET /api/groups/:groupId/challenges/today
 */
export const getTodayChallengeController = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const data = await challengeService.getTodayChallengeService({ groupId });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to handle closing an active challenge.
 * Endpoint: PATCH /api/groups/:groupId/challenges/:challengeId/close
 */
export const closeChallengeController = async (req, res, next) => {
  try {
    const { challengeId } = req.params;
    const data = await challengeService.closeChallengeService({ challengeId });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to handle fetching paginated group challenge history.
 * Endpoint: GET /api/groups/:groupId/challenges/history
 */
export const getChallengeHistoryController = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const { page, limit } = req.query;

    const data = await challengeService.getChallengeHistoryService({
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

export default {
  createDailyChallengeSlotController,
  activateChallengeController,
  getTodayChallengeController,
  closeChallengeController,
  getChallengeHistoryController,
};
