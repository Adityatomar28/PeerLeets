import { EventEmitter } from 'events';
import activityService from '../modules/activity/activity.service.js';

// Global Event Emitter instance for social routing
export const eventEmitter = new EventEmitter();

/**
 * Initializes listeners for all core Daily Challenge and Solve events.
 * Listens to: CHALLENGE_CREATED, CHALLENGE_ACTIVATED, SOLVED, STREAK_UPDATED, FIRST_SOLVER, FREEZE_USED
 * Processes events asynchronously in fire-and-forget loops so primary threads are never blocked.
 */
export const initEventListeners = () => {
  const events = [
    'CHALLENGE_CREATED',
    'CHALLENGE_ACTIVATED',
    'SOLVED',
    'STREAK_UPDATED',
    'FIRST_SOLVER',
    'FREEZE_USED',
  ];

  for (const eventName of events) {
    // Prevent duplicate listeners if called multiple times in hot reload
    eventEmitter.removeAllListeners(eventName);

    eventEmitter.on(eventName, (payload) => {
      // Execute asynchronously in the next event loop tick
      setImmediate(async () => {
        try {
          console.log(`Async Event Captured: ${eventName}`);
          await activityService.processEvent({ type: eventName, payload });
        } catch (error) {
          console.error(`Error processing async event ${eventName}:`, error);
          // Fails gracefully: primary database updates remain intact
        }
      });
    });
  }
};

export default {
  eventEmitter,
  initEventListeners,
};
