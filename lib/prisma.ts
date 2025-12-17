import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const connectionString = process.env.DATABASE_URL;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  // Create a pool - if DATABASE_URL is not set, the pool will fail on first query
  // but we handle that gracefully in our API routes with try/catch
  const pool = new pg.Pool({ 
    connectionString: connectionString || "postgresql://localhost:5432/portfolio" 
  });
  const adapter = new PrismaPg(pool);
  
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
