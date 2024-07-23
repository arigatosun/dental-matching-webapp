'use client';

import { z as zod } from 'zod';
import { useState } from 'react';
import { paths } from '@/routes/paths';
import { useForm } from 'react-hook-form';
import { useRouter } from '@/routes/hooks';
import { useAuthContext } from '@/auth/hooks';
import { Iconify } from '@/components/iconify';
import { RouterLink } from '@/routes/components';
import { useBoolean } from '@/hooks/use-boolean';
import { Form, Field } from '@/components/hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/utils/supabase';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

// ----------------------------------------------------------------------

export type SignInSchemaType = zod.infer<typeof SignInSchema>;

export const SignInSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'メールアドレスは必須です' })
    .email({ message: '有効なメールアドレスを入力してください' }),
  password: zod
    .string()
    .min(1, { message: 'パスワードは必須です' })
    .min(6, { message: 'パスワードは6文字以上である必要があります' }),
});

// ----------------------------------------------------------------------

export function JwtSignInView() {
  const router = useRouter();

  const { checkUserSession } = useAuthContext();

  const [errorMsg, setErrorMsg] = useState('');

  const password = useBoolean();

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { data: signInData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      console.log('Sign in successful:', signInData);
      await checkUserSession?.();
      console.log('User session checked');

      // ユーザーのメタデータを取得
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      if (!user) throw new Error('User not found');

      console.log('User metadata:', user.user_metadata);

      // ユーザータイプに基づいてリダイレクト
      const userType = user.user_metadata.user_type;
      const redirectPath = userType === 'clinic' ? '/dashboard/clinic' : '/dashboard/staff';

      router.push(redirectPath);
    } catch (error) {
      console.error('Login error:', error);
      let errorMessage = 'ログインに失敗しました。メールアドレスとパスワードを確認してください。';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setErrorMsg(errorMessage);
    }
  });

  const renderHead = (
    <Stack spacing={1.5} sx={{ mb: 5 }}>
      <Typography variant="h5">Thootにログイン</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          アカウントをお持ちではありませんか?
        </Typography>

        <Link component={RouterLink} href={paths.auth.jwt.signUp} variant="subtitle2">
          新規登録
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={3}>
      <Field.Text name="email" label="メールアドレス" InputLabelProps={{ shrink: true }} />

      <Stack spacing={1.5}>
        <Link component={RouterLink} href="#" variant="body2" sx={{ alignSelf: 'flex-end' }}>
          パスワードを忘れた場合
        </Link>

        <Field.Text
          name="password"
          label="パスワード"
          placeholder="6文字以上"
          type={password.value ? 'text' : 'password'}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton
        fullWidth
        color="secondary"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="ログイン中..."
        sx={{
          color: 'white',
        }}
      >
        ログイン
      </LoadingButton>
    </Stack>
  );

  return (
    <>
      {renderHead}

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </Form>
    </>
  );
}
