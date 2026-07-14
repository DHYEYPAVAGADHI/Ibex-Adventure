import { prisma } from "./lib/prisma";
async function main() {
  const count = await prisma.package.count();
  console.log("Count:", count);
}
main().catch(console.error);
