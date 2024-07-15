'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/utils/supabase';

export default function RegistrationHandler({ onVerified }: { onVerified: (email: string) => void }) {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    if (token && email) {
      verifyAndRedirect(token, email);
    }
  }, [searchParams]);

  const verifyAndRedirect = async (token: string, email: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        token,
        type: 'signup',
        email: email
      });

      if (error) throw error;

      if (data.user?.email) {
        onVerified(data.user.email);
      } else {
        throw new Error('User email not found');
      }
    } catch (error) {
      console.error('Error during verification:', error);
      // エラーハンドリング（エラーページへのリダイレクトなど）
      window.location.href = '/auth/error';
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>メールアドレスを確認中...</div>;
  }

  return null;
}