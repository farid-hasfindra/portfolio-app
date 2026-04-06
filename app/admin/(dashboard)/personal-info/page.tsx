import { prisma } from "@/lib/db";
import { User } from "lucide-react";
import { PersonalInfoForm } from "@/components/admin/PersonalInfoForm";

export const revalidate = 0;

export default async function PersonalInfoAdmin() {
  const info = await prisma.personalInfo.findFirst();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <User size={16} className="text-cyan-400" />
          <span className="text-xs text-neutral-500 uppercase tracking-widest font-semibold">Identity</span>
        </div>
        <h1 className="text-3xl font-bold text-white">Personal Information</h1>
        <p className="mt-1 text-neutral-400 text-sm">Changes here will reflect instantly on your Hero section.</p>
      </div>

      <PersonalInfoForm info={info} />
    </div>
  );
}
