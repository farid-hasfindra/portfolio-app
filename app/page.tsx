import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { prisma } from "@/lib/db";

export const revalidate = 0;

export default async function Home() {
  const [personalInfo, skills, projects] = await Promise.all([
    prisma.personalInfo.findFirst(),
    prisma.skill.findMany({ orderBy: { order: "asc" } }),
    prisma.project.findMany({ orderBy: { order: "asc" } }),
  ]);

  if (!personalInfo) return null;

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-white">
      <Navbar />
      <Hero personalInfo={personalInfo} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Contact personalInfo={personalInfo} />
    </main>
  );
}
