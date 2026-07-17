import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

let connectionString = process.env.DATABASE_URL;

// Auto-patch Supabase connection strings to use Transaction pooler
if (connectionString && connectionString.includes('supabase.com:5432')) {
  connectionString = connectionString.replace(':5432', ':6543');
  if (!connectionString.includes('pgbouncer=true')) {
    connectionString += (connectionString.includes('?') ? '&' : '?') + 'pgbouncer=true&connection_limit=1';
  }
}

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
  max: 1, // Limit connections to prevent Vercel Serverless from exhausting Supabase session slots
});
const adapter = new PrismaPg(pool);

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
