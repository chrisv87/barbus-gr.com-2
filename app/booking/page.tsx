import { CalendarDays, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function BookingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
          Book Your Experience
        </h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          <Card className="bg-black/50 border-purple-900/50">
            <CardHeader>
              <CalendarDays className="h-8 w-8 text-purple-400 mb-2" />
              <CardTitle>Choose Your Date</CardTitle>
              <CardDescription>Select from available dates</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                We operate Thursday through Saturday, with special events on holidays
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-purple-900/50">
            <CardHeader>
              <Clock className="h-8 w-8 text-purple-400 mb-2" />
              <CardTitle>Pick Your Time</CardTitle>
              <CardDescription>Multiple slots available</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Evening routes start at 7 PM, with the last pickup at midnight
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-purple-900/50">
            <CardHeader>
              <MapPin className="h-8 w-8 text-purple-400 mb-2" />
              <CardTitle>Select Route</CardTitle>
              <CardDescription>Customize your experience</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Choose from our curated routes or create your own
              </p>
            </CardContent>
          </Card>
        </div>

        <Button size="lg" className="w-full bg-purple-600 hover:bg-purple-700">
          Continue to Booking
        </Button>
      </div>
    </div>
  );
}