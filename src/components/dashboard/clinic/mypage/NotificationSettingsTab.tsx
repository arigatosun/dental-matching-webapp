// src/components/dashboard/clinic/NotificationSettingsTab.tsx
'use client';
import React from 'react';
import { Typography, Box, Paper, Container } from '@mui/material';
import NotificationToggleList from './NotificationToggleList';

export default function NotificationSettingsTab() {
  return (
    <Container maxWidth="lg"> {/* ここを "md" から "lg" に変更 */}
      <Paper elevation={3} sx={{ p: 3, mt: 3, maxWidth: '1500px', mx: 'auto' }}> {/* maxWidthとmxを追加 */}
        <Typography variant="h6" gutterBottom>通知設定</Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          登録された通知設定をカスタマイズできます。
        </Typography>
        <NotificationToggleList />
      </Paper>
    </Container>
  );
}