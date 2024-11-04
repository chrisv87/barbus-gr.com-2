"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, QrCode } from "lucide-react";

const mockUpcoming = [
  {
    id: 1,
    name: "Weekend Route",
    date: "2024-01-20",
    time: "8:00 PM - 2:00 AM",
    stops: ["Joey's Tavern", "The Bob", "O'Tooles"],
    ticketType: "All Night Pass",
    ticketCode: "WR-20240120-123",
  },
  {
    id: 2,
    name: "Date Night Special",
    date: "2024-01-25",
    time: "7:00 PM - 11:00 PM",
    stops: ["Downtown GR", "East GR"],
    ticketType: "Special Event",
    ticketCode: "DN-20240125-456",
  },
];

export function UpcomingEvents() {
  return (
    <div className="space-y-4">
      {mockUpcoming.map((event) => (
        <Card key={event.id} className="bg-black/40 border-purple-800/30">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-purple-300">{event.name}</h4>
                  <Badge variant="outline" className="mt-1">
                    {event.ticketType}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-gray-400 space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-400 space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-400 space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{event.stops.join(" → ")}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-purple-800/30 text-purple-300"
                >
                  <QrCode className="mr-2 h-4 w-4" />
                  View Ticket
                </Button>
                <div className="text-xs text-center text-gray-500">
                  {event.ticketCode}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}