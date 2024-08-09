'use client';

import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import AttendanceCalendar from '@/components/dashboard/staff/attendance/AttendanceCalendar';

export default function AttendancePage() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        勤怠カレンダー
      </Typography>
      <Paper elevation={3} sx={{ p: 2, height: 'calc(100vh - 200px)' }}>
        <AttendanceCalendar />
      </Paper>
    </Container>
  );
}