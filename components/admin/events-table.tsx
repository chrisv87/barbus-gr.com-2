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
import { MoreHorizontal, Pencil, Eye, Trash2, Globe } from "lucide-react";
import { useState } from "react";
import { EditEventDialog } from "./edit-event-dialog";

interface Event {
  id: string;
  title: string;
  date: string;
  status: "draft" | "published" | "cancelled";
  capacity: number;
  duration: string;
  pickupLocation: string;
  price: string;
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Christmas Light Tour",
    date: "2024-12-20",
    status: "draft",
    capacity: 40,
    duration: "3 hours",
    pickupLocation: "Downtown GR",
    price: "$30"
  },
  {
    id: "2",
    title: "Date Night Experience",
    date: "2024-04-15",
    status: "published",
    capacity: 30,
    duration: "4 hours",
    pickupLocation: "Allendale",
    price: "$45"
  }
];

interface EventsTableProps {
  searchTerm: string;
}

export function EventsTable({ searchTerm }: EventsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const itemsPerPage = 10;

  const filteredEvents = mockEvents.filter(event =>
    Object.values(event).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEvents = filteredEvents.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status: Event["status"]) => {
    switch (status) {
      case "published":
        return "success";
      case "draft":
        return "warning";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div>
      <div className="rounded-md border border-purple-800/30">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Pickup</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedEvents.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">{event.title}</TableCell>
                <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(event.status)}>
                    {event.status}
                  </Badge>
                </TableCell>
                <TableCell>{event.capacity} people</TableCell>
                <TableCell>{event.duration}</TableCell>
                <TableCell>{event.pickupLocation}</TableCell>
                <TableCell>{event.price}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-black/90 border-purple-800/30">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => setEditingEvent(event)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit Event
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </DropdownMenuItem>
                      {event.status !== "published" && (
                        <DropdownMenuItem>
                          <Globe className="mr-2 h-4 w-4" />
                          Publish
                        </DropdownMenuItem>
                      )}
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="border-purple-800/30 text-purple-300"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="border-purple-800/30 text-purple-300"
        >
          Next
        </Button>
      </div>

      <EditEventDialog 
        event={editingEvent} 
        open={!!editingEvent} 
        onOpenChange={(open) => !open && setEditingEvent(null)} 
      />
    </div>
  );
}