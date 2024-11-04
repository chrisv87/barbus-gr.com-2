"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/firebase/store";
import { UserRole, hasRole } from "@/lib/firebase/roles";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, profile, loading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }

    if (profile && allowedRoles && !allowedRoles.some(role => hasRole(profile.role as UserRole, role))) {
      router.push("/unauthorized");
    }
  }, [user, profile, loading, router, allowedRoles]);

  if (loading || !user || !profile) {
    return null;
  }

  if (allowedRoles && !allowedRoles.some(role => hasRole(profile.role as UserRole, role))) {
    return null;
  }

  return <>{children}</>;
}