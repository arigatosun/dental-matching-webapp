'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, Typography, Button, Box, styled } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import { StaffInfo } from '@/types/supabase';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 400,
  width: '100%',
  margin: theme.spacing(2),
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const ProfileImage = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: 200,
  height: 200,
  margin: '0 auto',
  marginTop: theme.spacing(3),
  backgroundColor: theme.palette.grey[200],
  borderRadius: '50%',
  overflow: 'hidden',
}));

const InfoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
}));

const NicknameLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const StaffCard: React.FC<StaffInfo> = ({
  id,
  nickname,
  profession,
  desired_work_location,
  experience_years,
  min_hourly_rate,
  max_hourly_rate,
  profile_photo_url,
}) => {
  return (
    <StyledCard>
      <ProfileImage>
        <Image
          src={profile_photo_url || "/images/avater/no-image-profile-photo.svg"}
          alt={nickname}
          layout="fill"
          objectFit="cover"
        />
      </ProfileImage>
      <CardContent sx={{ pt: 3 }}>
        <Typography gutterBottom variant="h5" component="div" sx={{ mb: 2, textAlign: 'center' }}>
          <NicknameLink href={`/staff/${id}`}>{nickname}</NicknameLink>
        </Typography>
        <InfoBox>
          <PersonIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body1">
            職種：{profession.join(', ')}
          </Typography>
        </InfoBox>
        <InfoBox>
          <LocationOnIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body1">
            希望勤務地：{desired_work_location}
          </Typography>
        </InfoBox>
        <InfoBox>
          <WorkIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body1">
            経験年数：{experience_years}
          </Typography>
        </InfoBox>
        <InfoBox>
          <AttachMoneyIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body1">
            希望時給: ¥{min_hourly_rate.toLocaleString()} ～ ¥{max_hourly_rate.toLocaleString()}
          </Typography>
        </InfoBox>
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'center', pb: 3 }}>
        <Button variant="contained" color="primary" size="large" sx={{ color: 'white', px: 4 }}>
          オファーに進む
        </Button>
      </Box>
    </StyledCard>
  );
};

export default StaffCard;