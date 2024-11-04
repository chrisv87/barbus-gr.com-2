import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
          About Bar Bus GR
        </h1>

        <div className="relative h-[300px] mb-8 rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2938&auto=format&fit=crop"
            alt="Bar Bus GR Experience"
            fill
            className="object-cover"
          />
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-gray-300 mb-6">
            Bar Bus GR is revolutionizing the way you experience Grand Rapids nightlife.
            Founded with a vision to provide safe, luxurious, and memorable transportation
            for night-out adventures, we've quickly become the city's premier party bus service.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-purple-400">Our Mission</h2>
          <p className="text-gray-300 mb-6">
            To create unforgettable experiences while ensuring the safety and comfort
            of our guests. We believe that the journey between destinations should be
            just as exciting as the destinations themselves.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-purple-400">What Sets Us Apart</h2>
          <ul className="list-disc list-inside text-gray-300 mb-6">
            <li>Luxury vehicles with state-of-the-art sound systems</li>
            <li>Professional, experienced drivers and hosts</li>
            <li>Curated routes featuring the best venues in Grand Rapids</li>
            <li>Exclusive deals and VIP access at partner locations</li>
            <li>Commitment to safety and responsible enjoyment</li>
          </ul>
        </div>
      </div>
    </div>
  );
}