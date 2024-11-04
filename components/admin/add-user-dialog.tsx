"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface AddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddUserDialog({ open, onOpenChange }: AddUserDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle user creation here
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/95 border-purple-800/30">
        <DialogHeader>
          <DialogTitle className="text-purple-300">Add New User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-black/60 border-purple-800/30"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-black/60 border-purple-800/30"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={formData.role}
              onValueChange={(value) => setFormData({ ...formData, role: value })}
            >
              <SelectTrigger className="bg-black/60 border-purple-800/30">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="bg-black/95 border-purple-800/30">
                <SelectItem value="client">Client</SelectItem>
                <SelectItem value="employee">Employee</SelectItem>
                <SelectItem value="promoter">Promoter</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-purple-800/30 text-purple-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700"
            >
              Add User
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}