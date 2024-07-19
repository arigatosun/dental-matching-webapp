'use client';

import React from 'react';
import { Box, Container, Typography, Stepper, Step, StepLabel } from '@mui/material';
import { MedicalInstitutionCertificationForm } from '@/components/clinic-registration/certification-upload/MedicalInstitutionCertificationForm';

const steps = ['基本情報入力', 'プロフィール写真登録', 'マッチング条件設定', '事前概要作成', '医院証明書提出', '利用規約・同意'];

export default function CertificationUploadPage() {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 2, mb: 6 }}>
        <Stepper activeStep={4} alternativeLabel sx={{ mt: 0, mb: 6 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
          医療機関証明書類の提出
        </Typography>
        
        <MedicalInstitutionCertificationForm />
      </Box>
    </Container>
  );
}