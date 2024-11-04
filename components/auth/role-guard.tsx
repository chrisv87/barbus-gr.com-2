"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/firebase/store";
import { UserRole, hasRole } from "@/lib/firebase/roles";

interface RoleGuardProps {
  children: React.ReactNode;
  requiredRole: UserRole;
}

export function RoleGuard({ children, requiredRole }: RoleGuardProps) {
  const { user, profile, loading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }

    if (profile && !hasRole(profile.role as UserRole, requiredRole)) {
      router.push("/unauthorized");
    }
  }, [user, profile, loading, router, requiredRole]);

  if (loading || !user || !profile) {
    return null;
  }

  if (!hasRole(profile.role as UserRole, requiredRole)) {
    return null;
  }

  return <>{children}</>;
}