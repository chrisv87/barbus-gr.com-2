"use client";

import { MapPin, Ticket, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ticketTypes = [
  {
    name: "Single Stop Ticket",
    price: "$5",
    description: "One-way ride between any stops (except Allendale return)"
  },
  {
    name: "Allendale Return",
    price: "$10",
    description: "Special rate for return trips to Allendale"
  },
  {
    name: "All Night Pass",
    price: "$30",
    description: "Unlimited rides between all stops, all night long"
  }
];

export default function Routes() {
  return (
    <section className="container py-16">
      <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
        Weekend Route & Pricing
      </h2>

      <div className="max-w-3xl mx-auto">
        {/* Route Map */}
        <div className="relative mb-12">
          <div className="mb-8">
            <Alert className="bg-purple-900/20 border-purple-500/50 mb-6">
              <Info className="h-4 w-4 text-purple-400" />
              <AlertDescription className="text-gray-300">
                21+ only • First come, first served • E-tickets stored in your profile until scanned
              </AlertDescription>
            </Alert>
          </div>
          {/* Stops */}
          <div className="relative">
            <div className="absolute left-6 top-12 bottom-4 w-0.5 bg-purple-600/20" />
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold">Joey's Tavern</h3>
                <p className="text-muted-foreground">Allendale</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold">The B.O.B.</h3>
                <p className="text-muted-foreground">Downtown Grand Rapids</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold">O'Toole's</h3>
                <p className="text-muted-foreground">Downtown Grand Rapids</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="space-y-6 mb-12">
          <h3 className="text-2xl font-semibold text-center mb-8">Ticket Options</h3>
          <div className="grid gap-6">
            {ticketTypes.map((ticket, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-6 rounded-lg border bg-black/50 border-purple-900/50"
              >
                <div>
                  <h4 className="text-lg font-semibold flex items-center gap-2">
                    <Ticket className="h-5 w-5 text-purple-400" />
                    {ticket.name}
                  </h4>
                  <p className="text-muted-foreground">{ticket.description}</p>
                </div>
                <div className="text-2xl font-bold text-purple-400">{ticket.price}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center space-y-4">
          <p className="text-muted-foreground">
            Operating Friday and Saturday nights
          </p>
          <Link href="/booking">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Book Your Ride
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}