import express from 'express';
import * as groupController from './group.controller.js';
import { protectRoute } from '../../middleware/auth.middleware.js';
import { isGroupMember } from '../../middleware/group.middleware.js';

const router = express.Router();

// All group routes are protected and require JWT verification
router.use(protectRoute);

// Group operations
router.post('/', groupController.createGroupController);
router.post('/join', groupController.joinGroupController);
router.get('/', groupController.getUserGroupsController);

// Member-only operations (verified via isGroupMember middleware)
router.get('/:groupId', isGroupMember, groupController.getGroupController);
router.get('/:groupId/members', isGroupMember, groupController.getGroupMembersController);
router.post('/:groupId/leave', isGroupMember, groupController.leaveGroupController);

export default router;
