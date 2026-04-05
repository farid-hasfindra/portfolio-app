import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { addProject, deleteProject } from "@/app/actions/projects";

export const revalidate = 0;

export default async function ProjectsAdmin() {
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Projects Management</h1>
      
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-neutral-900 border-neutral-800 text-white h-fit">
          <CardHeader>
            <CardTitle>Add New Project</CardTitle>
            <CardDescription className="text-neutral-400">Add a portfolio project.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={addProject} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" required className="bg-neutral-800 border-neutral-700 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" required className="bg-neutral-800 border-neutral-700 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input id="tags" name="tags" placeholder="React, Python, Tailwind" required className="bg-neutral-800 border-neutral-700 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input id="image" name="image" required className="bg-neutral-800 border-neutral-700 text-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="githubUrl">GitHub URL</Label>
                  <Input id="githubUrl" name="githubUrl" required className="bg-neutral-800 border-neutral-700 text-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="demoUrl">Demo URL</Label>
                  <Input id="demoUrl" name="demoUrl" required className="bg-neutral-800 border-neutral-700 text-white" />
                </div>
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">
                Add Project
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Current Projects</h3>
          <div className="grid gap-3">
            {projects.map(project => {
              const deleteAction = deleteProject.bind(null, project.id);
              return (
                <Card key={project.id} className="bg-neutral-800/50 border-neutral-800 text-white p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-lg">{project.title}</h4>
                      <p className="text-neutral-400 text-sm mb-2">{project.tags.join(", ")}</p>
                      <p className="text-neutral-500 text-xs line-clamp-2">{project.description}</p>
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
