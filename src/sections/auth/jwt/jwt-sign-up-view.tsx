'use client';

import { z as zod } from 'zod';
import { paths } from '@/routes/paths';
import { useForm } from 'react-hook-form';
import { useRouter } from '@/routes/hooks';
import { useState, useEffect } from 'react';
import { signUp } from '@/auth/context/jwt';
import { useAuthContext } from '@/auth/hooks';
import { Iconify } from '@/components/iconify';
import { RouterLink } from '@/routes/components';
import { useBoolean } from '@/hooks/use-boolean';
import { Form, Field } from '@/components/hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

// ----------------------------------------------------------------------

export type SignUpSchemaType = zod.infer<typeof SignUpSchema>;

export const SignUpSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'メールアドレスは必須です' })
    .email({ message: '有効なメールアドレスを入力してください' }),
  password: zod
    .string()
    .min(1, { message: 'パスワードは必須です' })
    .min(8, { message: 'パスワードは8文字以上である必要があります' })
    .regex(/[A-Z]/, { message: 'パスワードには少なくとも1つの大文字が必要です' }),
});

// ----------------------------------------------------------------------

const usePasswordValidation = (password: string) => {
  const [validLength, setValidLength] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);

  useEffect(() => {
    setValidLength(password.length >= 8);
    setHasUpperCase(/[A-Z]/.test(password));
  }, [password]);

  return { validLength, hasUpperCase };
};

export function JwtSignUpView() {
  const { checkUserSession } = useAuthContext();

  const router = useRouter();

  const password = useBoolean();

  const [errorMsg, setErrorMsg] = useState('');

  const defaultValues = {
    email: 'hello@gmail.com',
    password: '',
  };

  const methods = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = methods;

  const watchedPassword = watch('password');
  const { validLength, hasUpperCase } = usePasswordValidation(watchedPassword);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signUp({
        email: data.email,
        password: data.password,
      });
      await checkUserSession?.();
  
      router.refresh();
    } catch (error) {
      console.error(error);
      setErrorMsg(error instanceof Error ? error.message : error);
    }
  });

  const renderHead = (
    <Stack spacing={1.5} sx={{ mb: 5 }}>
      <Typography variant="h5">Thootに新規登録</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          アカウントをお持ちの方は
        </Typography>

        <Link component={RouterLink} href={paths.auth.jwt.signIn} variant="subtitle2">
          ログイン
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={3}>
      <Field.Text name="email" label="メールアドレス" InputLabelProps={{ shrink: true }} />

      <Stack spacing={1}>
        <Field.Text
          name="password"
          label="パスワード"
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
        <Stack direction="row" spacing={2}>
          <Typography
            variant="caption"
            color={validLength ? 'success.main' : 'text.secondary'}
          >
            ✓ 8文字以上
          </Typography>
          <Typography
            variant="caption"
            color={hasUpperCase ? 'success.main' : 'text.secondary'}
          >
            ✓ 大文字を1つ以上含む
          </Typography>
        </Stack>
      </Stack>

      <LoadingButton
        fullWidth
        color="secondary"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="アカウント作成中..."
      >
        アカウント作成
      </LoadingButton>
    </Stack>
  );

  const renderTerms = (
    <Typography
      component="div"
      sx={{
        mt: 3,
        textAlign: 'center',
        typography: 'caption',
        color: 'text.secondary',
      }}
    >
      登録することで、
      <Link underline="always" color="text.primary">
        利用規約
      </Link>
      {' と '}
      <Link underline="always" color="text.primary">
        プライバシーポリシー
      </Link>
      に同意したものとみなされます。
    </Typography>
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

      {renderTerms}
    </>
  );
}