'use client';

import React, { useState } from 'react';
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
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material';

// 仮のプロフィールデータ型
interface StaffProfileData {
  profilePhotoUrl: string;
  lastName: string;
  firstName: string;
  lastNameKana: string;
  firstNameKana: string;
  nickname: string;
  phoneNumber: string;
  postalCode: string;
  prefecture: string;
  city: string;
  address: string;
  buildingName: string;
  desiredWorkLocation: string;
  nearestStation: string;
  maritalStatus: 'single' | 'married';
  spouseDependency: 'yes' | 'no';
  introduction: string;
}

// 仮のプロフィールデータ
const initialStaffData: StaffProfileData = {
  profilePhotoUrl: '/path/to/default/image.jpg',
  lastName: '山田',
  firstName: '花子',
  lastNameKana: 'ヤマダ',
  firstNameKana: 'ハナコ',
  nickname: 'はなちゃん',
  phoneNumber: '090-1234-5678',
  postalCode: '123-4567',
  prefecture: '東京都',
  city: '千代田区',
  address: '1-1-1',
  buildingName: 'サンプルマンション101',
  desiredWorkLocation: '東京都内',
  nearestStation: '東京駅',
  maritalStatus: 'single',
  spouseDependency: 'no',
  introduction: '歯科衛生士として5年の経験があります。患者さんの笑顔のために日々努力しています。',
};

export default function ProfileTab() {
  const [staffData, setStaffData] = useState<StaffProfileData>(initialStaffData);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const handleSave = () => {
    // 実際にはここでデータを保存する処理を行う
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
    // 実際にはここで画像アップロード処理を行う
    console.log('画像がアップロードされました');
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
          <Paper elevation={3} sx={{ p: 2 }}>
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
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>基本情報</Typography>
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
                <TextField
                  fullWidth
                  label="電話番号"
                  name="phoneNumber"
                  value={staffData.phoneNumber}
                  onChange={handleInputChange}
                  margin="normal"
                />
              </Grid>
            </Grid>
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>住所</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="郵便番号"
                  name="postalCode"
                  value={staffData.postalCode}
                  onChange={handleInputChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="都道府県"
                  name="prefecture"
                  value={staffData.prefecture}
                  onChange={handleInputChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="市区町村"
                  name="city"
                  value={staffData.city}
                  onChange={handleInputChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="番地"
                  name="address"
                  value={staffData.address}
                  onChange={handleInputChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="建物名"
                  name="buildingName"
                  value={staffData.buildingName}
                  onChange={handleInputChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="希望勤務地"
                  name="desiredWorkLocation"
                  value={staffData.desiredWorkLocation}
                  onChange={handleInputChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
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
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>その他の情報</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">配偶者の有無</FormLabel>
                  <RadioGroup
                    row
                    aria-label="maritalStatus"
                    name="maritalStatus"
                    value={staffData.maritalStatus}
                    onChange={handleInputChange}
                  >
                    <FormControlLabel value="single" control={<Radio />} label="未婚" />
                    <FormControlLabel value="married" control={<Radio />} label="既婚" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">配偶者の扶養義務</FormLabel>
                  <RadioGroup
                    row
                    aria-label="spouseDependency"
                    name="spouseDependency"
                    value={staffData.spouseDependency}
                    onChange={handleInputChange}
                  >
                    <FormControlLabel value="yes" control={<Radio />} label="あり" />
                    <FormControlLabel value="no" control={<Radio />} label="なし" />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <TextField
              fullWidth
              label="自己紹介"
              name="introduction"
              value={staffData.introduction}
              onChange={handleInputChange}
              margin="normal"
              multiline
              rows={6}
            />
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