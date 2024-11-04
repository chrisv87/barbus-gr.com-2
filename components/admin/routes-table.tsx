"use client";

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
import { MoreHorizontal, Pencil, MapPin, Trash2 } from "lucide-react";
import { useState } from "react";
import { EditRouteDialog } from "./edit-route-dialog";

interface Stop {
  name: string;
  price: number;
}

interface Route {
  id: string;
  name: string;
  days: string[];
  stops: Stop[];
  returnPrice: number;
  allNightPass: number;
  active: boolean;
}

const mockRoutes: Route[] = [
  {
    id: "1",
    name: "Weekend Route",
    days: ["Friday", "Saturday"],
    stops: [
      { name: "Joey's Tavern", price: 5 },
      { name: "The Bob", price: 5 },
      { name: "O'Tooles", price: 5 }
    ],
    returnPrice: 10,
    allNightPass: 30,
    active: true
  }
];

interface RoutesTableProps {
  searchTerm: string;
}

export function RoutesTable({ searchTerm }: RoutesTableProps) {
  const [editingRoute, setEditingRoute] = useState<Route | null>(null);

  const filteredRoutes = mockRoutes.filter(route =>
    route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.stops.some(stop => stop.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <div className="rounded-md border border-purple-800/30">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Route Name</TableHead>
              <TableHead>Operating Days</TableHead>
              <TableHead>Stops</TableHead>
              <TableHead>Return Price</TableHead>
              <TableHead>All Night Pass</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRoutes.map((route) => (
              <TableRow key={route.id}>
                <TableCell className="font-medium">{route.name}</TableCell>
                <TableCell>{route.days.join(", ")}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    {route.stops.map((stop, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <MapPin className="h-3 w-3 text-purple-400" />
                        <span>{stop.name}</span>
                        <Badge variant="outline" className="ml-2">
                          ${stop.price}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>${route.returnPrice}</TableCell>
                <TableCell>${route.allNightPass}</TableCell>
                <TableCell>
                  <Badge variant={route.active ? "success" : "secondary"}>
                    {route.active ? "Active" : "Inactive"}
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
                      <DropdownMenuItem onClick={() => setEditingRoute(route)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit Route
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <EditRouteDialog 
        route={editingRoute} 
        open={!!editingRoute} 
        onOpenChange={(open) => !open && setEditingRoute(null)} 
      />
    </div>
  );
}