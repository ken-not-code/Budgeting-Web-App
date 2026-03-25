import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // No seed data needed for production D1
  console.log("D1 production ready - no seed data");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
