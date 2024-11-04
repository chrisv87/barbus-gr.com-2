"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Users, Calendar, Route, Search, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { UserManagementTable } from "@/components/admin/user-management-table";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/firebase/auth";
import { getAllUsers } from "@/lib/firebase/admin";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeEvents: 0,
    activeRoutes: 0
  });
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const users = await getAllUsers();
      setStats(prev => ({
        ...prev,
        totalUsers: users.length
      }));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load dashboard stats",
      });
    }
  }

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/login");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign out",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-950/20 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-purple-300">Admin Dashboard</h1>
          <div className="flex gap-4 items-center">
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 bg-black/60 border-purple-800/30"
            />
            <Button 
              variant="ghost" 
              onClick={handleLogout}
              className="text-purple-300 hover:text-purple-100"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/admin/staff">
            <Card className="bg-black/60 border-purple-800/30 hover:bg-purple-900/20 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <UserPlus className="w-5 h-5 text-purple-400" />
                  <span>Manage Staff</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">Add, edit, or remove staff members</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/users">
            <Card className="bg-black/60 border-purple-800/30 hover:bg-purple-900/20 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-purple-400" />
                  <span>Users</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-300">{stats.totalUsers}</div>
                <p className="text-sm text-gray-400">Total registered users</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/events">
            <Card className="bg-black/60 border-purple-800/30 hover:bg-purple-900/20 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-purple-400" />
                  <span>Events</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-300">{stats.activeEvents}</div>
                <p className="text-sm text-gray-400">Active events</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/routes">
            <Card className="bg-black/60 border-purple-800/30 hover:bg-purple-900/20 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Route className="w-5 h-5 text-purple-400" />
                  <span>Routes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-300">{stats.activeRoutes}</div>
                <p className="text-sm text-gray-400">Active routes</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        <Card className="bg-black/60 border-purple-800/30">
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
          </CardHeader>
          <CardContent>
            <UserManagementTable searchTerm={searchTerm} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}