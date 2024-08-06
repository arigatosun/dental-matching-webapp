'use client';

import React from 'react';
import { Box, Container, Typography, Stepper, Step, StepLabel } from '@mui/material';
import { BasicInfoForm } from '@/components/staff-registration/basic-info/BasicInfoForm';
import { useRouter } from 'next/navigation';
import { getDevelopmentUser } from '@/utils/auth-helper';

const steps = ['基本情報入力', 'スキル・経歴入力', 'プロフィール写真登録', '本人確認・免許の提出', '利用規約・同意'];

export default function BasicInfoFormWrapper() {
  const router = useRouter();

  const handleNext = async (data: any) => {
    try {
      const user = await getDevelopmentUser('staff', {
        email: 'dev-staff-user7@example.com',
        password: 'devpassword'
      });
    
      
      if (!user) {
        throw new Error('User not authenticated');
      }
      console.log('Submitted data:', data);
      router.push('/register/staff/preference-experience');
    } catch (error) {
      console.error('Authentication error:', error);
      // ここでエラーメッセージをユーザーに表示する処理を追加
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 0, mb: 4 }}> {/* ここを変更: my: 4 から mt: 2, mb: 4 に */}
        <Stepper activeStep={0} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 6, mb: 4, textAlign: 'center' }}> {/* ここを変更: mt: 4, mb: 2 から mt: 6, mb: 4 に */}
        基本情報を入力してください
      </Typography>

      <BasicInfoForm onNext={handleNext} />
    </Container>
  );
}