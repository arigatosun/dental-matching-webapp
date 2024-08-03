'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabaseClient } from '@/utils/supabase';
import { SplashScreen } from '@/components/loading-screen';

type Props = {
  children: React.ReactNode;
};

export function AuthGuard({ children }: Props) {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push('/auth/jwt/sign-in');
      } else {
        setIsLoading(false);
      }
    };

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setIsLoading(false);
      } else if (event === 'SIGNED_OUT') {
        router.push('/auth/jwt/sign-in');
      }
    });

    checkAuth();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase, router]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
