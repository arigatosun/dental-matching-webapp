'use client';

import { CONFIG } from '@/config-global';
import { useState, useEffect } from 'react';
import { SplashScreen } from '@/components/loading-screen';
import { useRouter, useSearchParams } from '@/routes/hooks';

import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function GuestGuard({ children }: Props) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const { loading, authenticated } = useAuthContext();

  const [isChecking, setIsChecking] = useState<boolean>(true);

  const returnTo = searchParams.get('returnTo') || CONFIG.auth.redirectPath;

  const checkPermissions = async (): Promise<void> => {
    if (loading) {
      return;
    }

    if (authenticated) {
      router.replace(returnTo);
      return;
    }

    setIsChecking(false);
  };

  useEffect(() => {
    checkPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, loading]);

  if (isChecking) {
    console.log;
    return <SplashScreen />;
  }

  return <>{children}</>;
}
