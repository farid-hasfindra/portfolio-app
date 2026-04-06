import { prisma } from "@/lib/db";
import { Wrench } from "lucide-react";
import { SkillsClient } from "@/components/admin/SkillsClient";

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

      <SkillsClient initialSkills={skills} />
    </div>
  );
}
