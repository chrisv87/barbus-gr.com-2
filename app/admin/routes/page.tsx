"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { RoutesTable } from "@/components/admin/routes-table";
import { AddRouteDialog } from "@/components/admin/add-route-dialog";

export default function RoutesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddRouteOpen, setIsAddRouteOpen] = useState(false);

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
            <h1 className="text-3xl font-bold text-purple-300">Route Management</h1>
          </div>
          <div className="flex items-center gap-4">
            <Input
              placeholder="Search routes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 bg-black/60 border-purple-800/30"
            />
            <Button 
              onClick={() => setIsAddRouteOpen(true)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Route
            </Button>
          </div>
        </div>

        <Card className="bg-black/60 border-purple-800/30">
          <CardContent className="pt-6">
            <RoutesTable searchTerm={searchTerm} />
          </CardContent>
        </Card>

        <AddRouteDialog open={isAddRouteOpen} onOpenChange={setIsAddRouteOpen} />
      </div>
    </div>
  );
}