'use client';

import React, { useState, useRef, useEffect } from 'react';
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
import { useAuthContext } from '@/auth/hooks/use-auth-context';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { getStaffProfile, updateStaffProfile, StaffProfileData } from '@/app/actions/staff/profile';

export default function ProfileTab() {
  const [staffData, setStaffData] = useState<StaffProfileData | null>(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [phoneNumber, setPhoneNumber] = useState({
    part1: '',
    part2: '',
    part3: '',
  });
  // 新しい郵便番号の state を追加
  const [postalCode, setPostalCode] = useState({
    part1: '',
    part2: '',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRefs = {
    part1: useRef<HTMLInputElement>(null),
    part2: useRef<HTMLInputElement>(null),
    part3: useRef<HTMLInputElement>(null),
  };
  // 郵便番号の input refs を追加
  const postalCodeInputRefs = {
    part1: useRef<HTMLInputElement>(null),
    part2: useRef<HTMLInputElement>(null),
  };

  const { user } = useAuthContext();
  const supabase = createClientComponentClient();

  useEffect(() => {
    if (user) {
      fetchStaffProfile();
    }
  }, [user]);

  const fetchStaffProfile = async () => {
    if (user) {
      try {
        const { profile, error } = await getStaffProfile(user.id);
        if (error) {
          throw new Error(error);
        }
        setStaffData(profile);
        if (profile) {
          const [part1 = '', part2 = '', part3 = ''] = profile.phoneNumber.split('-');
          setPhoneNumber({ part1, part2, part3 });
          
          // 郵便番号の処理を追加
          const [postalPart1 = '', postalPart2 = ''] = profile.postalCode.split('-');
          setPostalCode({ part1: postalPart1, part2: postalPart2 });
        }
      } catch (error) {
        console.error('Error fetching staff profile:', error);
        setSnackbarMessage('プロフィールの取得に失敗しました');
        setSnackbarSeverity('error');
        setIsSnackbarOpen(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSave = async () => {
    if (user && staffData) {
      try {
        if (selectedFile) {
          const { data, error } = await supabase.storage
            .from('staff-profile-photos')
            .upload(`${user.id}/profile.jpg`, selectedFile, { upsert: true });

          if (error) throw error;

          const { data: publicUrlData } = supabase.storage
            .from('staff-profile-photos')
            .getPublicUrl(`${user.id}/profile.jpg`);

          staffData.profilePhotoUrl = publicUrlData.publicUrl;
        }

        const fullPhoneNumber = `${phoneNumber.part1}-${phoneNumber.part2}-${phoneNumber.part3}`;
        const fullPostalCode = `${postalCode.part1}-${postalCode.part2}`; // 郵便番号を結合
        const updatedStaffData = { 
          ...staffData, 
          phoneNumber: fullPhoneNumber,
          postalCode: fullPostalCode // 更新データに郵便番号を追加
        };

        const { success, error } = await updateStaffProfile(user.id, updatedStaffData);
        if (error) throw new Error(error);

        setSnackbarMessage('プロフィールが更新されました！');
        setSnackbarSeverity('success');
        setSelectedFile(null);
        setPreviewImage(null);
      } catch (error) {
        console.error('Error updating staff profile:', error);
        setSnackbarMessage('プロフィールの更新に失敗しました');
        setSnackbarSeverity('error');
      } finally {
        setIsSnackbarOpen(true);
      }
    }
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
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setStaffData(prevData => ({
      ...prevData!,
      [name]: value,
    }));
  };

  const handlePhoneNumberChange = (part: keyof typeof phoneNumber) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.replace(/\D/g, '');
    const maxLength = part === 'part1' ? 3 : 4;
    
    if (newValue.length <= maxLength) {
      setPhoneNumber(prev => ({ ...prev, [part]: newValue }));
      
      if (newValue.length === maxLength) {
        const nextPart = part === 'part1' ? 'part2' : part === 'part2' ? 'part3' : null;
        if (nextPart) {
          phoneInputRefs[nextPart].current?.focus();
        }
      }
    }
  };

  // 郵便番号の入力ハンドラを追加
  const handlePostalCodeChange = (part: keyof typeof postalCode) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.replace(/\D/g, '');
    const maxLength = part === 'part1' ? 3 : 4;
    
    if (newValue.length <= maxLength) {
      setPostalCode(prev => ({ ...prev, [part]: newValue }));
      
      if (newValue.length === maxLength) {
        const nextPart = part === 'part1' ? 'part2' : null;
        if (nextPart) {
          postalCodeInputRefs[nextPart].current?.focus();
        }
      }
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!staffData) {
    return <Typography>プロフィールデータが利用できません</Typography>;
  }


  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Grid container spacing={3}>
        {/* プロフィール写真セクション */}
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
                image={previewImage || staffData.profilePhotoUrl || '/path/to/default/image.jpg'}
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

          {/* 住所情報セクション */}
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Home sx={{ mr: 1, color: 'primary.main' }} /> 住所情報
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>郵便番号</Typography>
                <Box display="flex" alignItems="center">
                  <TextField
                    inputRef={postalCodeInputRefs.part1}
                    value={postalCode.part1}
                    onChange={handlePostalCodeChange('part1')}
                    inputProps={{ maxLength: 3 }}
                    sx={{ width: '40%' }}
                  />
                  <Typography variant="h5" sx={{ mx: 1 }}>-</Typography>
                  <TextField
                    inputRef={postalCodeInputRefs.part2}
                    value={postalCode.part2}
                    onChange={handlePostalCodeChange('part2')}
                    inputProps={{ maxLength: 4 }}
                    sx={{ width: '50%' }}
                  />
                </Box>
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

        {/* 基本情報セクション */}
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
              <Grid item xs={12}sm={6}>
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
        <Box display="flex" alignItems="center">
          <TextField
            inputRef={phoneInputRefs.part1}
            value={phoneNumber.part1}
            onChange={handlePhoneNumberChange('part1')}
            inputProps={{ maxLength: 3 }}
            sx={{ width: '30%' }}
          />
          <Typography variant="h5" sx={{ mx: 1 }}>-</Typography>
          <TextField
            inputRef={phoneInputRefs.part2}
            value={phoneNumber.part2}
            onChange={handlePhoneNumberChange('part2')}
            inputProps={{ maxLength: 4 }}
            sx={{ width: '30%' }}
          />
          <Typography variant="h5" sx={{ mx: 1 }}>-</Typography>
          <TextField
            inputRef={phoneInputRefs.part3}
            value={phoneNumber.part3}
            onChange={handlePhoneNumberChange('part3')}
            inputProps={{ maxLength: 4 }}
            sx={{ width: '30%' }}
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
                value={staffData.introduction ?? ''}
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
                    <option value="single">未婚</option>
                    <option value="married">既婚</option>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="配偶者の扶養義務"
                    name="spouseDependency"
                    value={staffData.spouseDependency ? 'yes' : 'no'}
                    onChange={(e) => {
                      const newValue = e.target.value === 'yes';
                      setStaffData(prevData => ({
                        ...prevData!,
                        spouseDependency: newValue
                      }));
                    }}
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option value="yes">あり</option>
                    <option value="no">なし</option>
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