"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const ADMIN_EMAIL = "chris.v@barbus-gr.com";
const ADMIN_PASSWORD = "12345678";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      toast({
        title: "Login successful",
        description: "Welcome back, Admin!",
      });
      router.push("/admin/dashboard");
      return;
    }

    toast({
      variant: "destructive",
      title: "Invalid credentials",
      description: "Please check your email and password.",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-purple-950/20 p-4">
      <Card className="w-full max-w-md border-purple-800/30 bg-black/60 backdrop-blur-sm">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-10 h-10 text-purple-400" />
          </div>
          <CardTitle className="text-2xl text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
            Admin Portal
          </CardTitle>
          <CardDescription className="text-center text-purple-300/60">
            Access your administrative dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-purple-950/20 border-purple-800/30"
                placeholder="admin@barbusgr.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-purple-950/20 border-purple-800/30"
              />
            </div>
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}