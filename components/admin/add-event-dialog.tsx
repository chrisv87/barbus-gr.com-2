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
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface AddEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddEventDialog({ open, onOpenChange }: AddEventDialogProps) {
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    capacity: "",
    duration: "",
    pickupLocation: "",
    price: "",
    image: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle event creation here
    onOpenChange(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/95 border-purple-800/30 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-purple-300">Create New Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-black/60 border-purple-800/30"
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-black/60 border-purple-800/30 min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                className="bg-black/60 border-purple-800/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <div className="relative">
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="bg-black/60 border-purple-800/30 pl-10"
                  placeholder="e.g., 3 hours"
                />
                <Clock className="absolute left-3 top-3 h-4 w-4 text-purple-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pickupLocation">Pickup Location</Label>
              <Input
                id="pickupLocation"
                value={formData.pickupLocation}
                onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                className="bg-black/60 border-purple-800/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="bg-black/60 border-purple-800/30"
                placeholder="$"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Event Image</Label>
            <div className="border-2 border-dashed border-purple-800/30 rounded-lg p-4 text-center">
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="image"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload className="h-8 w-8 text-purple-400" />
                <span className="text-sm text-purple-300">
                  {formData.image ? formData.image.name : "Click to upload image"}
                </span>
              </label>
            </div>
          </div>

          <DialogFooter className="gap-2">
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
              Save as Draft
            </Button>
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700"
            >
              Save & Publish
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}