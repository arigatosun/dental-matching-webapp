// components/Footer.tsx
'use client'; 
import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
      <Typography variant="body2" color="text.secondary" align="center">
        {'© '}
        <Link color="inherit" href="https://thoot.jp/">
          Thoot
        </Link>{' '}
        {new Date().getFullYear()}
        {' | '}
        <Link color="inherit" href="/privacy-policy">
          プライバシーポリシー
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;