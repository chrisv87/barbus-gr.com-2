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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface XPEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function XPEventDialog({ open, onOpenChange }: XPEventDialogProps) {
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: "",
    multiplier: "2",
    description: "",
    minLevel: "1",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle XP event creation here
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/95 border-purple-800/30">
        <DialogHeader>
          <DialogTitle className="text-purple-300">Create XP Boost Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Event Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-black/60 border-purple-800/30"
              placeholder="Weekend XP Boost"
            />
          </div>

          <div className="space-y-2">
            <Label>Event Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-black/95 border-purple-800/30">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="multiplier">XP Multiplier</Label>
              <Select
                value={formData.multiplier}
                onValueChange={(value) => setFormData({ ...formData, multiplier: value })}
              >
                <SelectTrigger className="bg-black/60 border-purple-800/30">
                  <SelectValue placeholder="Select multiplier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2x</SelectItem>
                  <SelectItem value="3">3x</SelectItem>
                  <SelectItem value="4">4x</SelectItem>
                  <SelectItem value="5">5x</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="minLevel">Minimum Level Required</Label>
              <Select
                value={formData.minLevel}
                onValueChange={(value) => setFormData({ ...formData, minLevel: value })}
              >
                <SelectTrigger className="bg-black/60 border-purple-800/30">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Level 1+</SelectItem>
                  <SelectItem value="5">Level 5+</SelectItem>
                  <SelectItem value="10">Level 10+</SelectItem>
                  <SelectItem value="20">Level 20+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-black/60 border-purple-800/30"
              placeholder="Earn bonus XP on all rides during this event!"
            />
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
              Create XP Event
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}