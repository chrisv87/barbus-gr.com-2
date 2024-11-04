"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

export default function RentalPage() {
  const [date, setDate] = useState<Date>();
  const [guests, setGuests] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle rental booking logic here
  };

  const formattedDate = date ? date.toLocaleDateString() : "";

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Private Bus Rental</CardTitle>
          <CardDescription className="text-center">
            Book the entire bus for your special event
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Select Date</Label>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
                onClick={() => {
                  const picker = document.createElement('input');
                  picker.type = 'date';
                  picker.onchange = (e) => {
                    setDate(new Date((e.target as HTMLInputElement).value));
                  };
                  picker.click();
                }}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formattedDate || "Pick a date"}
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="guests">Number of Guests</Label>
              <Input
                id="guests"
                type="number"
                placeholder="Enter number of guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                min="1"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
              Check Availability
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Need help?{" "}
            <Link href="/contact" className="text-purple-600 hover:underline">
              Contact us
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}