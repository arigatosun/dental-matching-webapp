'use client';

import React from 'react';
import { Box, Container, Typography, Stepper, Step, StepLabel } from '@mui/material';
import { LicenseSubmissionForm } from '@/components/staff-registration/license-submission/LicenseSubmissionForm';
import { useRouter } from 'next/navigation';

const steps = ['基本情報入力', '希望条件・経歴入力', 'プロフィール写真の登録', '本人確認書類の提出', '国家資格免許の提出', '利用規約・同意'];

export default function LicenseSubmissionWrapper() {
  const router = useRouter();

  const handleNext = (data: any) => {
    console.log('Submitted data:', data);
    router.push('/register/staff/terms-conditions');
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Stepper activeStep={4} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, mb: 2, textAlign: 'center' }}>
          国家資格免許の提出
        </Typography>
        
        <Box sx={{ bgcolor: 'info.light', p: 2, borderRadius: 1, mb: 4 }}>
          <Typography variant="body1">
            <strong>ⓘ</strong> 国家資格免許証をアップロードしてください。表面と裏面の両方の画像が必要です。
          </Typography>
        </Box>

        <LicenseSubmissionForm onNext={handleNext} />
      </Box>
    </Container>
  );
}