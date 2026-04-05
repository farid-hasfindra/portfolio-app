import { LayoutDashboard, LogOut, User, Wrench, Briefcase, Code } from "lucide-react";
import Link from "next/link";
import { logout } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#030014] text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-neutral-900/50 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">Admin Dashboard</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-neutral-300 hover:text-white transition-colors">
            <LayoutDashboard size={20} />
            Overview
          </Link>
          <Link href="/admin/personal-info" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-neutral-300 hover:text-white transition-colors">
            <User size={20} />
            Personal Info
          </Link>
          <Link href="/admin/skills" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-neutral-300 hover:text-white transition-colors">
            <Wrench size={20} />
            Skills
          </Link>
          <Link href="/admin/projects" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-neutral-300 hover:text-white transition-colors">
            <Code size={20} />
            Projects
          </Link>
          <Link href="/admin/experience" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-neutral-300 hover:text-white transition-colors">
            <Briefcase size={20} />
            Experience
          </Link>
        </nav>
        <div className="p-4 border-t border-white/10">
          <form action={logout}>
            <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-400/10" type="submit">
              <LogOut className="mr-2" size={20} />
              Sign Out
            </Button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
