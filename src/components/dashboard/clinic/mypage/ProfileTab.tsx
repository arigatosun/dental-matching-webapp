'use client';

import React, { useState, useRef } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  Typography,
  Button,
  TextField,
  Box,
  Snackbar,
  Alert,
  Paper,
  Link,
} from '@mui/material';

interface ClinicData {
  clinicName: string;
  directorName: string;
  phoneNumber: string;
  prefecture: string;
  city: string;
  address: string;
  nearestStation: string;
  walkingTimeFromStation: string;
  introduction: string;
  clinicUrl: string;
  photos: {
    [key: string]: string;
  };
}

const initialData: ClinicData = {
  clinicName: "医療法人 アリガトウ歯科",
  directorName: "歯科 太郎",
  phoneNumber: "06-6426-7474",
  prefecture: "兵庫県",
  city: "神田北通",
  address: "6丁目3番1号 西村ビル2F",
  nearestStation: "○○線 ○○駅",
  walkingTimeFromStation: "5分",
  introduction: "当院クリニックは、地域の皆様に信頼される歯科医療を目指し、最新の技術と温かいホスピタリティで患者様をお迎えしています。私たちは、患者様一人ひとりに寄り添い最適な治療を提供することを第一に考え、丁寧なカウンセリングと確かな技術で皆様の歯の健康をサポートいたします。\n\n当院では、歯科衛生士との連携が高まるような環境づくりを意識しています。\n歯科衛生士の皆様には、患者様の口腔衛生を守る重要な役割を担っていただいております。私たちと一緒に、地域の皆様の健康な笑顔を守るチームの一員となっていただければ幸いです。",
  clinicUrl: "https://www.arigatou-dental.com",
  photos: {
    director: "/images/profile-sample/directer.jpg",
    exterior: "/images/profile-sample/gaikan-image.jpg",
    reception: "/images/profile-sample/uketsuke.jpg",
    unit: "/images/profile-sample/unit-images.jpg"
  }
};

export default function ProfileTab() {
  const [clinicData, setClinicData] = useState<ClinicData>(initialData);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const fileInputRefs = {
    director: useRef<HTMLInputElement>(null),
    reception: useRef<HTMLInputElement>(null),
    exterior: useRef<HTMLInputElement>(null),
    unit: useRef<HTMLInputElement>(null),
  };

  const handleSave = () => {
    console.log('Saving data:', clinicData);
    setIsSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpen(false);
  };

  const handlePhotoUpload = (photoType: keyof typeof fileInputRefs) => {
    fileInputRefs[photoType].current?.click();
  };

  const handleFileChange = (photoType: keyof typeof fileInputRefs) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setClinicData(prevData => ({
          ...prevData,
          photos: {
            ...prevData.photos,
            [photoType]: reader.result as string,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setClinicData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const renderPhoto = (photoType: keyof typeof fileInputRefs, title: string, size: string) => (
    <Box 
      sx={{ 
        position: 'relative', 
        width: size, 
        height: size,
        margin: photoType === 'director' ? '0 auto' : '0',
        mb: photoType === 'director' ? 2 : 0,
      }}
    >
      <CardMedia
        component="img"
        image={clinicData.photos[photoType]}
        alt={title}
        sx={{ 
          width: '100%', 
          height: '100%', 
          borderRadius: '50%', 
          objectFit: 'cover' 
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderRadius: '50%',
          opacity: 0,
          transition: 'opacity 0.3s',
          cursor: 'pointer',
          '&:hover': {
            opacity: 1,
          },
        }}
        onClick={() => handlePhotoUpload(photoType)}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
            },
          }}
        >
          画像を変更
        </Button>
      </Box>
      <input
        type="file"
        hidden
        ref={fileInputRefs[photoType]}
        accept="image/*"
        onChange={handleFileChange(photoType)}
      />
    </Box>
  );

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            {renderPhoto('director', '院長写真', '200px')}
            <Typography variant="subtitle1" align="center" gutterBottom>院長写真</Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {['reception', 'exterior', 'unit'].map((key) => (
                <Grid item xs={4} key={key}>
                  <Box sx={{ height: '140px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {renderPhoto(key as keyof typeof fileInputRefs, key === 'reception' ? '受付写真' : key === 'exterior' ? '外観写真' : 'ユニット写真', '100px')}
                    <Typography variant="caption" align="center" sx={{ mt: 1 }}>
                      {key === 'reception' ? '受付写真' : key === 'exterior' ? '外観写真' : 'ユニット写真'}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>医院情報</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="医院名"
                  name="clinicName"
                  value={clinicData.clinicName}
                  onChange={handleInputChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="院長名"
                  name="directorName"
                  value={clinicData.directorName}
                  onChange={handleInputChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="医院電話番号"
                  name="phoneNumber"
                  value={clinicData.phoneNumber}
                  onChange={handleInputChange}
                  margin="normal"
                />
              </Grid>
            </Grid>
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>医院住所</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="都道府県"
                  name="prefecture"
                  value={clinicData.prefecture}
                  onChange={handleInputChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="市区町村"
                  name="city"
                  value={clinicData.city}
                  onChange={handleInputChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="番地"
                  name="address"
                  value={clinicData.address}
                  onChange={handleInputChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="最寄り駅"
                  name="nearestStation"
                  value={clinicData.nearestStation}
                  onChange={handleInputChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="最寄り駅からの徒歩時間"
                  name="walkingTimeFromStation"
                  value={clinicData.walkingTimeFromStation}
                  onChange={handleInputChange}
                  margin="normal"
                />
              </Grid>
            </Grid>
            <TextField
              fullWidth
              label="医院紹介"
              name="introduction"
              value={clinicData.introduction}
              onChange={handleInputChange}
              margin="normal"
              multiline
              rows={6}
            />
            <TextField
              fullWidth
              label="医院のURL"
              name="clinicUrl"
              value={clinicData.clinicUrl}
              onChange={handleInputChange}
              margin="normal"
            />
            <Link href={clinicData.clinicUrl} target="_blank" rel="noopener noreferrer" sx={{ display: 'inline-block', mt: 1 }}>
              ウェブサイトを開く
            </Link>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSave}
          sx={{ 
            minWidth: 160,
            height: 48,
            fontSize: '0.875rem',
            color: 'white',
          }}
        >
          変更を保存する
        </Button>
      </Box>
      <Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          変更が保存されました！
        </Alert>
      </Snackbar>
    </Box>
  );
}