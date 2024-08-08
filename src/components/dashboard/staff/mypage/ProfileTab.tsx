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
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import {
  Person,
  Phone,
  Home,
  LocationOn,
  CameraAlt,
  Description,
} from '@mui/icons-material';

interface StaffProfileData {
  profilePhotoUrl: string;
  lastName: string;
  firstName: string;
  lastNameKana: string;
  firstNameKana: string;
  nickname: string;
  phoneNumber1: string;
  phoneNumber2: string;
  phoneNumber3: string;
  postalCode: string;
  prefecture: string;
  city: string;
  address: string;
  buildingName: string;
  desiredWorkLocation: string;
  nearestStation: string;
  maritalStatus: string;
  spouseDependency: string;
  introduction: string;
}

const initialStaffData: StaffProfileData = {
  profilePhotoUrl: '/path/to/default/image.jpg',
  lastName: '山田',
  firstName: '花子',
  lastNameKana: 'ヤマダ',
  firstNameKana: 'ハナコ',
  nickname: 'はなちゃん',
  phoneNumber1: '090',
  phoneNumber2: '1234',
  phoneNumber3: '5678',
  postalCode: '123-4567',
  prefecture: '東京都',
  city: '千代田区',
  address: '1-1-1',
  buildingName: 'サンプルマンション101',
  desiredWorkLocation: '東京都内',
  nearestStation: '東京駅',
  maritalStatus: '未婚',
  spouseDependency: 'なし',
  introduction: '歯科衛生士として5年の経験があります。患者さんの笑顔のために日々努力しています。',
};

export default function ProfileTab() {
  const [staffData, setStaffData] = useState<StaffProfileData>(initialStaffData);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    console.log('保存されたデータ:', staffData);
    setSnackbarMessage('プロフィールが更新されました！');
    setSnackbarSeverity('success');
    setIsSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpen(false);
  };

  const handlePhotoUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setStaffData(prevData => ({
          ...prevData,
          profilePhotoUrl: reader.result as string,
        }));
        setIsUploading(false);
        setSnackbarMessage('プロフィール写真がアップロードされました');
        setSnackbarSeverity('success');
        setIsSnackbarOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setStaffData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CameraAlt sx={{ mr: 1, color: 'primary.main' }} /> プロフィール写真
            </Typography>
            <Box 
              sx={{ 
                position: 'relative', 
                width: '200px', 
                height: '200px',
                margin: '0 auto',
                mb: 2,
              }}
            >
              <CardMedia
                component="img"
                image={staffData.profilePhotoUrl}
                alt="プロフィール写真"
                sx={{ 
                  width: '100%', 
                  height: '100%', 
                  borderRadius: '50%', 
                  objectFit: 'cover' 
                }}
              />
              {isUploading && (
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
                  }}
                >
                  <CircularProgress color="secondary" />
                </Box>
              )}
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
                onClick={handlePhotoUpload}
              >
                <Button
                  variant="contained"
                  startIcon={<CameraAlt />}
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
              </Box>
            <input
              type="file"
              hidden
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
            />
          
          </Paper>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Home sx={{ mr: 1, color: 'primary.main' }} /> 住所情報
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="郵便番号"
                  name="postalCode"
                  value={staffData.postalCode}
                  onChange={handleInputChange}
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOn />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="都道府県"
                  name="prefecture"
                  value={staffData.prefecture}
                  onChange={handleInputChange}
                  margin="normal"

                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="市区町村"
                  name="city"
                  value={staffData.city}
                  onChange={handleInputChange}
                  margin="normal"
                  
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="番地"
                  name="address"
                  value={staffData.address}
                  onChange={handleInputChange}
                  margin="normal"
                  
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="建物名"
                  name="buildingName"
                  value={staffData.buildingName}
                  onChange={handleInputChange}
                  margin="normal"
                  
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="希望勤務地"
                  name="desiredWorkLocation"
                  value={staffData.desiredWorkLocation}
                  onChange={handleInputChange}
                  margin="normal"
                  
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="最寄り駅"
                  name="nearestStation"
                  value={staffData.nearestStation}
                  onChange={handleInputChange}
                  margin="normal"
                 
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 0 }}>
              <Person sx={{ mr: 1, color: 'primary.main' }} /> 基本情報
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="姓"
                  name="lastName"
                  value={staffData.lastName}
                  onChange={handleInputChange}
                  margin="normal"
                  
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="名"
                  name="firstName"
                  value={staffData.firstName}
                  onChange={handleInputChange}
                  margin="normal"
                  
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="姓（カナ）"
                  name="lastNameKana"
                  value={staffData.lastNameKana}
                  onChange={handleInputChange}
                  margin="normal"
                  
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="名（カナ）"
                  name="firstNameKana"
                  value={staffData.firstNameKana}
                  onChange={handleInputChange}
                  margin="normal"
                  
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="ニックネーム"
                  name="nickname"
                  value={staffData.nickname}
                  onChange={handleInputChange}
                  margin="normal"
                 
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: 1 }}>
                  <Phone sx={{ mr: 1, color: 'primary.main' }} /> 電話番号
                </Typography>
                <Box display="flex" alignItems="center"sx={{ mb: 3 }}>
                  <TextField
                    name="phoneNumber1"
                    value={staffData.phoneNumber1}
                    onChange={handleInputChange}
                    inputProps={{ maxLength: 3 }}
                    sx={{ width: '20%' }}
                  />
                  <Typography sx={{ mx: 1 }}>-</Typography>
                  <TextField
                    name="phoneNumber2"
                    value={staffData.phoneNumber2}
                    onChange={handleInputChange}
                    inputProps={{ maxLength: 4 }}
                    sx={{ width: '25%' }}
                  />
                  <Typography sx={{ mx: 1 }}>-</Typography>
                  <TextField
                    name="phoneNumber3"
                    value={staffData.phoneNumber3}
                    onChange={handleInputChange}
                    inputProps={{ maxLength: 4 }}
                    sx={{ width: '25%' }}
                  />
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ mt: 3, mb: 3 }}>
              <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Description sx={{ mr: 1, color: 'primary.main' }} /> 自己紹介
              </Typography>
              <TextField
                fullWidth
                name="introduction"
                value={staffData.introduction}
                onChange={handleInputChange}
                multiline
                rows={4}
              />
            </Box>
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="配偶者の有無"
                    name="maritalStatus"
                    value={staffData.maritalStatus}
                    onChange={handleInputChange}
                    
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option value="未婚">未婚</option>
                    <option value="既婚">既婚</option>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="配偶者の扶養義務"
                    name="spouseDependency"
                    value={staffData.spouseDependency}
                    onChange={handleInputChange}
                    
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option value="あり">あり</option>
                    <option value="なし">なし</option>
                  </TextField>
                </Grid>
              </Grid>
            </Box>
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
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}