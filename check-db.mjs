import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const info = await prisma.personalInfo.findMany();
  console.log(JSON.stringify(info, null, 2));
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
