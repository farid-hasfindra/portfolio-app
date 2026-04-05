import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#030014] text-white">
      {/* Background glows */}
      <div className="fixed top-0 left-0 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[300px] h-[300px] bg-cyan-900/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <AdminSidebar />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-8 py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
