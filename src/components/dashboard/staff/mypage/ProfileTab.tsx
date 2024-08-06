import React from 'react';
import { Typography, Box } from '@mui/material';

export default function ProfileTab() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">プロフィール</Typography>
      <Typography>ここにプロフィール情報が表示されます。</Typography>
    </Box>
  );
}