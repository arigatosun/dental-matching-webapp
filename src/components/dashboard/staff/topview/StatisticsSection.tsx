'use client';

import React from 'react';
import { Typography, Box, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StatisticsSection: React.FC = () => {
  // サンプルデータ
  const data = [
    { month: '1月', 収入: 450000, マッチング: 5 },
    { month: '2月', 収入: 520000, マッチング: 6 },
    { month: '3月', 収入: 480000, マッチング: 5 },
    { month: '4月', 収入: 550000, マッチング: 7 },
    { month: '5月', 収入: 600000, マッチング: 8 },
    { month: '6月', 収入: 580000, マッチング: 7 },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        報酬・マッチング統計
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1">総収入: ¥3,180,000</Typography>
          <Typography variant="subtitle1">総マッチング回数: 38回</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="収入" fill="#8884d8" />
              <Bar yAxisId="right" dataKey="マッチング" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StatisticsSection;