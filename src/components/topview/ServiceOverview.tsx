'use client'; 

import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import { useSpring, animated } from 'react-spring';
import ScrollAnimation from './ScrollAnimation';

const AnimatedPaper = animated(Paper);

const ServiceCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({
  icon,
  title,
  description,
}) => {
  const [props, set] = useSpring(() => ({
    transform: 'scale(1)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  }));

  return (
    <AnimatedPaper
      elevation={3}
      style={props}
      onMouseEnter={() => set({ transform: 'scale(1.05)', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' })}
      onMouseLeave={() => set({ transform: 'scale(1)', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' })}
      sx={{ p: 3, height: '100%', transition: 'background-color 0.3s' }}
    >
      {icon}
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Typography>{description}</Typography>
    </AnimatedPaper>
  );
};

const ServiceOverview: React.FC = () => {
  return (
    <ScrollAnimation>
      <Box sx={{ py: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          サービス概要
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <ServiceCard
              icon={<BusinessIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />}
              title="歯科医院の方へ"
              description="必要な時に、必要なスキルを持つスタッフを見つけることができます。人材不足の解消や、急な欠員補充に最適です。"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ServiceCard
              icon={<PersonIcon color="secondary" sx={{ fontSize: 40, mb: 2 }} />}
              title="歯科スタッフの方へ"
              description="自分のスキルと都合に合わせて、柔軟に働く機会を見つけることができます。経験を積みながら、収入アップを実現しましょう。"
            />
          </Grid>
        </Grid>
      </Box>
    </ScrollAnimation>
  );
};

export default ServiceOverview;