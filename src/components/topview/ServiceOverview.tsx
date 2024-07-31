'use client';

import React from 'react';
import { Box, Typography, Grid, Paper, Container } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import SecurityIcon from '@mui/icons-material/Security';
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
      sx={{ 
        p: 4, 
        height: '100%', 
        transition: 'background-color 0.3s', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: 2, // カードの角を少し丸くする
      }}
    >
      {icon}
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ flexGrow: 1 }}>{description}</Typography>
    </AnimatedPaper>
  );
};

const ServiceOverview: React.FC = () => {
  return (
    <ScrollAnimation>
      <Box sx={{ py: 10, backgroundColor: '#f5f5f5' }}> {/* 上下のパディングを増やす */}
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" gutterBottom sx={{ mb: 8, fontWeight: 'bold', color: '#0051A2' }}>
            Thootの特徴
          </Typography>
          <Grid container spacing={4}> {/* スペーシングを4に増やす */}
            <Grid item xs={12} sm={6} md={4}>
              <ServiceCard
                icon={<BusinessIcon color="secondary" sx={{ fontSize: 48, mb: 3 }} />}
                title="歯科医院の方へ"
                description="必要な時に、必要なスキルを持つスタッフを見つけることができます。人材不足の解消や、急な欠員補充に最適です。"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ServiceCard
                icon={<PersonIcon color="primary" sx={{ fontSize: 48, mb: 3 }} />}
                title="歯科スタッフの方へ"
                description="自分のスキルと都合に合わせて、柔軟に働く機会を見つけることができます。経験を積みながら、収入アップを実現しましょう。"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ServiceCard
                icon={<AssignmentIcon color="error" sx={{ fontSize: 48, mb: 3 }} />}
                title="簡単な登録フロー"
                description="歯科医院は簡単にスタッフにお仕事をお願いでき、歯科スタッフは面接や書類選考なしで気軽にお仕事を受けることができます。"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ServiceCard
                icon={<AccessTimeIcon color="success" sx={{ fontSize: 48, mb: 3 }} />}
                title="柔軟な働き方"
                description="求職スタッフは働きたい時に好きなだけ働け、歯科医院は必要な時に必要な分だけオファーできるため、Win-Winの関係が築けます。"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ServiceCard
                icon={<StarIcon color="warning" sx={{ fontSize: 48, mb: 3 }} />}
                title="リアルな口コミ"
                description="歯科医院と歯科スタッフの双方でレビューを行うことで、リアルな口コミや過去のレビューが見れ、より精度の高いマッチングが実現できます。"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ServiceCard
                icon={<SecurityIcon color="info" sx={{ fontSize: 48, mb: 3 }} />}
                title="安全性と信頼性"
                description="身分証明書と資格証明書の確認を行い、信頼できる歯科医院とスタッフのみがプラットフォームを利用できます。安心して利用いただけます。"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ScrollAnimation>
  );
};

export default ServiceOverview;