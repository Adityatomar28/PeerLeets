import "./env.js";
import { PrismaClient } from "../../generated/prisma/index.js";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const connectionString = process.env.DATABASE_URL;
const ssl = connectionString && (connectionString.includes("sslmode=require") || connectionString.includes("sslmode=prefer") || connectionString.includes("db.prisma.io"))
  ? { rejectUnauthorized: false }
  : undefined;

const pool = new pg.Pool({ connectionString, ssl });
const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
