'use client';

import React, { useState } from 'react';
import { Box, Container, Typography, Stepper, Step, StepLabel, Paper, styled, Snackbar, Alert } from '@mui/material';
import { ProfileUploadForm } from '@/components/staff-registration/profile-upload/ProfileUploadForm';
import { useRouter } from 'next/navigation';
import { getSupabase } from '@/utils/supabase-client';
import { getDevelopmentUser } from '@/utils/auth-helper';
import { v4 as uuidv4 } from 'uuid';

const steps = ['基本情報入力', 'スキル・経歴入力', 'プロフィール写真登録', '本人確認・免許の提出', '利用規約・同意'];

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

export default function ProfileUploadWrapper() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleNext = async (data: { file: File; isPublic: boolean }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const supabase = getSupabase();
      const user = await getDevelopmentUser('staff');
      
      if (!user) {
        throw new Error('開発用ユーザーの取得に失敗しました。');
      }
  
      console.log('User:', user); // ユーザー情報をログ出力
  
      const fileName = `${user.id}-${uuidv4()}.jpg`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('staff-profile-photos')
        .upload(fileName, data.file);
  
      if (uploadError) {
        console.error('Storage upload error:', uploadError);
        throw uploadError;
      }
  
      const { data: urlData } = supabase.storage
        .from('staff-profile-photos')
        .getPublicUrl(fileName);
  
      const { data: insertData, error: insertError } = await supabase
        .from('staff_photos')
        .upsert({
          user_id: user.id,
          profile_photo_url: urlData.publicUrl,
          is_public: data.isPublic
        });
  
      if (insertError) {
        console.error('Database insert error:', insertError);
        throw insertError;
      }
  
      console.log('プロフィール写真がアップロードされ、データベースに保存されました。');
      router.push('/register/staff/identity-verification');
    } catch (err) {
      console.error('Error uploading profile photo:', err);
      setError('プロフィール写真のアップロード中にエラーが発生しました。もう一度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    console.log('Profile upload skipped');
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
        <Typography variant="body1" sx={{ mb: 4, textAlign: 'center' }}>
        本人写真をアップロードしてください。明るく、顔がはっきりと写っている写真が最適です。
        </Typography>

        <ProfileUploadForm onNext={handleNext} onSkip={handleSkip} />
      </Box>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
}