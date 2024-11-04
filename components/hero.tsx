"use client";

import { Button } from "@/components/ui/button";
import { MartiniIcon } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative w-full">
      <div className="relative min-h-[600px] flex items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <MartiniIcon className="h-16 w-16 text-white mb-6 mx-auto" />
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 neon-text">
            Bar Bus GR
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Your Ultimate Party Ride in Grand Rapids! Join us for unforgettable nights out, special events, and the best bar crawls in town.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/early-signup">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 neon-button">
                Early Access
              </Button>
            </Link>
            <Link href="/rental">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20 neon-button">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}