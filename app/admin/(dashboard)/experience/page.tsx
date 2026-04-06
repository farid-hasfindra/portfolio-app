import { prisma } from "@/lib/db";
import { Briefcase } from "lucide-react";
import { ExperienceClient } from "@/components/admin/ExperienceClient";

export const revalidate = 0;

export default async function ExperienceAdmin() {
  const experiences = await prisma.experience.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Briefcase size={16} className="text-cyan-400" />
          <span className="text-xs text-neutral-500 uppercase tracking-widest font-semibold">Career History</span>
        </div>
        <h1 className="text-3xl font-bold text-white">Experience Management</h1>
        <p className="mt-1 text-neutral-400 text-sm">
          {experiences.length} position{experiences.length !== 1 ? "s" : ""} displayed on your portfolio.
        </p>
      </div>

      <ExperienceClient initialExperience={experiences} />
    </div>
  );
}
