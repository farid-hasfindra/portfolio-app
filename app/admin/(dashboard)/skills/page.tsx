import { prisma } from "@/lib/db";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { addSkill, deleteSkill } from "@/app/actions/skills";
import * as LucideIcons from "lucide-react";
import { Wrench, Plus, Trash2, ExternalLink } from "lucide-react";

export const revalidate = 0;

export default async function SkillsAdmin() {
  const skills = await prisma.skill.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Wrench size={16} className="text-cyan-400" />
          <span className="text-xs text-neutral-500 uppercase tracking-widest font-semibold">Technical Arsenal</span>
        </div>
        <h1 className="text-3xl font-bold text-white">Skills Management</h1>
        <p className="mt-1 text-neutral-400 text-sm">
          {skills.length} skill{skills.length !== 1 ? "s" : ""} currently displayed on your portfolio.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Add Form */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-6 space-y-5">
            <div>
              <h3 className="font-semibold text-white flex items-center gap-2">
                <Plus size={16} className="text-cyan-400" /> Add New Skill
              </h3>
              <p className="text-xs text-neutral-500 mt-1">Pick an icon name from Lucide React.</p>
            </div>
            <form action={addSkill} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-neutral-300 text-sm">Skill Name</Label>
                <Input
                  name="name" required
                  placeholder="e.g. TensorFlow"
                  className="bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 rounded-xl h-10"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-neutral-300 text-sm">
                  Lucide Icon Name{" "}
                  <a href="https://lucide.dev/icons" target="_blank" rel="noreferrer"
                    className="text-cyan-500 hover:text-cyan-400 transition-colors inline-flex items-center gap-0.5">
                    Browse <ExternalLink size={11} />
                  </a>
                </Label>
                <Input
                  name="icon" required
                  placeholder="e.g. Brain"
                  className="bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 rounded-xl h-10"
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 text-white rounded-xl font-semibold shadow-lg shadow-cyan-500/20">
                <Plus size={16} className="mr-2" /> Add Skill
              </Button>
            </form>
          </div>
        </div>

        {/* Current Skills */}
        <div className="lg:col-span-3 space-y-4">
          <h3 className="font-semibold text-white">Current Skills ({skills.length})</h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {skills.map(skill => {
              const IconComponent = (LucideIcons as any)[skill.icon] || LucideIcons.Code2;
              const deleteAction = deleteSkill.bind(null, skill.id);
              return (
                <div key={skill.id}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/5">
                      <IconComponent size={16} className="text-cyan-400" />
                    </div>
                    <span className="text-sm text-neutral-200 font-medium">{skill.name}</span>
                  </div>
                  <form action={deleteAction}>
                    <button type="submit"
                      className="p-1.5 rounded-lg text-neutral-600 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
                      title="Remove skill"
                    >
                      <Trash2 size={14} />
                    </button>
                  </form>
                </div>
              );
            })}
            {skills.length === 0 && (
              <div className="col-span-2 text-center py-10 text-neutral-600">No skills yet. Add one!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
