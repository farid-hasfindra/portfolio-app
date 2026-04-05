import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { addSkill, deleteSkill } from "@/app/actions/skills";
import * as LucideIcons from "lucide-react";

export const revalidate = 0;

export default async function SkillsAdmin() {
  const skills = await prisma.skill.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Skills Management</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Add Skill Form */}
        <Card className="bg-neutral-900 border-neutral-800 text-white h-fit lg:col-span-1">
          <CardHeader>
            <CardTitle>Add New Skill</CardTitle>
            <CardDescription className="text-neutral-400">Add a technology you are proficient in.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={addSkill} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Skill Name</Label>
                <Input id="name" name="name" placeholder="e.g. React" required className="bg-neutral-800 border-neutral-700 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="icon">Lucide Icon Name</Label>
                <Input id="icon" name="icon" placeholder="e.g. Globe" required className="bg-neutral-800 border-neutral-700 text-white" />
                <p className="text-xs text-neutral-500">Pick an icon name from <a href="https://lucide.dev/icons" target="_blank" rel="noreferrer" className="text-primary hover:underline">Lucide React</a>.</p>
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">
                Add Skill
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Existing Skills */}
        <div className="space-y-4 lg:col-span-2">
          <h3 className="text-lg font-semibold text-white">Current Skills</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {skills.map(skill => {
              const IconComponent = (LucideIcons as any)[skill.icon] || LucideIcons.Code2;
              const deleteAction = deleteSkill.bind(null, skill.id);
              
              return (
                <Card key={skill.id} className="bg-neutral-800/50 border-neutral-800 text-white flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <IconComponent className="w-6 h-6 text-primary" />
                    <span className="font-medium text-neutral-200">{skill.name}</span>
                  </div>
                  <form action={deleteAction}>
                    <Button variant="destructive" size="sm" type="submit">Remove</Button>
                  </form>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
