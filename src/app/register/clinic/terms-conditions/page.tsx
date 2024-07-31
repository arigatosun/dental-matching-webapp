import React from 'react';
import { Box, Container, Stepper, Step, StepLabel } from '@mui/material';
import { TermsAndConditionsForm } from '@/components/clinic-registration/terms-and-conditions/TermsAndConditions';

const steps = ['基本情報入力', 'プロフィール写真登録', 'マッチング条件設定', '事前同意事項作成', '医院証明書提出', '利用規約・同意'];

export default function TermsAndConditionsPage() {
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
        
        <TermsAndConditionsForm />
      </Box>
    </Container>
  );
}