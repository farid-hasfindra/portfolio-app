// Migration script: convert githubUrl -> githubLinks
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const projects = await prisma.project.findMany();

  let migrated = 0;
  for (const project of projects) {
    // Only migrate if githubLinks is still empty AND githubUrl has a value
    const currentLinks = project.githubLinks;
    const isEmpty = Array.isArray(currentLinks) && currentLinks.length === 0;

    if (isEmpty && project.githubUrl && project.githubUrl.trim() !== "") {
      await prisma.project.update({
        where: { id: project.id },
        data: {
          githubLinks: [{ name: "Repository", url: project.githubUrl }],
        },
      });
      console.log(`✅ Migrated: ${project.title}`);
      migrated++;
    } else {
      console.log(`⏭️  Skipped: ${project.title} (already has links or no githubUrl)`);
    }
  }

  console.log(`\nDone! ${migrated} project(s) migrated.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
