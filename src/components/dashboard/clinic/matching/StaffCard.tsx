'use client'
import React from 'react';
import Image from 'next/image';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';

interface StaffCardProps {
  nickname: string;
  profession: string;
  thootRank: string;
  desiredSalary: number;
  matchCount: number;
  location: string;
  experience: string;
}

const StaffCard: React.FC<StaffCardProps> = ({
  nickname,
  profession,
  thootRank,
  desiredSalary,
  matchCount,
  location,
  experience,
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
        <Typography variant="body2" color="text.secondary">
          {profession}
        </Typography>
        <Typography variant="body2" color="text.primary">
          THOOTRANK: {thootRank}
        </Typography>
        <Box display="flex" alignItems="center" mt={1}>
          <LocationOnIcon fontSize="small" />
          <Typography variant="body2" ml={1}>
            {location}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={1}>
          <WorkIcon fontSize="small" />
          <Typography variant="body2" ml={1}>
            {experience}
          </Typography>
        </Box>
        <Typography variant="body2" mt={1}>
          希望時給: ¥{desiredSalary.toLocaleString()}
        </Typography>
        <Typography variant="body2">
          マッチ回数: {matchCount}回
        </Typography>
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
        <Button variant="contained" color="primary">
          オファーに進む
        </Button>
      </Box>
    </Card>
  );
};

export default StaffCard;