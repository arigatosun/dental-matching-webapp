'use client'
import React from 'react';
import Image from 'next/image';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RepeatIcon from '@mui/icons-material/Repeat';

interface StaffCardProps {
  nickname: string;
  desiredSalary: number;
  matchCount: number;
  location: string;
  experience: string;
  profession: string;
}

const StaffCard: React.FC<StaffCardProps> = ({
  nickname,
  desiredSalary,
  matchCount,
  location,
  experience,
  profession,
}) => {
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <Box sx={{ position: 'relative', height: 140, bgcolor: 'grey.200', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Image
          src="/images/avater/sample-avater.jpg"
          alt={nickname}
          width={100}
          height={100}
          style={{ borderRadius: '50%' }}
        />
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {nickname}
        </Typography>
        <Box display="flex" alignItems="center" mt={1}>
          <PersonIcon fontSize="small" />
          <Typography variant="body2" ml={1}>
            職種：{profession}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={1}>
          <LocationOnIcon fontSize="small" />
          <Typography variant="body2" ml={1}>
            希望勤務地：{location}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={1}>
          <WorkIcon fontSize="small" />
          <Typography variant="body2" ml={1}>
            経験年数：{experience}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={1}>
          <AttachMoneyIcon fontSize="small" />
          <Typography variant="body2" ml={1}>
            希望時給: ¥{desiredSalary.toLocaleString()}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={1}>
          <RepeatIcon fontSize="small" />
          <Typography variant="body2" ml={1}>
            マッチ回数: {matchCount}回
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