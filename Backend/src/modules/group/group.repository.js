import prisma from "../../config/db.js";

/**
 * Creates a new Group.
 * Supports optional transaction context.
 * @param {object} data
 * @param {string} data.name
 * @param {string} data.inviteCode
 * @param {string} data.createdBy
 * @param {object} [tx] Prisma transaction client
 * @returns {Promise<object>} Created Group
 */
export const createGroup = async ({ name, inviteCode, createdBy }, tx) => {
  const db = tx || prisma;
  return db.group.create({
    data: {
      name,
      inviteCode,
      createdBy,
    },
  });
};

/**
 * Creates a new GroupMember.
 * Supports optional transaction context.
 * @param {object} data
 * @param {string} data.userId
 * @param {string} data.groupId
 * @param {string} data.role
 * @param {object} [tx] Prisma transaction client
 * @returns {Promise<object>} Created GroupMember
 */
export const createGroupMember = async ({ userId, groupId, role }, tx) => {
  const db = tx || prisma;
  return db.groupMember.create({
    data: {
      userId,
      groupId,
      role,
    },
  });
};

/**
 * Finds a Group by its invite code.
 * @param {string} inviteCode
 * @returns {Promise<object|null>}
 */
export const findGroupByInviteCode = async (inviteCode) => {
  return prisma.group.findUnique({
    where: {
      inviteCode,
    },
  });
};

/**
 * Finds a Group by its unique ID.
 * @param {string} id
 * @returns {Promise<object|null>}
 */
export const findGroupById = async (id) => {
  return prisma.group.findUnique({
    where: {
      id,
    },
  });
};

/**
 * Retrieves all members of a Group, selecting essential user profile fields.
 * Avoids returning password hash or other sensitive fields.
 * @param {string} groupId
 * @returns {Promise<Array>} List of GroupMember joins
 */
export const findGroupMembers = async (groupId) => {
  return prisma.groupMember.findMany({
    where: {
      groupId,
    },
    select: {
      id: true,
      role: true,
      joinedAt: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      joinedAt: "asc",
    },
  });
};

/**
 * Checks if a user is already a member of a Group.
 * @param {string} userId
 * @param {string} groupId
 * @returns {Promise<boolean>}
 */
export const isAlreadyMember = async (userId, groupId) => {
  const membership = await prisma.groupMember.findUnique({
    where: {
      userId_groupId: {
        userId,
        groupId,
      },
    },
  });
  return !!membership;
};

export default {
  createGroup,
  createGroupMember,
  findGroupByInviteCode,
  findGroupById,
  findGroupMembers,
  isAlreadyMember,
};
