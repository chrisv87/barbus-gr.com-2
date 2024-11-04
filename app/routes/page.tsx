import { MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const routes = [
  {
    name: "Downtown Delights",
    description: "Experience the heart of Grand Rapids' entertainment district",
    stops: ["The B.O.B.", "Grand Rapids Brewing Co.", "Founders Brewing", "Z's Bar"],
    duration: "4 hours",
  },
  {
    name: "Brewery Tour",
    description: "Visit the best craft breweries in Beer City USA",
    stops: ["Founders Brewing", "New Holland Brewing", "City Built Brewing", "Harmony Hall"],
    duration: "4 hours",
  },
  {
    name: "Weekend Party",
    description: "Hit the hottest clubs and bars in town",
    stops: ["The Woods", "Social House", "Eve Nightclub", "Billy's Lounge"],
    duration: "5 hours",
  },
];

export default function RoutesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
        Our Routes
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {routes.map((route) => (
          <Card key={route.name} className="bg-black/50 border-purple-900/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-purple-400" />
                {route.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">{route.description}</p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-purple-400 mb-2">Stops</h3>
                  <ul className="list-disc list-inside text-gray-300">
                    {route.stops.map((stop) => (
                      <li key={stop}>{stop}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-purple-400">Duration</h3>
                  <p className="text-gray-300">{route.duration}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}