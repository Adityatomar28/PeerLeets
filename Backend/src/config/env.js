import { config } from "dotenv";
import { fileURLToPath } from "node:url";

const backendEnvLocal = fileURLToPath(
  new URL("../../.env.local", import.meta.url)
);
const backendEnv = fileURLToPath(new URL("../../.env", import.meta.url));
const rootEnv = fileURLToPath(new URL("../../../.env", import.meta.url));

config({
  path: [backendEnvLocal, rootEnv, backendEnv],
  quiet: true,
});

const requiredVariables = [
  "DATABASE_URL",
  "JWT_SECRET",
  "CLERK_SECRET_KEY",
  "REDIS_URL",
];

export const validateEnvironment = () => {
  const missing = requiredVariables.filter((name) => !process.env[name]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }
};

export default process.env;
