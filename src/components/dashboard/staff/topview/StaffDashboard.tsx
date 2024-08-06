'use client';

import React from 'react';
import { Container, Grid, Paper, Box } from '@mui/material';
import ProfileSection from './ProfileSection';
import StatisticsSection from './StatisticsSection';
import OfferSection from './OfferSection';
import ReviewSection from './ReviewSection';
import CalendarSection from './CalendarSection';

const StaffDashboard: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <ProfileSection />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <StatisticsSection />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <OfferSection />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <ReviewSection />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <CalendarSection />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StaffDashboard;