"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030014] p-4 text-white">
      <Card className="w-full max-w-md bg-neutral-900 border-neutral-800 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
            Admin Portal
          </CardTitle>
          <CardDescription className="text-neutral-400">
            Enter your credentials to access the portfolio dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                required
                className="bg-neutral-800 border-neutral-700"
                placeholder="admin"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="bg-neutral-800 border-neutral-700"
                placeholder="••••••••"
              />
            </div>
            
            {state?.error && (
              <p className="text-sm font-medium text-red-500">{state.error}</p>
            )}

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={pending}>
              {pending ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
