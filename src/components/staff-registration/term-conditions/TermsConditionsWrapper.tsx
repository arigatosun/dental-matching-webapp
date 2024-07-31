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
       <Box sx={{ mt: 0, mb: 4 }}>
        <Stepper activeStep={5} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, mb: 2, textAlign: 'center' }}>
          最後にご確認ください
        </Typography>
        
      

        <TermsAgreementForm onComplete={handleComplete} />
      </Box>
    </Container>
  );
}