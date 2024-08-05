'use client';


import React from 'react';
import { Typography, Box } from '@mui/material';

export default function AccountSettingsTab() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">メール・パスワード設定</Typography>
      <Typography>ここにアカウント設定が表示されます。</Typography>
    </Box>
  );
}