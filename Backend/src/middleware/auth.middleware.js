import jwt from "jsonwebtoken";
import { findUserById } from "../modules/auth/auth.repository.js";

export const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const token = authHeader.split(' ')[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await findUserById(decodedToken.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: " + error.message,
    });
  }
};
