"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black/95 px-4">
      <Card className="w-full max-w-lg border-primary/20">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <ShieldAlert className="h-12 w-12 text-red-500" />
          </div>
          <CardTitle className="text-2xl font-bold">Access Denied</CardTitle>
          <CardDescription>You don't have permission to access this page</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Link href="/">
            <Button variant="default">Return to Home</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}