'use client';

import { useState } from 'react';
import RegistrationHandler from '@/components/auth/RegistrationHandler';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';

export default function ClinicRegistration() {
  const [email, setEmail] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('clinics')
        .insert({ email, name: clinicName });
      
      if (error) throw error;

      router.push('/dashboard'); // 登録成功後のリダイレクト先
    } catch (error) {
      console.error('Registration error:', error);
      // エラーハンドリング
    } finally {
      setIsSubmitting(false);
    }
  };

  // 変更: RegistrationHandlerコンポーネントにonVerified propを渡す
  if (!email) {
    return <RegistrationHandler onVerified={setEmail} />;
  }

  // 以下は変更なし
  return (
    <div>
      <h1>歯科医院登録フォーム</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          disabled
          placeholder="メールアドレス"
        />
        <input
          type="text"
          value={clinicName}
          onChange={(e) => setClinicName(e.target.value)}
          placeholder="医院名"
          required
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '登録中...' : '登録'}
        </button>
      </form>
    </div>
  );
}