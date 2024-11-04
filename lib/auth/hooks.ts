"use client";

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from './store';

export function useRequireAuth(allowedRoles?: string[]) {
  const { user, isLoading } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    if (user && allowedRoles && !allowedRoles.includes(user.role)) {
      router.push('/unauthorized');
    }
  }, [user, isLoading, router, pathname, allowedRoles]);

  return { user, isLoading };
}

export function useAuth() {
  const { user, isLoading, error, setUser, logout } = useAuthStore();
  return { user, isLoading, error, setUser, logout };
}