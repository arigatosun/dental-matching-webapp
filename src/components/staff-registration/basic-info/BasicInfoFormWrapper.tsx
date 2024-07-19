'use client';

import React from 'react';
import { Box, Container, Typography, Stepper, Step, StepLabel } from '@mui/material';
import { BasicInfoForm } from '@/components/staff-registration/basic-info/BasicInfoForm';
import { useRouter } from 'next/navigation';

const steps = ['基本情報入力', '希望条件・経歴入力', 'プロフィール写真の登録', '本人確認書類の提出', '国家資格免許の提出', '利用規約・同意'];

export default function BasicInfoFormWrapper() {
  const router = useRouter();
  const handleNext = (data: any) => {
    console.log('Submitted data:', data);
    router.push('/register/staff/preference-experience');
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Stepper activeStep={0} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, mb: 2, textAlign: 'center' }}>
          歯科スタッフ登録
        </Typography>

        <BasicInfoForm onNext={handleNext} />
      </Box>
    </Container>
  );
}