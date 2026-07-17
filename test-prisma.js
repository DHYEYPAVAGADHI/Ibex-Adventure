const { PrismaClient } = require('@prisma/client');
const Database = require('better-sqlite3');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

const dbUrl = (process.env.DATABASE_URL || "file:./dev.db").replace(/^file:/, "");
const connection = new Database(dbUrl);
const adapter = new PrismaBetterSqlite3(connection);

const prisma = new PrismaClient({ adapter, log: ['error'] });

async function main() {
  try {
    const categories = await prisma.activity.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    });
    console.log("Categories found:", categories.length);
  } catch (e) {
    console.error("PRISMA ERROR:", e);
  }
}

main();
