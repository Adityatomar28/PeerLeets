// Login controller

import {
  signupService,
  loginService,
  clerkSyncService,
} from "../modules/auth/auth.service.js";
import prisma from "../config/db.js";

export const signup = async (req, res, next) => {
  try {
    const result = await signupService(req.body);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const login = async (req, res, next) => {
  try {
    const result = await loginService(req.body);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const clerkSync = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Missing Clerk session token",
      });
    }

    const clerkToken = authHeader.split(" ")[1];
    const result = await clerkSyncService(clerkToken);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message || "Clerk sync failed",
    });
  }
};

export const getUserActivity = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const submissions = await prisma.submission.findMany({
      where: {
        userId,
        solved: true,
      },
      select: {
        solvedAt: true,
      },
      orderBy: {
        solvedAt: "asc",
      },
    });

    res.status(200).json({
      success: true,
      data: submissions.map((s) => s.solvedAt.toISOString()),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name || name.trim() === '') {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: { name: name.trim() },
      select: {
        id: true,
        name: true,
        email: true,
      }
    });

    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};