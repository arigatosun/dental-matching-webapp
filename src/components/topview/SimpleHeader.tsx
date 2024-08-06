'use client';

import React from 'react';
import { AppBar, Toolbar, Box, useMediaQuery, Theme } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const SimpleHeader: React.FC = () => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: 'flex-start', padding: isMobile ? '8px 16px' : '16px 24px' }}>
        <Link href="/" passHref>
          <Box sx={{ cursor: 'pointer' }}>
            <Image
              src="/images/logo/logo-header.svg"
              alt="Thoot Logo"
              width={isMobile ? 100 : 160}
              height={isMobile ? 50 : 80}
            />
          </Box>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default SimpleHeader;