'use client';

import { useState } from 'react';
import RegistrationHandler from '@/components/auth/RegistrationHandler';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';

export default function StaffRegistration() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('staff')
        .insert({ email, name });
      
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
      <h1>歯科スタッフ登録フォーム</h1>
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