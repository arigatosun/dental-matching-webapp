'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { CONFIG } from '@/config-global';

// ----------------------------------------------------------------------

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.push(CONFIG.auth.redirectPath);
  }, [router]);

  return null;
}
