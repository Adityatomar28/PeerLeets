import express from 'express';
import * as submissionController from './submission.controller.js';
import { protectRoute } from '../../middleware/auth.middleware.js';
import { isGroupMember } from '../../middleware/group.middleware.js';

const router = express.Router();

// Enforce JWT validation globally on all submission paths
router.use(protectRoute);

// Standard solve flow, query submissions, and fetch user stats
router.post('/:groupId/challenges/:challengeId/solve', isGroupMember, submissionController.solveChallengeController);
router.get('/:groupId/challenges/:challengeId/submissions', isGroupMember, submissionController.getChallengeSubmissionsController);
router.get('/:groupId/users/:userId/stats', isGroupMember, submissionController.getUserStatsController);

export default router;
