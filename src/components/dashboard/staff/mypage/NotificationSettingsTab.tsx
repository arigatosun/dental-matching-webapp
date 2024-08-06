import React from 'react';
import { Typography, Box } from '@mui/material';

export default function NotificationSettingsTab() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">通知設定</Typography>
      <Typography>ここに通知設定が表示されます。</Typography>
    </Box>
  );
}