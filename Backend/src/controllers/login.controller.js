// Login controller

import {
  signupService,
  loginService,
} from "../modules/auth/auth.service.js";

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