// components/HeroSection.tsx
'use client';
import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import Link from 'next/link';

const HeroSection: React.FC = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #0051A2 0%, #F8A1A7 100%)',
        pt: 12,
        pb: 12,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
          transform: 'rotate(30deg)',
        },
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          align="center"
          color="#FFF0F3"
          gutterBottom
          sx={{ 
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            position: 'relative',
            zIndex: 1,
            mb: 4,
          }}
        >
          歯科医療のマッチングを、
          <br />
          もっとスマートに。
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="#FFF0F3"
          sx={{ 
            mt: 4, 
            mb: 6,
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: 1.6,
            position: 'relative',
            zIndex: 1,
          }}
        >
          Thootは、歯科医院と歯科スタッフをつなぐ、新しいマッチングプラットフォームです。
          すき間時間を活用して、理想の働き方を見つけましょう。
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <Link href="/auth/jwt/sign-up" passHref>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: '#0051A2',
                color: 'white',
                fontWeight: 'bold',
                padding: '12px 32px',
                fontSize: '1.2rem',
                borderRadius: '50px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                '&:hover': {
                  backgroundColor: '#F8A1A7',
                  color: 'white',
                  boxShadow: '0 6px 8px rgba(0,0,0,0.2)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              今すぐ始める
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;