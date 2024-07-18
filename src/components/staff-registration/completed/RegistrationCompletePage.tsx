'use client';

import React from 'react';
import {
  Box,
  Typography,
  Container,
  Button,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export function RegistrationCompletePage() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/auth/jwt/sign-in');
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        minHeight: '100vh',
        textAlign: 'center',
        pt: 1, // 上部のパディングを追加
      }}>
        <Typography variant="h3" gutterBottom sx={{ color: '#FF9999', fontWeight: 'bold', mb: 6 }}>
          登録が完了しました！
        </Typography>
        
        <Box sx={{ mb: 6 }}>
          <Image
            src="/images/logo/thoot-chara3D.svg"
            alt="Thoot Characters"
            width={300}
            height={300}
          />
        </Box>

        <Typography variant="h6" sx={{ mb: 3 }}>
          歯科スタッフとしてご登録いただきありがとうございます。
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 6, maxWidth: '100%' }}>
          登録していただいた内容で適宜審査を行い、完了次第ご登録メールアドレス宛に承認メールをお送りします。<br />
          ※審査に承認されるまで求人医院へのアプローチは制限されます
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleLogin}
          sx={{ 
            minWidth: 250,
            height: 60,
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: '#0051A8',
            '&:hover': {
              backgroundColor: '#003C7E',
            },
          }}
        >
          ログイン
        </Button>
      </Box>
    </Container>
  );
}