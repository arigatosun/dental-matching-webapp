'use client'
import React from 'react';
import Image from 'next/image';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import { StaffInfo } from '@/types/supabase';  // supabase.ts ファイルへの正確なパスを指定してください

const StaffCard: React.FC<StaffInfo> = ({
  nickname,
  profession,
  desired_work_location,
  experience_years,
  min_hourly_rate,
  max_hourly_rate,
  profile_photo_url,
}) => {
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <Box sx={{ 
        position: 'relative', 
        width: 160,
        height: 160,
        margin: '0 auto',
        mt: 2,
        bgcolor: 'grey.200', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        borderRadius: '50%',
        overflow: 'hidden',
      }}>
        <Image
          src={profile_photo_url || "/images/avater/no-image-profile-photo.svg"}
          alt={nickname}
          layout="fill"
          objectFit="cover"
        />
      </Box>
      <CardContent sx={{ pt: 2 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ mb: 1, textAlign: 'center' }}>
          {nickname}
        </Typography>
        <Box display="flex" alignItems="center" mb={0.5}>
          <PersonIcon fontSize="small" />
          <Typography variant="body2" ml={1}>
            職種：{profession.join(', ')}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={0.5}>
          <LocationOnIcon fontSize="small" />
          <Typography variant="body2" ml={1}>
            希望勤務地：{desired_work_location}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={0.5}>
          <WorkIcon fontSize="small" />
          <Typography variant="body2" ml={1}>
            経験年数：{experience_years}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={0.5}>
          <AttachMoneyIcon fontSize="small" />
          <Typography variant="body2" ml={1}>
            希望時給: ¥{min_hourly_rate.toLocaleString()} ～ ¥{max_hourly_rate.toLocaleString()}
          </Typography>
        </Box>
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
        <Button variant="contained" color="primary" sx={{ color: 'white' }}>
          オファーに進む
        </Button>
      </Box>
    </Card>
  );
};

export default StaffCard;