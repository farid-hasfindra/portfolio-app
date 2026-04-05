import { prisma } from "@/lib/db";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { addExperience, deleteExperience } from "@/app/actions/experience";
import { Briefcase, Plus, Trash2, Building2, Calendar } from "lucide-react";

export const revalidate = 0;

export default async function ExperienceAdmin() {
  const experiences = await prisma.experience.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Briefcase size={16} className="text-amber-400" />
          <span className="text-xs text-neutral-500 uppercase tracking-widest font-semibold">Career History</span>
        </div>
        <h1 className="text-3xl font-bold text-white">Experience Management</h1>
        <p className="mt-1 text-neutral-400 text-sm">
          {experiences.length} position{experiences.length !== 1 ? "s" : ""} displayed on your portfolio.
        </p>
      </div>

      <div className="grid gap-8 xl:grid-cols-5">
        {/* Add Form */}
        <div className="xl:col-span-2">
          <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-6 space-y-5 sticky top-8">
            <div>
              <h3 className="font-semibold text-white flex items-center gap-2">
                <Plus size={16} className="text-amber-400" /> Add New Position
              </h3>
              <p className="text-xs text-neutral-500 mt-1">Add a past or current role.</p>
            </div>
            <form action={addExperience} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-neutral-300 text-sm flex items-center gap-1.5">
                    <Building2 size={12} /> Company
                  </Label>
                  <Input name="company" required placeholder="e.g. Google"
                    className="bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 rounded-xl h-10" />
                </div>
                <div className="space-y-2">
                  <Label className="text-neutral-300 text-sm">Role / Title</Label>
                  <Input name="role" required placeholder="e.g. AI Engineer"
                    className="bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 rounded-xl h-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-neutral-300 text-sm flex items-center gap-1.5">
                  <Calendar size={12} /> Period
                </Label>
                <Input name="period" required placeholder="e.g. 2022 - Present"
                  className="bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 rounded-xl h-10" />
              </div>
              <div className="space-y-2">
                <Label className="text-neutral-300 text-sm">Description / Achievements</Label>
                <Textarea name="description" required rows={4} placeholder="Describe your role, impact, and achievements..."
                  className="bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 rounded-xl resize-none" />
              </div>
              <Button type="submit"
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white rounded-xl font-semibold shadow-lg shadow-amber-500/20">
                <Plus size={16} className="mr-2" /> Add Experience
              </Button>
            </form>
          </div>
        </div>

        {/* Experience List */}
        <div className="xl:col-span-3 space-y-4">
          <h3 className="font-semibold text-white">Work History ({experiences.length})</h3>
          <div className="relative">
            {/* Timeline line */}
            {experiences.length > 0 && (
              <div className="absolute left-4 top-4 bottom-4 w-px bg-gradient-to-b from-amber-500/30 via-amber-500/10 to-transparent" />
            )}
            <div className="space-y-3">
              {experiences.map((exp, idx) => {
                const deleteAction = deleteExperience.bind(null, exp.id);
                return (
                  <div key={exp.id} className="relative pl-12">
                    {/* Timeline dot */}
                    <div className="absolute left-[11px] top-5 w-[10px] h-[10px] rounded-full border-2 border-amber-500 bg-[#030014]" />
                    <div className="rounded-2xl bg-white/[0.03] border border-white/5 hover:border-amber-500/20 p-4 transition-all group">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-bold text-white text-sm">{exp.role}</h4>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                              {exp.period}
                            </span>
                          </div>
                          <p className="text-cyan-400 text-xs font-medium mt-0.5 flex items-center gap-1">
                            <Building2 size={11} /> {exp.company}
                          </p>
                          <p className="text-neutral-400 text-xs mt-2 leading-relaxed line-clamp-3">{exp.description}</p>
                        </div>
                        <form action={deleteAction}>
                          <button type="submit"
                            className="shrink-0 p-2 rounded-lg text-neutral-600 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
                            title="Remove experience"
                          >
                            <Trash2 size={14} />
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                );
              })}
              {experiences.length === 0 && (
                <div className="text-center py-16 text-neutral-600 rounded-2xl border border-dashed border-white/5">
                  No experience yet. Add your first position!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
