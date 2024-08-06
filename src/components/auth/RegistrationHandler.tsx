'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSupabaseClient } from '@/utils/supabase';

export default function RegistrationHandler({ onVerified }: { onVerified: (email: string) => void }) {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = useSupabaseClient();

  useEffect(() => {
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    console.log('Token:', token, 'Email:', email); // デバッグ用ログ
    if (token && email) {
      verifyAndRedirect(token, email);
    } else {
      setLoading(false);
      setError('Token or email is missing');
    }
  }, [searchParams]);

  const verifyAndRedirect = async (token: string, email: string) => {
    console.log('Verifying with token:', token, 'and email:', email); // デバッグ用ログ
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        token,
        type: 'signup',
        email: email
      });

      console.log('VerifyOtp result:', { data, error }); // デバッグ用ログ

      if (error) throw error;

      if (data.user?.email) {
        console.log('Calling onVerified with email:', data.user.email); // デバッグ用ログ
        onVerified(data.user.email);
      } else {
        throw new Error('User email not found');
      }
    } catch (error) {
      console.error('Error during verification:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>メールアドレスを確認中です。しばらくお待ちください...</div>;
  }

  if (error) {
    return <div>エラーが発生しました: {error}</div>;
  }

  return null;
}