'use client';

import React from 'react';
import { Box, Container, Typography, Stepper, Step, StepLabel } from '@mui/material';
import { PriorConsentForm } from '@/components/clinic-registration/prior-consent/PriorConsentForm';
import { Iconify } from '@/components/iconify';

const steps = ['基本情報入力', 'プロフィール写真登録', 'マッチング条件設定', '事前同意事項作成', '医院証明書提出', '利用規約・同意'];

export default function PriorConsentPage() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Stepper activeStep={3} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, mb: 2, textAlign: 'center' }}>
          同意事項を作成しましょう
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
            同意事項は求職スタッフが医院からのオファーを受諾する前に、医院独自の同意事項について確認するものです。
            すべて同意しないとオファーを受諾できません。
          </Typography>
        </Box>
        <PriorConsentForm />
      </Box>
    </Container>
  );
}