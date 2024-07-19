'use client';

import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  styled,
  Container,
  Stepper,
  Step,
  StepLabel,
  Fade,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { Iconify } from '@/components/iconify';

type PhotoType = 'director' | 'exterior' | 'unit' | 'reception';

interface PhotoUploadProps {
  type: PhotoType;
  title: string;
  isMain?: boolean;
}

const UploadBox = styled(Box)(({ theme }) => ({
  height: 200,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  border: '2px dashed',
  borderColor: theme.palette.grey[300],
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
  },
  overflow: 'hidden',
  transition: 'all 0.3s ease-in-out',
}));

const steps = ['基本情報入力', 'プロフィール写真登録', 'マッチング条件設定', '事前同意事項作成', '医院証明書提出', '利用規約・同意'];

const PhotoUpload: React.FC<PhotoUploadProps> = ({ type, title, isMain = false }) => {
  const [photo, setPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ position: 'relative', height: 200 }}>
        <Fade in={!photo}>
          <UploadBox onClick={handleClick}>
            <Iconify icon="solar:cloud-upload-outline" width={48} sx={{ mb: 1, color: 'primary.main' }} />
            <Typography variant="body2" color="textSecondary">
              クリックして画像を選択
            </Typography>
          </UploadBox>
        </Fade>
        {photo && (
          <Fade in={Boolean(photo)}>
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: 1,
                overflow: 'hidden',
                '&:hover': { '& > .overlay': { opacity: 1 } },
              }}
            >
              <Box
                component="img"
                src={photo}
                alt={title}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <Box
                className="overlay"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.3s',
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleClick}
                  startIcon={<Iconify icon="mdi:refresh" />}
                >
                  画像を変更
                </Button>
              </Box>
            </Box>
          </Fade>
        )}
      </Box>
      <input
        type="file"
        hidden
        ref={fileInputRef}
        accept="image/*"
        onChange={handlePhotoUpload}
      />
    </Box>
  );
};

interface ProfilePhotoUploadViewProps {
  handleNext: () => void;
  handleSkip: () => void;
}

export function ProfilePhotoUploadView({ handleNext, handleSkip }: ProfilePhotoUploadViewProps) {
  const [openPopup, setOpenPopup] = useState(false);

  const handleOpenPopup = () => setOpenPopup(true);
  const handleClosePopup = () => setOpenPopup(false);

  const photoSamples = [
    { src: '/images/profile-sample/directer.jpg', title: '院長写真', description: '笑顔で親しみやすい印象を与える写真を選びましょう。' },
    { src: '/images/profile-sample/gaikan-image.jpg', title: '外観写真', description: '明るく清潔感のある外観写真で、医院の印象を良くしましょう。' },
    { src: '/images/profile-sample/unit-images.jpg', title: 'ユニット写真', description: '清潔で整理された診療室の写真で、安心感を与えましょう。' },
    { src: '/images/profile-sample/uketsuke.jpg', title: '受付写真', description: '明るく落ち着いた雰囲気の受付写真で、患者さんを迎える準備をアピールしましょう。' },
  ];

  return (
    <Container maxWidth="md">
      <Stepper activeStep={1} alternativeLabel sx={{ mt: 2, mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ mb: 2, fontWeight: 'bold' }}>
        プロフィール写真を登録してください
      </Typography>
      <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 4 }}>
        ※プロフィール写真は後から変更できます。
      </Typography>

      <Button
        onClick={handleOpenPopup}
        variant="outlined"
        color="primary"
        sx={{ display: 'block', margin: '0 auto', mb: 4 }}
      >
        マッチング率を上げる写真とは？
      </Button>

      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <PhotoUpload type="director" title="院長写真" isMain />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PhotoUpload type="exterior" title="外観写真" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PhotoUpload type="unit" title="ユニット写真" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PhotoUpload type="reception" title="受付写真" />
          </Grid>
        </Grid>
        <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button onClick={handleSkip} variant="outlined" size="large" sx={{ minWidth: 200 }}>
            後で登録する
          </Button>
          <Button onClick={handleNext} variant="contained" color="primary" size="large" sx={{ minWidth: 200, color: 'white' }}>
            次へ
          </Button>
        </Box>
      </Paper>

      <Dialog 
        open={openPopup} 
        onClose={handleClosePopup} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: '#f5f5f5',
            borderRadius: '12px',
          },
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: '#333', pt: 3 }}>
          マッチング率を上げる写真とは？
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            {photoSamples.map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.03)' } }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.src}
                    alt={item.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1, bgcolor: 'white' }}>
                    <Typography gutterBottom variant="h6" component="div" sx={{ color: '#0051A8', fontWeight: 'bold' }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button 
            onClick={handleClosePopup} 
            variant="contained" 
            color="primary"
            sx={{ 
              borderRadius: '20px', 
              px: 4,
              color: 'white',
              '&:hover': {
                backgroundColor: '#003C7E',
              },
            }}
          >
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}