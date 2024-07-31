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
        borderRadius: '50%', // コンテナを円形にする
        overflow: 'hidden', // はみ出た部分を隠す
      }}>
        <Image
          src="/images/avater/no-image-profile-photo.svg"
          alt={nickname}
          layout="fill"
          objectFit="contain" // アスペクト比を維持しつつ、コンテナ内に収める
          style={{ padding: '10px' }} // 画像の周りに少し余白を設ける
        />
      </Box>
      <CardContent sx={{ pt: 2 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ mb: 1, textAlign: 'center' }}>
          {nickname}
        </Typography>
        <Box display="flex" alignItems="center" mb={0.5}>
          <PersonIcon fontSize="small" />
          <Typography variant="body2" ml={1}>
            職種：{profession}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={0.5}>
          <LocationOnIcon fontSize="small" />
          <Typography variant="body2" ml={1}>
            希望勤務地：{location}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={0.5}>
          <WorkIcon fontSize="small" />
          <Typography variant="body2" ml={1}>
            経験年数：{experience}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={0.5}>
          <AttachMoneyIcon fontSize="small" />
          <Typography variant="body2" ml={1}>
            希望時給: ¥{desiredSalary.toLocaleString()}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={0.5}>
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