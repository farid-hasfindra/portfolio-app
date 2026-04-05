import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { updatePersonalInfo } from "@/app/actions/personal-info";

export const revalidate = 0;

export default async function PersonalInfoAdmin() {
  const info = await prisma.personalInfo.findFirst();

  if (!info) return <div className="text-white p-8">No personal info configuring found. Please seed the database first.</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Personal Information</h1>
      <Card className="bg-neutral-900 border-neutral-800 text-white">
        <CardHeader>
          <CardTitle>Edit Your Identity</CardTitle>
          <CardDescription className="text-neutral-400">
            This information will be displayed on the Hero section of your portfolio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={updatePersonalInfo} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" defaultValue={info.name} required className="bg-neutral-800 border-neutral-700 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" defaultValue={info.email} required className="bg-neutral-800 border-neutral-700 text-white" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title">Professional Title</Label>
              <Input id="title" name="title" defaultValue={info.title} required className="bg-neutral-800 border-neutral-700 text-white" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tagline">Tagline</Label>
              <Input id="tagline" name="tagline" defaultValue={info.tagline} required className="bg-neutral-800 border-neutral-700 text-white" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">About / Description</Label>
              <Textarea id="description" name="description" defaultValue={info.description} required className="bg-neutral-800 border-neutral-700 text-white min-h-[100px]" />
            </div>

            <Button type="submit" className="bg-primary hover:bg-primary/90 text-white">
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
