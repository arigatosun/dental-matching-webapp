// src/app/dashboard/clinic/mypage/page.tsx
'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import MyPageTabs from '@/components/dashboard/clinic/MypageTabs';

export default function MyPage() {
  return (
    <Box sx={{ width: '90%', maxWidth: '90%', px: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        マイページ
      </Typography>
      <MyPageTabs />
    </Box>
  );
}