import prisma from "../../config/db.js";
import groupRepository from "./group.repository.js";
import groupUtils from "./group.utils.js";

/**
 * Creates custom error with status codes for controller mapping.
 */
const createError = (message, status) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

/**
 * Service to create a new group.
 * Runs in a secure transaction.
 * @param {object} params
 * @param {string} params.name
 * @param {string} params.creatorId
 * @returns {Promise<object>} Created Group
 */
export const createGroupService = async ({ name, creatorId }) => {
  if (!name || name.trim() === '') {
    throw createError("Group name is required", 400);
  }

  let inviteCode;
  let codeInUse = true;
  let attempts = 0;

  while (codeInUse && attempts < 10) {
    inviteCode = groupUtils.generateInviteCode();
    const existingGroup = await groupRepository.findGroupByInviteCode(inviteCode);
    if (!existingGroup) {
      codeInUse = false;
    }
    attempts++;
  }

  if (codeInUse) {
    throw createError("Failed to generate a unique invite code", 500);
  }

  // Execute create group, admin member, and user stats initialization in a transaction
  return prisma.$transaction(async (tx) => {
    const group = await groupRepository.createGroup({
      name,
      inviteCode,
      createdBy: creatorId,
    }, tx);

    await groupRepository.createGroupMember({
      userId: creatorId,
      groupId: group.id,
      role: "ADMIN",
    }, tx);

    // Initialize UserGroupStats
    await tx.userGroupStats.create({
      data: {
        userId: creatorId,
        groupId: group.id,
      },
    });

    return group;
  });
};

/**
 * Service to join a group using invite code.
 * Runs in a transaction.
 * @param {object} params
 * @param {string} params.inviteCode
 * @param {string} params.userId
 * @returns {Promise<object>} Created GroupMember join row
 */
export const joinGroupService = async ({ inviteCode, userId }) => {
  if (!inviteCode || inviteCode.trim() === '') {
    throw createError("Invite code is required", 400);
  }

  const group = await groupRepository.findGroupByInviteCode(inviteCode.trim().toUpperCase());
  if (!group) {
    throw createError("Group not found", 404);
  }

  const isMember = await groupRepository.isAlreadyMember(userId, group.id);
  if (isMember) {
    throw createError("You are already a member of this group", 409);
  }

  // Create membership and stats tracking inside a transaction
  return prisma.$transaction(async (tx) => {
    const membership = await groupRepository.createGroupMember({
      userId,
      groupId: group.id,
      role: "MEMBER",
    }, tx);

    await tx.userGroupStats.create({
      data: {
        userId,
        groupId: group.id,
      },
    });

    return membership;
  });
};

/**
 * Service to retrieve a group's details along with its member sheet.
 * @param {string} groupId
 * @returns {Promise<object>} Group details with nested members
 */
export const getGroupService = async (groupId) => {
  if (!groupId) {
    throw createError("Group ID is required", 400);
  }

  // Regex check for UUID parameters to prevent raw Postgres parse errors
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  if (!uuidRegex.test(groupId)) {
    throw createError("Invalid Group ID format", 400);
  }

  const group = await groupRepository.findGroupById(groupId);
  if (!group) {
    throw createError("Group not found", 404);
  }

  const members = await groupRepository.findGroupMembers(groupId);

  return {
    id: group.id,
    name: group.name,
    inviteCode: group.inviteCode,
    createdBy: group.createdBy,
    createdAt: group.createdAt,
    members: members.map(m => ({
      id: m.id,
      userId: m.user.id,
      name: m.user.name,
      email: m.user.email,
      role: m.role,
      joinedAt: m.joinedAt,
    })),
  };
};

/**
 * Service to leave a group.
 * Safely removes group membership and streaks tracking in a transaction,
 * and emits a MEMBERSHIP_REVOKED event for realtime socket eviction.
 */
export const leaveGroupService = async ({ userId, groupId }) => {
  if (!groupId) {
    throw createError("Group ID is required", 400);
  }

  const isMember = await groupRepository.isAlreadyMember(userId, groupId);
  if (!isMember) {
    throw createError("You are not a member of this group", 400);
  }

  // Creator cannot leave directly
  const group = await groupRepository.findGroupById(groupId);
  if (group && group.createdBy === userId) {
    throw createError("Group admins/creators cannot leave their group. Delegate ownership or delete the group.", 400);
  }

  // Atomically delete membership and statistics
  await prisma.$transaction(async (tx) => {
    await tx.groupMember.delete({
      where: {
        userId_groupId: {
          userId,
          groupId,
        },
      },
    });

    await tx.userGroupStats.delete({
      where: {
        userId_groupId: {
          userId,
          groupId,
        },
      },
    });
  });

  // Emit event asynchronously
  const { eventEmitter } = await import("../../services/event.service.js");
  setImmediate(() => {
    try {
      eventEmitter.emit("MEMBERSHIP_REVOKED", {
        userId,
        groupId,
      });
    } catch (err) {
      console.error("Error emitting membership revoked event:", err);
    }
  });

  return true;
};

/**
 * Service to fetch all groups a user has joined along with their stats.
 * @param {string} userId
 * @returns {Promise<Array>} List of groups with nested userGroupStats
 */
export const getUserGroupsService = async (userId) => {
  if (!userId) {
    throw createError("User ID is required", 400);
  }

  const stats = await prisma.userGroupStats.findMany({
    where: { userId },
    include: {
      group: {
        include: {
          _count: {
            select: { members: true }
          }
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return stats.map(s => ({
    id: s.group.id,
    name: s.group.name,
    inviteCode: s.group.inviteCode,
    memberCount: s.group._count.members,
    stats: {
      currentStreak: s.currentStreak,
      longestStreak: s.longestStreak,
      totalSolved: s.totalSolved,
      last7DaysSolved: s.last7DaysSolved,
      last30DaysSolved: s.last30DaysSolved,
      freezeCount: s.freezeCount,
      lastSolvedDate: s.lastSolvedDate,
    }
  }));
};

export default {
  createGroupService,
  joinGroupService,
  getGroupService,
  leaveGroupService,
  getUserGroupsService,
};
