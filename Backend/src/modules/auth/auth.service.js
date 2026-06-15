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
    name,
    email,
    passwordHash: hashedPassword,
  });

  const token = generateToken(user.id);

  return { user, token };
};

export const loginService = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    throw new Error("Invalid Password");
  }
  const token = generateToken(user.id);
  return { user, token };
};

export const clerkSyncService = async (clerkToken) => {
  const { createClerkClient, verifyToken } = await import("@clerk/backend");

  if (!process.env.CLERK_SECRET_KEY) {
    throw new Error("CLERK_SECRET_KEY is not configured on the server");
  }

  const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
  });

  const payload = await verifyToken(clerkToken, {
    secretKey: process.env.CLERK_SECRET_KEY,
  });

  const clerkUser = await clerkClient.users.getUser(payload.sub);
  const email = clerkUser.emailAddresses.find(
    (entry) => entry.id === clerkUser.primaryEmailAddressId
  )?.emailAddress;

  if (!email) {
    throw new Error("Clerk account has no primary email");
  }

  const name =
    [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ").trim() ||
    clerkUser.username ||
    email.split("@")[0];

  let user = await findUserByEmail(email);

  if (!user) {
    const placeholderPassword = await bcrypt.hash(payload.sub, 10);
    user = await createUser({
      name,
      email,
      passwordHash: placeholderPassword,
    });
  }

  const token = generateToken(user.id);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  };
};
