// src/layouts/registration-layout.tsx

import React from 'react';
import { Box, Container } from '@mui/material';
import Image from 'next/image';

type RegistrationLayoutProps = {
  children: React.ReactNode;
};

export function RegistrationLayout({ children }: RegistrationLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
      }}
    >
      <Box
        component="header"
        sx={{
          py: 3,
          px: 3,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Image
          src="/images/logo/logo-header.svg"
          alt="Thoot Logo"
          width={160}
          height={80}
          priority
        />

      </Box>

      <Container
        component="main"
        maxWidth="md"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: 4,
        }}
      >
        {children}
      </Container>
    </Box>
  );
}