'use client';

import React from 'react';
import { MatchingConditionsForm } from '@/components/matching-conditions/MatchingConditionsForm';
import { Box, Container, Typography, Stepper, Step, StepLabel } from '@mui/material';

const steps = ['基本情報入力', 'プロフィール写真登録', 'マッチング条件設定', '事前概要作成', '医院証明書提出', '利用規約・同意'];

export default function MatchingConditionsPage() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Stepper activeStep={2} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, mb: 2, textAlign: 'center' }}>
          初回マッチング条件を設定しましょう
        </Typography>
        
        <Box sx={{ bgcolor: 'info.light', p: 2, borderRadius: 1, mb: 4 }}>
          <Typography variant="body1">
            <strong>ⓘ</strong> 作成した条件でマッチング検索を行います。
            設定した条件の変更は登録完了後にフィルター機能で変更できるようになります。
          </Typography>
        </Box>

        <MatchingConditionsForm />
      </Box>
    </Container>
  );
}