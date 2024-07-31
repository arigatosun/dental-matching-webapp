// components/Header.tsx
'use client';

import React from 'react';
import { AppBar, Toolbar, Button, Box, useMediaQuery, Theme } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const Header: React.FC = () => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between', padding: isMobile ? '8px 16px' : '16px 24px' }}>
        <Box sx={{ flexGrow: 0 }}>
          <Image
            src="/images/logo/logo-header.svg"
            alt="Thoot Logo"
            width={isMobile ? 100 : 160}
            height={isMobile ? 50 : 80}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: isMobile ? 1 : 2 }}>
          <Link href="/auth/jwt/sign-up" passHref>
            <Button 
              color="primary" 
              variant="contained" 
              size={isMobile ? "small" : "medium"}
              sx={{ 
                borderRadius: '50px', 
                color: 'white',
                px: isMobile ? 2 : 3,
                py: isMobile ? 0.5 : 1,
                fontSize: isMobile ? '0.75rem' : '0.875rem',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                }
              }}
            >
              新規登録
            </Button>
          </Link>
          <Link href="/auth/jwt/sign-in" passHref>
            <Button 
              color="secondary" 
              variant="contained" 
              size={isMobile ? "small" : "medium"}
              sx={{ 
                borderRadius: '50px', 
                color: 'white',
                px: isMobile ? 2 : 3,
                py: isMobile ? 0.5 : 1,
                fontSize: isMobile ? '0.75rem' : '0.875rem',
                '&:hover': {
                  backgroundColor: 'secondary.dark',
                }
              }}
            >
              ログイン
            </Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;