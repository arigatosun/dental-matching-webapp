'use client';

import React from 'react';
import { Box, Container, Typography, Stepper, Step, StepLabel } from '@mui/material';
import { TermsAgreementForm } from '@/components/staff-registration/term-conditions/TermsAgreementForm';
import { useRouter } from 'next/navigation';

const steps = ['基本情報入力', '希望条件・経歴入力', 'プロフィール写真の登録', '本人確認書類の提出', '国家資格免許の提出', '利用規約・同意'];

export default function TermsConditionsWrapper() {
    const router = useRouter();
  
    const handleComplete = (data: { agreed: boolean }) => {
      console.log('Agreement completed:', data);
      if (data.agreed) {
        router.push('/register/staff/completed');
      }
    };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Stepper activeStep={5} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, mb: 2, textAlign: 'center' }}>
          利用規約・同意
        </Typography>
        
        <Box sx={{ bgcolor: 'info.light', p: 2, borderRadius: 1, mb: 4 }}>
          <Typography variant="body1">
            <strong>ⓘ</strong> 以下の利用規約をよくお読みいただき、同意いただける場合はチェックボックスにチェックを入れてください。
          </Typography>
        </Box>

        <TermsAgreementForm onComplete={handleComplete} />
      </Box>
    </Container>
  );
}