'use client';

import React, { useState } from 'react';
import { Box, Container, Typography, Stepper, Step, StepLabel, Snackbar, Alert } from '@mui/material';
import { IdentityAndLicenseVerificationForm } from './IdentityAndLicenseVerificationForm';
import { useRouter } from 'next/navigation';
import { getSupabase } from '@/utils/supabase-client';
import { getDevelopmentUser } from '@/utils/auth-helper';
import { v4 as uuidv4 } from 'uuid';
import { Database } from '@/types/supabase'; // supabase.tsファイルへのパスを適切に設定してください

const steps = ['基本情報入力', 'スキル・経歴入力', 'プロフィール写真登録', '本人確認・免許の提出', '利用規約・同意'];

export default function IdentityAndLicenseVerificationWrapper() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  
  const handleNext = async (data: {
    identityDocType: string;
    licenseDocType: string;
    identityFrontFile: File;
    identityBackFile: File;
    licenseFile: File;
  }) => {
    try {
      const supabase = getSupabase();
      const user = await getDevelopmentUser('staff');
      
      if (!user) {
        throw new Error('開発用ユーザーの取得に失敗しました。');
      }

      // 本人確認書類のアップロードと保存
      const identityFrontFileName = `${user.id}/${uuidv4()}-front.jpg`;
      const identityBackFileName = `${user.id}/${uuidv4()}-back.jpg`;

      const [frontUpload, backUpload] = await Promise.all([
        supabase.storage
          .from('identification-documents')
          .upload(identityFrontFileName, data.identityFrontFile),
        supabase.storage
          .from('identification-documents')
          .upload(identityBackFileName, data.identityBackFile)
      ]);

      if (frontUpload.error || backUpload.error) {
        throw new Error('本人確認書類のアップロードに失敗しました。');
      }

      const { data: frontUrlData } = supabase.storage
        .from('identification-documents')
        .getPublicUrl(identityFrontFileName);

      const { data: backUrlData } = supabase.storage
        .from('identification-documents')
        .getPublicUrl(identityBackFileName);

      const identityDocType = data.identityDocType as Database['public']['Tables']['identification_documents']['Insert']['document_type'];

      const { error: identityInsertError } = await supabase
        .from('identification_documents')
        .insert({
          user_id: user.id,
          document_type: identityDocType,
          front_image_url: frontUrlData.publicUrl,
          back_image_url: backUrlData.publicUrl
        });

      if (identityInsertError) {
        throw identityInsertError;
      }

      // 資格免許のアップロードと保存
      const licenseFileName = `${user.id}/${uuidv4()}.jpg`;
      const { error: licenseUploadError } = await supabase.storage
        .from('professional-licenses')
        .upload(licenseFileName, data.licenseFile);

      if (licenseUploadError) {
        throw new Error('資格免許のアップロードに失敗しました。');
      }

      const { data: licenseUrlData } = supabase.storage
        .from('professional-licenses')
        .getPublicUrl(licenseFileName);

      const licenseType = data.licenseDocType as Database['public']['Tables']['professional_licenses']['Insert']['license_type'];

      const { error: licenseInsertError } = await supabase
        .from('professional_licenses')
        .insert({
          user_id: user.id,
          license_type: licenseType,
          image_url: licenseUrlData.publicUrl
        });

      if (licenseInsertError) {
        throw licenseInsertError;
      }

      console.log('本人確認書類と資格免許が正常にアップロードされました。');
      router.push('/register/staff/terms-conditions');
    } catch (err) {
      console.error('Error uploading documents:', err);
      setError('書類のアップロード中にエラーが発生しました。もう一度お試しください。');
    }
  };

  return (
    <Container maxWidth="md">
       <Box sx={{ mt: 0, mb: 4 }}>
        <Stepper activeStep={3} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, mb: 2, textAlign: 'center' }}>
          本人確認書類・資格免許の提出
        </Typography>

        <IdentityAndLicenseVerificationForm onNext={handleNext} />
      </Box>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
}