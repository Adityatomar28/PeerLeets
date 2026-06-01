import express from 'express';
import authRoutes from "./modules/auth/auth.routes.js";
import groupRoutes from "./modules/group/group.routes.js";
import challengeRoutes from "./modules/challenge/challenge.routes.js";
import submissionRoutes from "./modules/submission/submission.routes.js";
import leaderboardRoutes from "./modules/leaderboard/leaderboard.routes.js";
import { initEventListeners } from "./services/event.service.js";
import errorMiddleware from "./middleware/error.middleware.js";

// Import all background worker loops to boot up subscriptions
import "./workers/challenge.worker.js";
import "./workers/streak.worker.js";
import "./workers/reminder.worker.js";
import "./workers/activity.worker.js";

import { startCronSchedulers } from "./services/automation.service.js";
import { initRealtimeEventBridge } from "./events/realtime.events.js";

// Initialize the Event Emitter listeners on server startup
initEventListeners();

// Initialize the Realtime Event Bridge to bridge events to Socket.IO
initRealtimeEventBridge();

// Trigger the repeatable cron scheduler registry in BullMQ
startCronSchedulers();

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/groups", challengeRoutes);
app.use("/api/groups", submissionRoutes);
app.use("/api/groups", leaderboardRoutes);

// Centralized error handler
app.use(errorMiddleware);

export default app;
