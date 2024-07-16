'use client';

import { useState } from 'react';
import RegistrationHandler from '@/components/auth/RegistrationHandler';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';

export default function StaffRegistration() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      console.log('Submitting staff registration for:', email); // デバッグログ
      const { data, error } = await supabase
        .from('staff')
        .insert({ email, name });
      
      if (error) throw error;

      console.log('Registration successful, redirecting to dashboard'); // デバッグログ
      router.push('/dashboard'); // 登録成功後のリダイレクト先
    } catch (error) {
      console.error('Registration error:', error);
      setError(error instanceof Error ? error.message : '登録中にエラーが発生しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerified = (verifiedEmail: string) => {
    console.log('Email verified:', verifiedEmail); // デバッグログ
    setEmail(verifiedEmail);
  };

  if (!email) {
    return <RegistrationHandler onVerified={handleVerified} />;
  }

  return (
    <div>
      <h1>歯科スタッフ登録フォーム</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          disabled
          placeholder="メールアドレス"
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="名前"
          required
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '登録中...' : '登録'}
        </button>
      </form>
    </div>
  );
}