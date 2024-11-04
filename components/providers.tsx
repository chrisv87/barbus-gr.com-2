"use client";

import { useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { auth } from "@/lib/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthStore } from "@/lib/firebase/store";
import { getUserProfile } from "@/lib/firebase/db";
import { initAnalytics } from "@/lib/firebase/config";

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setProfile, setLoading } = useAuthStore();

  useEffect(() => {
    // Initialize Firebase Analytics
    initAnalytics();

    // Set up auth state listener
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        const profile = await getUserProfile(user.uid);
        setProfile(profile);
      } else {
        setProfile(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setProfile, setLoading]);

  return <>{children}</>;
}