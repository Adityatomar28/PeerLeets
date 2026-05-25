import groupRepository from "../modules/group/group.repository.js";

/**
 * Middleware to authorize group membership.
 * Verifies that the authenticated user belongs to the requested group.
 * Expects protectRoute to have run first, populating req.user.
 */
export const isGroupMember = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Access token is missing or invalid",
      });
    }

    if (!groupId) {
      return res.status(400).json({
        success: false,
        message: "Bad Request: Group ID is required",
      });
    }

    // Verify UUID formatting to prevent raw database parsing crashes
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    if (!uuidRegex.test(groupId)) {
      return res.status(400).json({
        success: false,
        message: "Bad Request: Invalid Group ID format",
      });
    }

    const isMember = await groupRepository.isAlreadyMember(userId, groupId);

    if (!isMember) {
      return res.status(403).json({
        success: false,
        message: "Access Denied: You are not authorized to view this group or its members",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};
