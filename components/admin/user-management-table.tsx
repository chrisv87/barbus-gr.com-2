"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, UserCog, Ban, Key } from "lucide-react";
import { getAllUsers, updateUserRole, deleteUser } from "@/lib/firebase/admin";
import { useToast } from "@/hooks/use-toast";

interface UserManagementTableProps {
  searchTerm: string;
}

export function UserManagementTable({ searchTerm }: UserManagementTableProps) {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const allUsers = await getAllUsers();
      setUsers(allUsers);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load users",
      });
    } finally {
      setLoading(false);
    }
  }

  const filteredUsers = users.filter(user =>
    Object.values(user).some(value =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleRoleUpdate = async (userId: string, newRole: string) => {
    try {
      await updateUserRole(userId, newRole);
      toast({
        title: "Success",
        description: "User role updated successfully",
      });
      loadUsers();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update user role",
      });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await deleteUser(userId);
      toast({
        title: "Success",
        description: "User deleted successfully",
      });
      loadUsers();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete user",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-md border border-purple-800/30">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.displayName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge variant="outline" className="text-purple-300 border-purple-800">
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={user.disabled ? "destructive" : "success"}>
                  {user.disabled ? "Disabled" : "Active"}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-black/90 border-purple-800/30">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleRoleUpdate(user.id, "client")}>
                      <UserCog className="mr-2 h-4 w-4" />
                      Set as Client
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleRoleUpdate(user.id, "employee")}>
                      <UserCog className="mr-2 h-4 w-4" />
                      Set as Employee
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleRoleUpdate(user.id, "admin")}>
                      <Key className="mr-2 h-4 w-4" />
                      Set as Admin
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="text-red-500"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <Ban className="mr-2 h-4 w-4" />
                      Delete User
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}