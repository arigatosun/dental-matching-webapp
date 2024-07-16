'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  styled,
  Container,
  Tooltip,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { Iconify } from '@/components/iconify';

type PhotoType = 'director' | 'exterior' | 'interior' | 'reception';

interface PhotoUploadProps {
  type: PhotoType;
  title: string;
  isMain?: boolean;
}

const UploadPaper = styled(Paper)(({ theme }) => ({
  height: 200,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  border: '2px dashed',
  borderColor: theme.palette.grey[300],
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
}));

const PhotoUpload: React.FC<PhotoUploadProps> = ({ type, title, isMain = false }) => {
  const [photo, setPhoto] = useState<string | null>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  

  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        {title}
      </Typography>
      <UploadPaper elevation={0}>
        {photo ? (
          <Box
            component="img"
            src={photo}
            alt={title}
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <>
            <Iconify icon="solar:cloud-upload-outline" width={48} sx={{ mb: 1 }} />
            <Typography variant="body2" color="textSecondary">
              画像を選択
            </Typography>
          </>
        )}
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handlePhotoUpload}
        />
      </UploadPaper>
     
    </Box>
  );
};

const steps = ['基本情報入力', 'プロフィール写真登録', 'マッチング条件設定', '支払情報登録', '審査情報登録', '利用規約・同意'];

export function ProfilePhotoUploadView() {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Stepper activeStep={1} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h4" gutterBottom>
            プロフィール写真の登録
          </Typography>
          <Typography variant="body1" color="textSecondary">
            プロフィール写真は後から変更できます。
          </Typography>
        </Box>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <PhotoUpload type="director" title="院長写真" isMain />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PhotoUpload type="exterior" title="外観写真" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PhotoUpload type="interior" title="内観写真" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PhotoUpload type="reception" title="受付写真" />
          </Grid>
        </Grid>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2, textAlign: 'center' }}>
          ※推奨サイズ：横幅1280px以上、縦横比1:1の正方形
        </Typography>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
          <Button variant="contained" color="primary" size="large" sx={{ minWidth: 200 }}>
            次へ進む
          </Button>
          <Button color="inherit" sx={{ mt: 2 }}>
            後で登録する
          </Button>
        </Box>
      </Box>
    </Container>
  );
}