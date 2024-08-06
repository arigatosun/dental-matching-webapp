import React from 'react';
import { Typography, Box } from '@mui/material';

export default function MatchingConditionsTab() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">マッチ条件</Typography>
      <Typography>ここにマッチング条件が表示されます。</Typography>
    </Box>
  );
}