"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserManagementTable } from "@/components/admin/user-management-table";
import { UserPlus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { AddUserDialog } from "@/components/admin/add-user-dialog";

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-950/20 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard">
              <Button variant="ghost" size="icon" className="text-purple-300">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-purple-300">User Management</h1>
          </div>
          <div className="flex items-center gap-4">
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 bg-black/60 border-purple-800/30"
            />
            <Button 
              onClick={() => setIsAddUserOpen(true)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>

        <Card className="bg-black/60 border-purple-800/30">
          <CardContent className="pt-6">
            <UserManagementTable searchTerm={searchTerm} />
          </CardContent>
        </Card>

        <AddUserDialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen} />
      </div>
    </div>
  );
}