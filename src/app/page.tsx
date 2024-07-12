'use client';

import { useEffect } from 'react';
import { CONFIG } from '@/config-global';
import { useRouter } from 'next/navigation';

// ----------------------------------------------------------------------

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.push(CONFIG.auth.redirectPath);
  }, [router]);

  return null;
}
