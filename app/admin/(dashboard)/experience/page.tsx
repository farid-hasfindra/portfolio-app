import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { addExperience, deleteExperience } from "@/app/actions/experience";

export const revalidate = 0;

export default async function ExperienceAdmin() {
  const experiences = await prisma.experience.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Experience Management</h1>
      
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-neutral-900 border-neutral-800 text-white h-fit">
          <CardHeader>
            <CardTitle>Add New Experience</CardTitle>
            <CardDescription className="text-neutral-400">Add a past job or role.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={addExperience} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" name="company" required className="bg-neutral-800 border-neutral-700 text-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role / Title</Label>
                  <Input id="role" name="role" required className="bg-neutral-800 border-neutral-700 text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="period">Period (e.g. 2021 - 2023)</Label>
                <Input id="period" name="period" required className="bg-neutral-800 border-neutral-700 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (Achievements, duties)</Label>
                <Textarea id="description" name="description" required className="bg-neutral-800 border-neutral-700 text-white" />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">
                Add Experience
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Current Experience</h3>
          <div className="grid gap-3">
            {experiences.map(exp => {
              const deleteAction = deleteExperience.bind(null, exp.id);
              return (
                <Card key={exp.id} className="bg-neutral-800/50 border-neutral-800 text-white p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-lg">{exp.role} <span className="text-primary font-normal text-sm">@ {exp.company}</span></h4>
                      <p className="text-neutral-400 text-xs mb-2">{exp.period}</p>
                      <p className="text-neutral-300 text-sm line-clamp-2">{exp.description}</p>
                    </div>
                    <form action={deleteAction} className="ml-4">
                      <Button variant="destructive" size="sm" type="submit">Remove</Button>
                    </form>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
