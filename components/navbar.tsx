"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MartiniIcon } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <MartiniIcon className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              Bar Bus GR
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/about"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/about" ? "text-foreground" : "text-foreground/60"
              )}
            >
              About
            </Link>
            <Link
              href="/events"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/events" ? "text-foreground" : "text-foreground/60"
              )}
            >
              Events
            </Link>
            <Link
              href="/routes"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/routes" ? "text-foreground" : "text-foreground/60"
              )}
            >
              Routes
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link href="/early-signup">
              <Button size="sm">Sign Up</Button>
            </Link>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}