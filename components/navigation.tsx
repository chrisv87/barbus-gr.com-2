"use client";

import Link from "next/link";
import { MartiniIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

export function Navigation() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <header className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <MartiniIcon className="h-6 w-6 text-purple-400" />
          <span className="text-lg font-bold text-white">Bar Bus GR</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            href="/about" 
            className={cn(
              "text-white/80 hover:text-white transition-colors",
              pathname === "/about" && "text-white"
            )}
          >
            About Us
          </Link>
          <Link 
            href="/events" 
            className={cn(
              "text-white/80 hover:text-white transition-colors",
              pathname === "/events" && "text-white"
            )}
          >
            Events
          </Link>
          <Link 
            href="/routes" 
            className={cn(
              "text-white/80 hover:text-white transition-colors",
              pathname === "/routes" && "text-white"
            )}
          >
            Routes
          </Link>
          <Link 
            href="/rental" 
            className={cn(
              "text-white/80 hover:text-white transition-colors",
              pathname === "/rental" && "text-white"
            )}
          >
            Book Now
          </Link>
          {session?.user ? (
            <Link href={`/${session.user.role}/dashboard`}>
              <Button variant="ghost" size="sm">Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link href="/early-signup">
                <Button 
                  size="sm" 
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Early Access
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}