'use client';

import React from 'react';
import { Box, Container, Typography, Stepper, Step, StepLabel, Paper, styled } from '@mui/material';
import { ProfileUploadForm } from '@/components/staff-registration/profile-upload/ProfileUploadForm';
import { useRouter } from 'next/navigation';

const steps = ['基本情報入力', 'スキル・経歴入力', 'プロフィール写真登録', '本人確認・免許の提出', '利用規約・同意'];

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

export default function ProfileUploadWrapper() {
  const router = useRouter();
  
  const handleNext = (data: any) => {
    console.log('Submitted data:', data);
    router.push('/register/staff/identity-verification');
  };

  const handleSkip = () => {
    console.log('Profile upload skipped');
    // スキップ時の処理をここに実装
    // 例: デフォルトのアバターを設定したり、次のステップに進んだりする
    router.push('/register/staff/identity-verification');
  };

  return (
    <Container maxWidth="md">
       <Box sx={{ mt: 0, mb: 4 }}>
        <Stepper activeStep={2} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, mb: 2, textAlign: 'center' }}>
          プロフィール写真の登録
        </Typography>
        

        <ProfileUploadForm onNext={handleNext} onSkip={handleSkip} />
      </Box>
    </Container>
  );
}