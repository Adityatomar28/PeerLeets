// Auth service placeholder
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  createUser,
  findUserByEmail,
} from "./auth.repository.js";


const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    }
  );
};

export const signupService = async ({
  name, email, password,
}) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await createUser({
    name, email, password: hashedPassword,
  });

  const token = generateToken(user.id);

  return { user, token };

};

export const loginService = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid Password")
  }
  const token = generateToken(user.id);
  return { user, token };

};




module.exports = {
  // TODO: implement auth business logic
  signupService,
  loginService,
};
