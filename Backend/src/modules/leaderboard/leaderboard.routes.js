import express from 'express';
import * as leaderboardController from './leaderboard.controller.js';
import { protectRoute } from '../../middleware/auth.middleware.js';
import { isGroupMember } from '../../middleware/group.middleware.js';

const router = express.Router();

// Enforce JWT validation globally on all leaderboard paths
router.use(protectRoute);

// Standard leaderboards, participation status, activity logs, and inactive users
router.get('/:groupId/leaderboard', isGroupMember, leaderboardController.getLeaderboardController);
router.get('/:groupId/leaderboard/weekly', isGroupMember, leaderboardController.getWeeklyLeaderboardController);
router.get('/:groupId/leaderboard/monthly', isGroupMember, leaderboardController.getMonthlyLeaderboardController);
router.get('/:groupId/challenges/:challengeId/status', isGroupMember, leaderboardController.getChallengeParticipationController);
router.get('/:groupId/activity', isGroupMember, leaderboardController.getActivityFeedController);
router.get('/:groupId/users/inactive', isGroupMember, leaderboardController.getInactiveUsersController);

export default router;
