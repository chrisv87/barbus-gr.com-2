"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth/client";

export function useAuthRedirect(allowedRoles?: string[]) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user) {
      router.push(`/login?redirect=${pathname}`);
      return;
    }

    if (allowedRoles && !allowedRoles.includes(user.role || "")) {
      router.push("/unauthorized");
    }
  }, [user, router, pathname, allowedRoles]);

  return { user, isAuthorized: !allowedRoles || allowedRoles.includes(user?.role || "") };
}