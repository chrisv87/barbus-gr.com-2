"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { EventsTable } from "@/components/admin/events-table";
import { AddEventDialog } from "@/components/admin/add-event-dialog";

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);

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
            <h1 className="text-3xl font-bold text-purple-300">Event Management</h1>
          </div>
          <div className="flex items-center gap-4">
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 bg-black/60 border-purple-800/30"
            />
            <Button 
              onClick={() => setIsAddEventOpen(true)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </div>
        </div>

        <Card className="bg-black/60 border-purple-800/30">
          <CardContent className="pt-6">
            <EventsTable searchTerm={searchTerm} />
          </CardContent>
        </Card>

        <AddEventDialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen} />
      </div>
    </div>
  );
}