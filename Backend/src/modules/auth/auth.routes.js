import express from "express";
import {
  signup,
  login,
  getUserActivity,
  updateProfile,
} from "../../controllers/login.controller.js";
import { protectRoute } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/activity", protectRoute, getUserActivity);
router.patch("/profile", protectRoute, updateProfile);

export default router;  