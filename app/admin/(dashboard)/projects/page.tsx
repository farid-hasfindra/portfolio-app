import { prisma } from "@/lib/db";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { addProject, deleteProject } from "@/app/actions/projects";
import { Code, Plus, Trash2, Github, ExternalLink, Tag, Image } from "lucide-react";

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

      <div className="grid gap-8 xl:grid-cols-5">
        {/* Add Form */}
        <div className="xl:col-span-2">
          <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-6 space-y-5 sticky top-8">
            <div>
              <h3 className="font-semibold text-white flex items-center gap-2">
                <Plus size={16} className="text-pink-400" /> Add New Project
              </h3>
              <p className="text-xs text-neutral-500 mt-1">It will appear on the portfolio homepage.</p>
            </div>
            <form action={addProject} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-neutral-300 text-sm">Project Title</Label>
                <Input name="title" required placeholder="e.g. HealthBot AI"
                  className="bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 rounded-xl h-10" />
              </div>
              <div className="space-y-2">
                <Label className="text-neutral-300 text-sm">Description</Label>
                <Textarea name="description" required rows={3} placeholder="What the project does..."
                  className="bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 rounded-xl resize-none" />
              </div>
              <div className="space-y-2">
                <Label className="text-neutral-300 text-sm flex items-center gap-1.5">
                  <Tag size={12} /> Tags
                  <span className="text-neutral-600 font-normal">(comma separated)</span>
                </Label>
                <Input name="tags" required placeholder="Python, FastAPI, LLM"
                  className="bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 rounded-xl h-10" />
              </div>
              <div className="space-y-2">
                <Label className="text-neutral-300 text-sm flex items-center gap-1.5">
                  <Image size={12} /> Cover Image URL
                </Label>
                <Input name="image" required placeholder="https://..."
                  className="bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 rounded-xl h-10" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-neutral-300 text-sm flex items-center gap-1.5">
                    <Github size={12} /> GitHub URL
                  </Label>
                  <Input name="githubUrl" required placeholder="https://github.com/..."
                    className="bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 rounded-xl h-10 text-xs" />
                </div>
                <div className="space-y-2">
                  <Label className="text-neutral-300 text-sm flex items-center gap-1.5">
                    <ExternalLink size={12} /> Demo URL
                  </Label>
                  <Input name="demoUrl" required placeholder="https://..."
                    className="bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 rounded-xl h-10 text-xs" />
                </div>
              </div>
              <Button type="submit"
                className="w-full bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-500 hover:to-pink-600 text-white rounded-xl font-semibold shadow-lg shadow-pink-500/20">
                <Plus size={16} className="mr-2" /> Add Project
              </Button>
            </form>
          </div>
        </div>

        {/* Projects List */}
        <div className="xl:col-span-3 space-y-4">
          <h3 className="font-semibold text-white">Current Projects ({projects.length})</h3>
          <div className="space-y-3">
            {projects.map((project, idx) => {
              const deleteAction = deleteProject.bind(null, project.id);
              return (
                <div key={project.id}
                  className="rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all overflow-hidden group"
                >
                  {/* Image Banner */}
                  {project.image && (
                    <div className="relative h-32 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={project.image} alt={project.title}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
                      <span className="absolute top-3 left-3 text-xs font-bold text-white/50 bg-black/40 px-2 py-0.5 rounded-full">
                        #{idx + 1}
                      </span>
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-white text-base">{project.title}</h4>
                        <p className="text-neutral-500 text-xs mt-1 line-clamp-2">{project.description}</p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {project.tags.map(tag => (
                            <span key={tag}
                              className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-neutral-400 border border-white/5">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <form action={deleteAction}>
                        <button type="submit"
                          className="shrink-0 p-2 rounded-lg text-neutral-600 hover:text-red-400 hover:bg-red-500/10 transition-all"
                          title="Remove project"
                        >
                          <Trash2 size={15} />
                        </button>
                      </form>
                    </div>
                    <div className="flex gap-3 mt-3 pt-3 border-t border-white/5 text-xs text-neutral-500">
                      <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                        <Github size={12} /> GitHub
                      </a>
                      <a href={project.demoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                        <ExternalLink size={12} /> Demo
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
            {projects.length === 0 && (
              <div className="text-center py-16 text-neutral-600 rounded-2xl border border-dashed border-white/5">
                No projects yet. Add your first one!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
