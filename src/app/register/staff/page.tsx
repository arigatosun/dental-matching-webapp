import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/utils/supabase';

export default function ClinicRegistration() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  useEffect(() => {
    const { confirmation_url } = router.query;
    if (confirmation_url) {
      // URLからトークンとメールアドレスを抽出
      const url = new URL(confirmation_url as string);
      const token = url.searchParams.get('token');
      const email = url.searchParams.get('email');
      if (token && email) {
        confirmEmail(token, email);
      }
    }
  }, [router.query]);

  const confirmEmail = async (token: string, email: string) => {
    const { error, data } = await supabase.auth.verifyOtp({
      token,
      type: 'signup',
      email
    });
    if (error) {
      console.error('Error confirming email:', error);
    } else {
      setEmail(data.user?.email || '');
      // ここでユーザーを歯科医院登録フォームにリダイレクトまたは表示
    }
  };

  // 歯科医院の登録フォームをここに実装
  return (
    <div>
      <h1>歯科staff登録フォーム</h1>
      {/* フォームの内容 */}
    </div>
  );
}