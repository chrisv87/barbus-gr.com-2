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
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";

interface Stop {
  name: string;
  price: number;
}

interface AddRouteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddRouteDialog({ open, onOpenChange }: AddRouteDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    days: {
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
      Sunday: false,
    },
    stops: [{ name: "", price: 5 }],
    returnPrice: 10,
    allNightPass: 30,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle route creation here
    onOpenChange(false);
  };

  const addStop = () => {
    setFormData({
      ...formData,
      stops: [...formData.stops, { name: "", price: 5 }],
    });
  };

  const removeStop = (index: number) => {
    setFormData({
      ...formData,
      stops: formData.stops.filter((_, i) => i !== index),
    });
  };

  const updateStop = (index: number, field: keyof Stop, value: string | number) => {
    const newStops = [...formData.stops];
    newStops[index] = { ...newStops[index], [field]: value };
    setFormData({ ...formData, stops: newStops });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/95 border-purple-800/30 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-purple-300">Add New Route</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Route Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-black/60 border-purple-800/30"
            />
          </div>

          <div className="space-y-2">
            <Label>Operating Days</Label>
            <div className="grid grid-cols-7 gap-2">
              {Object.entries(formData.days).map(([day, checked]) => (
                <div key={day} className="flex items-center space-x-2">
                  <Checkbox
                    id={day}
                    checked={checked}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        days: { ...formData.days, [day]: !!checked },
                      })
                    }
                  />
                  <Label htmlFor={day}>{day.slice(0, 3)}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Stops</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addStop}
                className="border-purple-800/30 text-purple-300"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Stop
              </Button>
            </div>
            {formData.stops.map((stop, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Stop name"
                    value={stop.name}
                    onChange={(e) => updateStop(index, "name", e.target.value)}
                    className="bg-black/60 border-purple-800/30"
                  />
                </div>
                <div className="w-32">
                  <Input
                    type="number"
                    placeholder="Price"
                    value={stop.price}
                    onChange={(e) => updateStop(index, "price", Number(e.target.value))}
                    className="bg-black/60 border-purple-800/30"
                  />
                </div>
                {formData.stops.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeStop(index)}
                    className="text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="returnPrice">Return Trip Price</Label>
              <Input
                id="returnPrice"
                type="number"
                value={formData.returnPrice}
                onChange={(e) => setFormData({ ...formData, returnPrice: Number(e.target.value) })}
                className="bg-black/60 border-purple-800/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="allNightPass">All Night Pass Price</Label>
              <Input
                id="allNightPass"
                type="number"
                value={formData.allNightPass}
                onChange={(e) => setFormData({ ...formData, allNightPass: Number(e.target.value) })}
                className="bg-black/60 border-purple-800/30"
              />
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
              Create Route
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}