"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, User, Wrench, Code, Briefcase, LogOut } from "lucide-react";
import { logout } from "@/app/actions/auth";

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/personal-info", label: "Personal Info", icon: User },
  { href: "/admin/skills", label: "Skills", icon: Wrench },
  { href: "/admin/projects", label: "Projects", icon: Code },
  { href: "/admin/experience", label: "Experience", icon: Briefcase },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 border-r border-white/5 bg-black/40 backdrop-blur-xl flex flex-col min-h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-600 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Code size={16} className="text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Portfolio CMS</h2>
            <p className="text-xs text-neutral-500">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? "bg-gradient-to-r from-cyan-600/20 to-blue-600/10 text-white border border-cyan-500/20 shadow-lg shadow-cyan-500/5"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon
                size={18}
                className={isActive ? "text-cyan-400" : "text-neutral-500 group-hover:text-neutral-300"}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Sign Out */}
      <div className="p-4 border-t border-white/5">
        <form 
          action={async () => {
            if (confirm("Are you sure you want to sign out?")) {
              await logout();
            }
          }}
        >
          <button
            type="submit"
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 group"
          >
            <LogOut size={18} className="group-hover:text-red-400 transition-colors" />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}
