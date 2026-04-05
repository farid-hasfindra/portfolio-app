import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Wrench, Briefcase, Code } from "lucide-react";

export const revalidate = 0;

export default async function AdminDashboard() {
  const [skillsCount, projectsCount, expCount] = await Promise.all([
    prisma.skill.count(),
    prisma.project.count(),
    prisma.experience.count(),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">Personal Info</CardTitle>
            <User className="h-4 w-4 text-neutral-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">Configured</div>
          </CardContent>
        </Card>
        
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">Skills</CardTitle>
            <Wrench className="h-4 w-4 text-neutral-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{skillsCount}</div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">Projects</CardTitle>
            <Code className="h-4 w-4 text-neutral-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{projectsCount}</div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">Experience</CardTitle>
            <Briefcase className="h-4 w-4 text-neutral-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{expCount}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
