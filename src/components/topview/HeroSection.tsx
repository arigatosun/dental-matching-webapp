'use client';
import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const HeroSection: React.FC = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #F8A1A7 0%, #FFF0F3 100%)',
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
          color="#0051A2"
          gutterBottom
          sx={{ 
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          歯科医療のマッチングを、
        </Typography>
        <Typography
          variant="h2"
          align="center"
          color="#0051A2"
          gutterBottom
          sx={{ 
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          もっとスマートに。
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="#0051A2"
          sx={{ 
            mt: 4, 
            mb: 4,
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
      </Container>
    </Box>
  );
};

export default HeroSection;