'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/auth/hooks/use-auth-context';

export default function Page() {
  const router = useRouter();
  const { checkUserSession } = useAuthContext();

  useEffect(() => {
    const checkAndRedirect = async () => {
      try {
        const session = await checkUserSession();
        if (session?.user?.user_metadata?.user_type) {
          const userType = session.user.user_metadata.user_type;
          if (userType === 'clinic') {
            router.push('/dashboard/clinic');
          } else if (userType === 'staff') {
            router.push('/dashboard/staff');
          } else {
            router.push('/auth/jwt/sign-in');
          }
        } else {
          router.push('/auth/jwt/sign-in');
        }
      } catch (error) {
        console.error('Error checking user session:', error);
        router.push('/auth/jwt/sign-in');
      }
    };

    checkAndRedirect();
  }, [router, checkUserSession]);

  return null;
}