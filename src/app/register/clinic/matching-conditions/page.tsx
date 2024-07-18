'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { MatchingConditionsForm } from '@/components/clinic-registration/matching-conditions/MatchingConditionsForm';
import { Box, Container, Typography, Stepper, Step, StepLabel } from '@mui/material';
import { Iconify } from '@/components/iconify';

const steps = ['基本情報入力', 'プロフィール写真登録', 'マッチング条件設定', '事前同意事項作成', '医院証明書提出', '利用規約・同意'];

export default function MatchingConditionsPage() {
  const router = useRouter();

  const handleNext = () => {
    // 次の画面に進む処理（例: 事前概要作成ページへ）
    router.push('/register/clinic/prior-consent');// router.push('/register/clinic/pre-summary');
    console.log('次へ進む');
  };

  const handleBack = () => {
    router.back(); // 前の画面に戻る
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 2, mb: 6 }}>
        <Stepper activeStep={2} alternativeLabel sx={{ mb: 6 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
          初回マッチング条件を設定しましょう
        </Typography>
        
        <Box sx={{ 
          bgcolor: 'rgba(0, 184, 217, 0.1)',
          border: '1px solid rgba(0, 184, 217, 0.3)',
          borderRadius: 2,
          p: 3,
          mb: 6, 
          display: 'flex', 
          alignItems: 'center'
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            minWidth: '32px',
            mr: 2 
          }}>
            <Iconify 
              icon="eva:info-fill" 
              width={32}
              height={32}
              sx={{ 
                color: 'rgb(0, 184, 217)',
              }} 
            />
          </Box>
          <Typography variant="body1" sx={{ color: 'rgb(0, 108, 156)' }}>
            作成した条件でマッチング検索を行います。<br />
            設定した条件の変更は登録完了後にフィルター機能で変更できるようになります。
          </Typography>
        </Box>

        <MatchingConditionsForm handleNext={handleNext} handleBack={handleBack} />
      </Box>
    </Container>
  );
}