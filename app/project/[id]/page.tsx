import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { ProjectClient } from "./ProjectClient";
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  
  if (!project) return { title: "Project Not Found" };
  
  return {
    title: `${project.title} | Portfolio`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    notFound();
  }

  // Fetch up to 5 other projects to display in the "Up Next" sidebar
  const otherProjects = await prisma.project.findMany({
    where: {
      id: { not: id }
    },
    orderBy: {
      order: 'asc'
    },
    take: 5
  });

  return <ProjectClient project={project} otherProjects={otherProjects} />;
}
