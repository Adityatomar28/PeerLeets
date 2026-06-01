import { EventEmitter } from 'events';
import activityQueue from '../queues/activity.queue.js';

// Global Event Emitter instance for social routing
export const eventEmitter = new EventEmitter();

/**
 * Initializes listeners for all core Daily Challenge and Solve events.
 * Routes all in-process events directly into BullMQ's activityQueue.
 * Ensures persistent, distributed activity logging that survives server crashes.
 */
export const initEventListeners = () => {
  const events = [
    'CHALLENGE_CREATED',
    'CHALLENGE_ACTIVATED',
    'CHALLENGE_CLOSED',
    'SOLVED',
    'STREAK_UPDATED',
    'FIRST_SOLVER',
    'FREEZE_USED',
    'MISSED',
    'REMINDER_TRIGGERED',
  ];

  for (const eventName of events) {
    // Prevent duplicate listeners if called multiple times in hot reload
    eventEmitter.removeAllListeners(eventName);

    eventEmitter.on(eventName, (payload) => {
      // Queue into BullMQ immediately in the next event loop tick
      setImmediate(async () => {
        try {
          console.log(`[Event Bus] Routing event "${eventName}" to persistent BullMQ queue`);
          await activityQueue.add(eventName, payload);
        } catch (error) {
          console.error(`[Event Bus] Failed to enqueue event "${eventName}" to BullMQ:`, error.message);
        }
      });
    });
  }
};

export default {
  eventEmitter,
  initEventListeners,
};
