"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, Ticket } from "lucide-react";
import Image from "next/image";

// Mock event data - in a real app, this would come from your backend
const mockEvent = {
  id: "1",
  title: "Christmas Light Tour",
  date: "2024-12-20",
  time: "6:00 PM - 9:00 PM",
  description: "Experience the magic of Grand Rapids during the holiday season with our festive Christmas light tour. Visit the most beautifully decorated neighborhoods and landmarks while enjoying premium transportation and festive treats.",
  image: "https://images.unsplash.com/photo-1576692155415-95f820a2c4c1?q=80&w=2940&auto=format&fit=crop",
  capacity: 40,
  duration: "3 hours",
  pickupLocation: "Downtown GR",
  price: "$30",
  status: "upcoming",
  features: [
    "Heated luxury bus",
    "Professional tour guide",
    "Complimentary hot cocoa",
    "Photo opportunities",
    "Holiday music"
  ]
};

export default function EventDetailsPage() {
  const params = useParams();
  const eventId = params.id;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-950/20 py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="relative h-[400px] rounded-lg overflow-hidden mb-8">
          <Image
            src={mockEvent.image}
            alt={mockEvent.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <Badge className="mb-4" variant="secondary">
              {mockEvent.status}
            </Badge>
            <h1 className="text-4xl font-bold text-white mb-2">{mockEvent.title}</h1>
            <div className="flex flex-wrap gap-4 text-gray-200">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{mockEvent.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{mockEvent.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{mockEvent.pickupLocation}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <Card className="bg-black/40 border-purple-800/30">
              <CardHeader>
                <CardTitle className="text-purple-300">About This Event</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{mockEvent.description}</p>
                <div className="mt-6">
                  <h3 className="font-semibold text-purple-300 mb-3">What's Included:</h3>
                  <ul className="space-y-2">
                    {mockEvent.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-black/40 border-purple-800/30">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <span className="text-3xl font-bold text-purple-300">{mockEvent.price}</span>
                    <span className="text-gray-400"> per person</span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex justify-between">
                      <span className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Capacity
                      </span>
                      <span>{mockEvent.capacity} people</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Duration
                      </span>
                      <span>{mockEvent.duration}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <Ticket className="mr-2 h-4 w-4" />
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-purple-800/30">
              <CardContent className="p-6">
                <h3 className="font-semibold text-purple-300 mb-4">Important Information</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Must be 21 or older</li>
                  <li>• Valid ID required</li>
                  <li>• Non-refundable</li>
                  <li>• Weather dependent</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}