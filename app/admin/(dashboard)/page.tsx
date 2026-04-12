import { prisma } from "@/lib/db";
import { User, Wrench, Code, Briefcase, ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";

export const revalidate = 0;

export default async function AdminDashboard() {
  const [skillsCount, projectsCount, personalInfo] = await Promise.all([
    prisma.skill.count(),
    prisma.project.count(),
    prisma.personalInfo.findFirst(),
  ]);

  const stats = [
    {
      label: "Personal Info",
      value: personalInfo ? "Configured" : "Not Set",
      icon: User,
      href: "/admin/personal-info",
      color: "from-cyan-500/20 to-blue-600/10",
      border: "border-cyan-500/20",
      iconColor: "text-cyan-400",
      glow: "shadow-cyan-500/10",
    },
    {
      label: "Skills",
      value: skillsCount,
      suffix: "technologies",
      icon: Wrench,
      href: "/admin/skills",
      color: "from-blue-500/20 to-blue-700/10",
      border: "border-blue-500/20",
      iconColor: "text-blue-400",
      glow: "shadow-blue-500/10",
    },
    {
      label: "Projects",
      value: projectsCount,
      suffix: "projects",
      icon: Code,
      href: "/admin/projects",
      color: "from-teal-500/20 to-emerald-600/10",
      border: "border-teal-500/20",
      iconColor: "text-teal-400",
      glow: "shadow-teal-500/10",
    },
  ];

  const quickActions = [
    { label: "Edit Personal Info", desc: "Update your name, tagline & email", href: "/admin/personal-info", icon: User },
    { label: "Manage Skills", desc: "Add or remove your tech skills", href: "/admin/skills", icon: Wrench },
    { label: "Add New Project", desc: "Showcase a new AI project", href: "/admin/projects", icon: Code },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs text-neutral-500 uppercase tracking-widest font-semibold">Live</span>
        </div>
        <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
        <p className="mt-1 text-neutral-400 text-sm">
          {personalInfo ? `Managing portfolio for ${personalInfo.name}` : "Welcome to your portfolio CMS"}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, suffix, icon: Icon, href, color, border, iconColor, glow }) => (
          <Link key={label} href={href}>
            <div className={`relative rounded-2xl bg-gradient-to-br ${color} border ${border} p-5 shadow-lg ${glow} hover:scale-[1.02] transition-all duration-200 cursor-pointer group`}>
              <div className="flex justify-between items-start mb-3">
                <div className={`p-2 rounded-xl bg-white/5 ${iconColor}`}>
                  <Icon size={18} />
                </div>
                <ArrowRight size={14} className="text-neutral-600 group-hover:text-neutral-300 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-neutral-400 text-xs font-medium uppercase tracking-widest">{label}</p>
              <p className="text-2xl font-bold text-white mt-1">{value}</p>
              {suffix && <p className="text-xs text-neutral-500 mt-0.5">{suffix}</p>}
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={16} className="text-cyan-400" />
          <h2 className="text-lg font-semibold text-white">Quick Actions</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {quickActions.map(({ label, desc, href, icon: Icon }) => (
            <Link key={href} href={href}>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all duration-200 group cursor-pointer">
                <div className="p-2.5 rounded-xl bg-white/5 text-neutral-400 group-hover:text-cyan-400 transition-colors">
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-white">{label}</p>
                  <p className="text-xs text-neutral-500 truncate">{desc}</p>
                </div>
                <ArrowRight size={14} className="text-neutral-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
