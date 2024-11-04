import Hero from "@/components/hero";
import Features from "@/components/features";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <div className="container mx-auto px-4 py-16">
        <Features />
      </div>
    </main>
  );
}