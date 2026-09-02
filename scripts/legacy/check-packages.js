import { prisma } from './lib/prisma';
async function main() {
  const pkgs = await prisma.package.findMany({ select: { slug: true, status: true, publishStatus: true }});
  console.log(pkgs);
}
main().then(() => prisma.$disconnect());
