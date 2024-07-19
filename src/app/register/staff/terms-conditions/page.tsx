import React from 'react';
import { Box, Container, Stepper, Step, StepLabel, Typography } from '@mui/material';
import { TermsAndConditionsForm } from '@/components/clinic-registration/terms-and-conditions/TermsAndConditions';

const steps = ['基本情報入力', 'プロフィール写真登録', 'マッチング条件設定', '事前同意事項作成', '医院証明書提出', '利用規約・同意'];

export default function TermsAndConditionsPage() {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 2, mb: 8 }}>  {/* ここでページ全体の上下マージンを調整 */}
        <Stepper activeStep={5} alternativeLabel sx={{ mb: 8 }}>  {/* ステッパーの下マージンを増やす */}
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 6, fontWeight: 'bold' }}>
          最後にご確認ください
        </Typography>
        
        <TermsAndConditionsForm />
      </Box>
    </Container>
  );
}