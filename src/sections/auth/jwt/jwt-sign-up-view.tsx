'use client';

import { z as zod } from 'zod';
import { paths } from '@/routes/paths';
import { useForm } from 'react-hook-form';
import { useRouter } from '@/routes/hooks';
import { useState, useEffect } from 'react';
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
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    watch,
  } = methods;

  const watchedPassword = watch('password');
  const { validLength, hasUpperCase } = usePasswordValidation(watchedPassword);

  const getErrorMessage = (error: Error): string => {
    if (error.message.includes('User already registered')) {
      return 'このメールアドレスは既に登録されています。';
    }
    return '予期せぬエラーが発生しました。もう一度お試しください。';
  };

  const onSubmit = handleSubmit(async (data, event) => {
    const userType = (event?.nativeEvent as any).submitter.name;
    
    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            user_type: userType,
          },
          emailRedirectTo: `http://localhost:3000/register/${userType}?email=${encodeURIComponent(data.email)}`
        },
      });



       if (error) throw error;

      setSuccessMsg('確認メールを送信しました。メールを確認して本登録を完了してください。');
      setTimeout(() => {
        router.push(paths.auth.jwt.signIn);
      }, 3000);
    } catch (error) {
      console.error('Registration error:', error);
      if (error instanceof Error) {
        setErrorMsg(getErrorMessage(error));
      } else {
        setErrorMsg('登録中にエラーが発生しました。もう一度お試しください。');
      }
    } finally {
      setIsSubmitting(false);
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
        name="clinic"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="アカウント作成中..."
      >
        歯科医院として登録
      </LoadingButton>

      <LoadingButton
        fullWidth
        color="primary"
        size="large"
        type="submit"
        name="staff"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="アカウント作成中..."
        sx={{
          color: 'white',
          '&:hover': {
            color: 'white',
          },
        }}
      >
        歯科スタッフとして登録
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

      {!!successMsg && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMsg}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </Form>

      {renderTerms}
    </>
  );
}