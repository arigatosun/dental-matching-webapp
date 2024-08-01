import type { ButtonProps } from '@mui/material/Button';
import type { Theme, SxProps } from '@mui/material/styles';

import { useCallback } from 'react';
import { useRouter } from '@/routes/hooks';
import { useAuthContext } from '@/auth/hooks';
import { signOut } from '@/auth/context/jwt/action';
import { getSupabase } from '@/utils/supabase-client'; // Supabaseクライアントを取得する関数をインポート

import Button from '@mui/material/Button';

type Props = ButtonProps & {
  sx?: SxProps<Theme>;
  onClose?: () => void;
};

export function SignOutButton({ onClose, ...other }: Props) {
  const router = useRouter();
  const { checkUserSession } = useAuthContext();

  const handleLogout = useCallback(async () => {
    try {
      const supabase = getSupabase();
      await supabase.auth.signOut(); // SupabaseのsignOutメソッドを呼び出す
      await signOut(); // 既存のsignOut関数も呼び出す（必要に応じて）

      localStorage.clear(); // ローカルストレージをクリア

      if (checkUserSession) {
        await checkUserSession();
      }
      onClose?.();
      router.push('/auth/jwt/sign-in');
    } catch (error) {
      console.error('ログアウト中にエラーが発生しました:', error);
    }
  }, [checkUserSession, onClose, router]);

  return (
    <Button fullWidth variant="soft" size="large" color="error" onClick={handleLogout} {...other}>
      ログアウト
    </Button>
  );
}