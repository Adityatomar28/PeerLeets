import express from 'express';
import * as challengeController from './challenge.controller.js';
import { protectRoute } from '../../middleware/auth.middleware.js';
import { isGroupMember } from '../../middleware/challenge.middleware.js';

const router = express.Router();

// All daily challenge routes are protected and require JWT authentication
router.use(protectRoute);

// Create slot, activate challenge, fetch today's task, close active challenge, and fetch paginated history
router.post('/:groupId/challenges', isGroupMember, challengeController.createDailyChallengeSlotController);
router.patch('/:groupId/challenges/:challengeId/activate', isGroupMember, challengeController.activateChallengeController);
router.get('/:groupId/challenges/today', isGroupMember, challengeController.getTodayChallengeController);
router.patch('/:groupId/challenges/:challengeId/close', isGroupMember, challengeController.closeChallengeController);
router.get('/:groupId/challenges/history', isGroupMember, challengeController.getChallengeHistoryController);

export default router;
