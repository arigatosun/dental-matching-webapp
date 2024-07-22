'use client';

import React from 'react';
import { Box, Container, Typography, Stepper, Step, StepLabel } from '@mui/material';
import { PreferencesExperienceForm } from '@/components/staff-registration/preference-experience/PreferencesExperienceForm';
import { useRouter } from 'next/navigation';

const steps = ['基本情報入力', 'スキル・経歴入力', 'プロフィール写真登録', '本人確認・免許の提出', '利用規約・同意'];

export default function PreferencesExperienceWrapper() {
  const router = useRouter();
  
  const handleNext = (data: any) => {
    console.log('Submitted data:', data);
    // ここでデータをデータベースに送信する処理を追加できます
    router.push('/register/staff/profile-upload');
  };

  return (
    <Container maxWidth="md">
       <Box sx={{ mt: 0, mb: 4 }}>
        <Stepper activeStep={1} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, mb: 2, textAlign: 'center' }}>
          スキルと経歴情報入力
        </Typography>

        <PreferencesExperienceForm onNext={handleNext} />
      </Box>
    </Container>
  );
}