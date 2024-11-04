"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const events = [
  {
    title: "Christmas Light Tour",
    date: "Coming Soon",
    image: "https://images.unsplash.com/photo-1576692155415-95f820a2c4c1?q=80&w=2940&auto=format&fit=crop",
    description: "Experience the magic of Grand Rapids during the holiday season with our festive Christmas light tour."
  },
  {
    title: "Date Night Experience",
    date: "Coming Soon",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2940&auto=format&fit=crop",
    description: "Let us handle the planning! A perfect night out for couples featuring premium venues and experiences."
  },
  {
    title: "Bar Crawl Adventures",
    date: "Random Weekends",
    image: "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=2940&auto=format&fit=crop",
    description: "Surprise bar crawls with exclusive deals and special access to Grand Rapids' best venues."
  }
];

export default function Events() {
  return (
    <section className="container py-16">
      <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
        Special Events
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event, index) => (
          <div
            key={index}
            className="rounded-lg border bg-card overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative h-48">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-sm text-purple-500 mb-2">{event.date}</p>
              <p className="text-muted-foreground mb-4">{event.description}</p>
              <Link href="/booking">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}