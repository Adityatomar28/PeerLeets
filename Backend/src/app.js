import express from 'express';
import authRoutes from "./modules/auth/auth.routes.js";
import groupRoutes from "./modules/group/group.routes.js";
import challengeRoutes from "./modules/challenge/challenge.routes.js";
import submissionRoutes from "./modules/submission/submission.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/groups", challengeRoutes);
app.use("/api/groups", submissionRoutes);

// Centralized error handler
app.use(errorMiddleware);

export default app;
