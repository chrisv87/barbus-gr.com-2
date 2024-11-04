"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";

const mockHistory = [
  {
    id: 1,
    name: "Weekend Route",
    date: "2024-01-15",
    stops: ["Joey's Tavern", "The Bob", "O'Tooles"],
    ticketType: "All Night Pass",
    price: 30,
  },
  {
    id: 2,
    name: "Christmas Light Tour",
    date: "2023-12-24",
    stops: ["Downtown GR", "East GR", "Heritage Hill"],
    ticketType: "Special Event",
    price: 45,
  },
];

export function EventHistory() {
  return (
    <div className="space-y-4">
      {mockHistory.map((event) => (
        <Card key={event.id} className="bg-black/40 border-purple-800/30">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h4 className="font-semibold text-purple-300">{event.name}</h4>
                <div className="flex items-center text-sm text-gray-400 space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <MapPin className="h-4 w-4" />
                  <span>{event.stops.join(" → ")}</span>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="outline" className="mb-2">
                  {event.ticketType}
                </Badge>
                <div className="text-lg font-semibold">${event.price}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}