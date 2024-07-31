// components/Header.tsx
'use client';

import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Image
            src="/images/logo/logo-header.svg"
            alt="Thoot Logo"
            width={160}
            height={80}
          />
        </Box>
        <Link href="/auth/jwt/sign-up" passHref>
          <Button 
            color="primary" 
            variant="contained" 
            sx={{ 
              mr: 2, 
              borderRadius: '50px', 
              color: 'white',
              px: 3,
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
            sx={{ 
              borderRadius: '50px', 
              color: 'white',
              px: 3,
              '&:hover': {
                backgroundColor: 'secondary.dark',
              }
            }}
          >
            ログイン
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;