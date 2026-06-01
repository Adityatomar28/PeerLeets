import prisma from "../../config/db.js";
import challengeRepository from "./challenge.repository.js";
import challengeUtils from "./challenge.utils.js";
import { eventEmitter } from "../../services/event.service.js";

/**
 * Creates custom error with status codes for controller mapping.
 */
const createError = (message, status) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

/**
 * Validates group ID format before querying.
 */
const validateGroupId = (groupId) => {
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  if (!groupId || !uuidRegex.test(groupId)) {
    throw createError("Invalid Group ID format", 400);
  }
};

/**
 * Validates challenge ID format.
 */
const validateChallengeId = (challengeId) => {
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  if (!challengeId || !uuidRegex.test(challengeId)) {
    throw createError("Invalid Challenge ID format", 400);
  }
};

/**
 * Creates a WAITING challenge slot for the day and assigns the next rotating challenger.
 * @param {object} params
 * @param {string} params.groupId
 * @returns {Promise<object>} Created WAITING challenge slot
 */
export const createDailyChallengeSlot = async ({ groupId }) => {
  validateGroupId(groupId);

  const today = challengeUtils.getTodayUtc();

  // 1. Verify no challenge already exists for today in this group
  const existingChallenge = await challengeRepository.findTodayChallenge(groupId, today);
  if (existingChallenge) {
    throw createError("A challenge slot already exists for today", 409);
  }

  // 2. Retrieve active group members ordered by joinedAt ascending
  const members = await challengeRepository.getGroupMembersOrdered(groupId);
  if (!members || members.length === 0) {
    throw createError("Cannot create challenge slot: Group has no active members", 400);
  }

  // 3. Find the most recent challenge created with an assigned challenger
  const lastChallenge = await challengeRepository.findLastChallenger(groupId);
  const lastChallengerId = lastChallenge ? lastChallenge.createdBy : null;

  // 4. Determine the next challenger in rotation
  const nextChallengerId = challengeUtils.getNextChallenger(members, lastChallengerId);

  // 5. Create the WAITING challenge slot
  const slot = await challengeRepository.createChallenge({
    groupId,
    date: today,
    createdBy: nextChallengerId,
  });

  // Emit event asynchronously
  eventEmitter.emit('CHALLENGE_CREATED', {
    userId: nextChallengerId,
    groupId,
    challengeId: slot.id,
  });

  return slot;
};

/**
 * Activates a WAITING challenge slot. Only the assigned challenger can activate it.
 * @param {object} params
 * @param {string} params.challengeId
 * @param {string} params.userId Requesting user ID (assigned challenger)
 * @param {string} params.problemLink Link to the DSA problem
 * @returns {Promise<object>} Activated challenge
 */
export const activateChallengeService = async ({ challengeId, userId, problemLink }) => {
  validateChallengeId(challengeId);

  if (!problemLink || problemLink.trim() === "") {
    throw createError("problemLink is required to activate challenge", 400);
  }

  const challenge = await challengeRepository.findChallengeById(challengeId);
  if (!challenge) {
    throw createError("Challenge not found", 404);
  }

  // State Transition Validations
  if (challenge.status === "CLOSED") {
    throw createError("Cannot modify a closed challenge", 400);
  }
  if (challenge.status === "ACTIVE") {
    throw createError("Challenge is already active", 400);
  }

  // Access Control: requester must match assigned challenger
  if (challenge.createdBy !== userId) {
    throw createError("Access Denied: Only the assigned challenger can activate this challenge", 403);
  }

  const updatedChallenge = await challengeRepository.updateChallenge(challengeId, {
    problemLink,
    status: "ACTIVE",
  });

  // Emit event asynchronously
  eventEmitter.emit('CHALLENGE_ACTIVATED', {
    userId,
    groupId: challenge.groupId,
    challengeId,
    problemLink: updatedChallenge.problemLink,
  });

  return updatedChallenge;
};

/**
 * Retrieves today's challenge slot for a group.
 * @param {object} params
 * @param {string} params.groupId
 * @returns {Promise<object>} Today's challenge details
 */
export const getTodayChallengeService = async ({ groupId }) => {
  validateGroupId(groupId);

  const today = challengeUtils.getTodayUtc();
  const challenge = await challengeRepository.findTodayChallenge(groupId, today);

  if (!challenge) {
    throw createError("No challenge slot exists for today", 404);
  }

  return challenge;
};

/**
 * Transitions an ACTIVE challenge to CLOSED status.
 * @param {object} params
 * @param {string} params.challengeId
 * @returns {Promise<object>} Closed challenge
 */
export const closeChallengeService = async ({ challengeId }) => {
  validateChallengeId(challengeId);

  const challenge = await challengeRepository.findChallengeById(challengeId);
  if (!challenge) {
    throw createError("Challenge not found", 404);
  }

  if (challenge.status === "CLOSED") {
    throw createError("Challenge already closed", 400);
  }

  if (challenge.status === "WAITING") {
    throw createError("Cannot close a challenge that has not been activated", 400);
  }

  const updatedChallenge = await challengeRepository.updateChallenge(challengeId, {
    status: "CLOSED",
  });

  // Emit event asynchronously
  setImmediate(() => {
    try {
      eventEmitter.emit('CHALLENGE_CLOSED', {
        challengeId,
        groupId: challenge.groupId,
        userId: challenge.createdBy || "",
      });
    } catch (err) {
      console.error("Error emitting challenge closed event:", err);
    }
  });

  return updatedChallenge;
};

/**
 * Retrieves paginated historical challenges for a group.
 * @param {object} params
 * @param {string} params.groupId
 * @param {number} [params.page]
 * @param {number} [params.limit]
 * @returns {Promise<Array>} List of historical challenges
 */
export const getChallengeHistoryService = async ({ groupId, page = 1, limit = 10 }) => {
  validateGroupId(groupId);

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);

  const skip = (Math.max(1, isNaN(pageNum) ? 1 : pageNum) - 1) * (isNaN(limitNum) ? 10 : limitNum);
  const take = Math.min(100, Math.max(1, isNaN(limitNum) ? 10 : limitNum));

  return challengeRepository.getChallengeHistory(groupId, skip, take);
};

export default {
  createDailyChallengeSlot,
  activateChallengeService,
  getTodayChallengeService,
  closeChallengeService,
  getChallengeHistoryService,
};
