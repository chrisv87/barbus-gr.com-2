"use client";

import { Bus, Calendar, Clock, MapPin, PartyPopper, Shield } from "lucide-react";

const features = [
  {
    icon: <Bus className="h-8 w-8" />,
    title: "Luxury Transportation",
    description: "Travel in style with our premium bus service"
  },
  {
    icon: <MapPin className="h-8 w-8" />,
    title: "Downtown Route",
    description: "Hit all the hottest spots in Grand Rapids"
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: "Regular Schedule",
    description: "Buses run every 30 minutes throughout the night"
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Safe & Reliable",
    description: "Professional drivers and on-board facilitators"
  },
  {
    icon: <PartyPopper className="h-8 w-8" />,
    title: "VIP Experience",
    description: "Premium service with exclusive benefits"
  },
  {
    icon: <Calendar className="h-8 w-8" />,
    title: "Special Events",
    description: "Custom routes for holidays and special occasions"
  }
];

export default function Features() {
  return (
    <section className="container py-16">
      <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
        Why Choose Bar Bus GR
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow"
          >
            <div className="mb-4 text-purple-500">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}