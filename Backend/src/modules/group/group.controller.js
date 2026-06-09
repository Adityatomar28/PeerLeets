import groupService from "./group.service.js";

/**
 * Controller to handle Group Creation.
 * Endpoint: POST /api/groups
 */
export const createGroupController = async (req, res, next) => {
  try {
    const { name } = req.body;
    const creatorId = req.user.id;

    const data = await groupService.createGroupService({ name, creatorId });

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to handle Joining a Group via invite code.
 * Endpoint: POST /api/groups/join
 */
export const joinGroupController = async (req, res, next) => {
  try {
    const { inviteCode } = req.body;
    const userId = req.user.id;

    const data = await groupService.joinGroupService({ inviteCode, userId });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to handle Fetching Group Details.
 * Endpoint: GET /api/groups/:groupId
 */
export const getGroupController = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const data = await groupService.getGroupService(groupId);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to handle Fetching Group Members.
 * Endpoint: GET /api/groups/:groupId/members
 */
export const getGroupMembersController = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    
    // Retrieve group details which internally fetches and formats the member list
    const groupData = await groupService.getGroupService(groupId);

    res.status(200).json({
      success: true,
      data: groupData.members,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to handle Leaving a Group.
 * Endpoint: POST /api/groups/:groupId/leave
 */
export const leaveGroupController = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const userId = req.user.id;

    await groupService.leaveGroupService({ userId, groupId });

    res.status(200).json({
      success: true,
      message: "Successfully left the group",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to handle Fetching All Groups for the authenticated User.
 * Endpoint: GET /api/groups
 */
export const getUserGroupsController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const data = await groupService.getUserGroupsService(userId);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createGroupController,
  joinGroupController,
  getGroupController,
  getGroupMembersController,
  leaveGroupController,
  getUserGroupsController,
};
