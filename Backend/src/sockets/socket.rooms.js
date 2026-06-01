import groupRepository from "../modules/group/group.repository.js";
import { SERVER_EVENTS } from "./socket.events.js";

/**
 * Validates whether an ID is a properly formatted UUID.
 */
const validateUuid = (id) => {
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return typeof id === 'string' && uuidRegex.test(id);
};

/**
 * Secures room entry by verifying database group membership.
 * Rejects non-members, duplicate requests, and invalid IDs.
 */
export const joinGroupRoom = async (socket, groupId) => {
  try {
    const userId = socket.user?.id;
    if (!userId) {
      socket.emit(SERVER_EVENTS.ERROR, { message: "Authentication required", code: 'UNAUTHORIZED' });
      return;
    }

    if (!validateUuid(groupId)) {
      socket.emit(SERVER_EVENTS.ERROR, { message: "Invalid group ID format", code: 'INVALID_GROUP_ID' });
      return;
    }

    const group = await groupRepository.findGroupById(groupId);
    if (!group) {
      socket.emit(SERVER_EVENTS.ERROR, { message: "Group does not exist", code: 'GROUP_NOT_FOUND' });
      return;
    }

    const isMember = await groupRepository.isAlreadyMember(userId, groupId);
    if (!isMember) {
      socket.emit(SERVER_EVENTS.ERROR, { message: "Access Denied: You are not a member of this group", code: 'ACCESS_DENIED' });
      return;
    }

    const roomName = `group:${groupId}`;

    // Prevent duplicate room joins for this specific socket
    if (socket.rooms.has(roomName)) {
      console.log(`[Socket Rooms] Socket ${socket.id} already active in ${roomName}`);
      return;
    }

    await socket.join(roomName);
    console.log(`[Socket Rooms] Secure Room Join: User "${socket.user.name}" (${userId}) -> "${roomName}"`);
  } catch (error) {
    console.error("[Socket Rooms] Error handling room join:", error.message);
    socket.emit(SERVER_EVENTS.ERROR, { message: "Internal database error during room join", code: 'DB_ERROR' });
  }
};

/**
 * Safely removes a socket session from a group room channel.
 */
export const leaveGroupRoom = async (socket, groupId) => {
  try {
    const userId = socket.user?.id;
    if (!userId) return;

    if (!validateUuid(groupId)) {
      socket.emit(SERVER_EVENTS.ERROR, { message: "Invalid group ID format", code: 'INVALID_GROUP_ID' });
      return;
    }

    const roomName = `group:${groupId}`;
    await socket.leave(roomName);
    console.log(`[Socket Rooms] Secure Room Leave: User "${socket.user.name}" (${userId}) <- "${roomName}"`);
  } catch (error) {
    console.error("[Socket Rooms] Error handling room leave:", error.message);
    socket.emit(SERVER_EVENTS.ERROR, { message: "Internal error during room leave", code: 'LEAVE_ERROR' });
  }
};

export default {
  joinGroupRoom,
  leaveGroupRoom,
};
