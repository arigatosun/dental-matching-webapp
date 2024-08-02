'use client';
// components/AuthGuard.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!loading) {
        if (!user) {
          router.push(`/auth/jwt/sign-in?returnTo=${router.asPath}`);
        } else {
          setChecked(true);
        }
      }
    }
  }, [user, loading, router]);

  if (typeof window === 'undefined' || !checked) {
    return null;
  }

  return <>{children}</>;
}
