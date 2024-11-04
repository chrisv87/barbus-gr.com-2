import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, Users } from "lucide-react"

const events = [
  {
    id: 1,
    title: "Summer Music Festival",
    date: "2024-07-15",
    location: "Central Park, NY",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3",
    price: "$99",
    capacity: "5000"
  },
  {
    id: 2,
    title: "Tech Conference 2024",
    date: "2024-08-20",
    location: "Convention Center, SF",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
    price: "$199",
    capacity: "2000"
  },
  {
    id: 3,
    title: "Food & Wine Festival",
    date: "2024-09-10",
    location: "Waterfront Park, Miami",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033",
    price: "$75",
    capacity: "1000"
  }
]

export default function EventsPage() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Upcoming Events</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  )
}

function EventCard({ event }: { event: any }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="pt-6">
        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            {new Date(event.date).toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            {event.location}
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Capacity: {event.capacity}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-lg font-semibold">{event.price}</span>
        <Button asChild>
          <Link href={`/events/${event.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}