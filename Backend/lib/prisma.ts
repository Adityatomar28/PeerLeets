import { PrismaClient } from "../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;
const ssl = connectionString && (connectionString.includes("sslmode=require") || connectionString.includes("sslmode=prefer") || connectionString.includes("db.prisma.io"))
  ? { rejectUnauthorized: false }
  : undefined;

const pool = new pg.Pool({ connectionString, ssl });
const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
