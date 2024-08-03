import type { ButtonProps } from '@mui/material/Button';
import type { Theme, SxProps } from '@mui/material/styles';

import { useCallback } from 'react';
import { useRouter } from '@/routes/hooks';
import { useAuthContext } from '@/auth/hooks';
import { signOut } from '@/auth/context/jwt/action';
import { useSupabaseClient } from '@/utils/supabase';

import Button from '@mui/material/Button';

type Props = ButtonProps & {
  sx?: SxProps<Theme>;
  onClose?: () => void;
};

export function SignOutButton({ onClose, ...other }: Props) {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const { checkUserSession } = useAuthContext();

  const handleLogout = useCallback(async () => {
    try {
      await signOut(supabase);
      if (checkUserSession) {
        await checkUserSession();
      }
      onClose?.();
      router.push('/auth/jwt/sign-in');
    } catch (error) {
      console.error('ログアウト中にエラーが発生しました:', error);
    }
  }, [supabase, checkUserSession, onClose, router]);

  return (
    <Button fullWidth variant="soft" size="large" color="error" onClick={handleLogout} {...other}>
      ログアウト
    </Button>
  );
}
