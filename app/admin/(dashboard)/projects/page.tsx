import { prisma } from "@/lib/db";
import { Code } from "lucide-react";
import { ProjectsClient } from "@/components/admin/ProjectsClient";

export const revalidate = 0;

export default async function ProjectsAdmin() {
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Code size={16} className="text-pink-400" />
          <span className="text-xs text-neutral-500 uppercase tracking-widest font-semibold">Portfolio</span>
        </div>
        <h1 className="text-3xl font-bold text-white">Projects Management</h1>
        <p className="mt-1 text-neutral-400 text-sm">
          {projects.length} project{projects.length !== 1 ? "s" : ""} on your portfolio.
        </p>
      </div>

      <ProjectsClient initialProjects={projects} />
    </div>
  );
}
