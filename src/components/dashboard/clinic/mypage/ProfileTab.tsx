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
  Link,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import { getClinicProfile, updateClinicProfile, ClinicProfileData } from '@/app/actions/clinic-profile';
import { useAuthContext } from '@/auth/hooks/use-auth-context';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function ProfileTab() {
  const [clinicData, setClinicData] = useState<ClinicProfileData | null>(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthContext();
  
  const fileInputRefs = {
    director: useRef<HTMLInputElement>(null),
    reception: useRef<HTMLInputElement>(null),
    exterior: useRef<HTMLInputElement>(null),
    unit: useRef<HTMLInputElement>(null),
  };

  const [phoneNumber, setPhoneNumber] = useState({
    part1: '',
    part2: '',
    part3: '',
  });

  useEffect(() => {
    async function fetchClinicProfile() {
      if (user) {
        try {
          const { profile, error } = await getClinicProfile(user.id);
          if (error) {
            setError(error);
          } else if (profile) {  // profile が null でないことを確認
            setClinicData(profile);
            // 電話番号を分割して設定
            const [part1 = '', part2 = '', part3 = ''] = profile.phoneNumber.split('-');
            setPhoneNumber({ part1, part2, part3 });
          } else {
            setError('No profile data available');
          }
        } catch (err) {
          console.error('Failed to fetch clinic profile:', err);
          setError('An unexpected error occurred');
        } finally {
          setLoading(false);
        }
      }
    }
    fetchClinicProfile();
  }, [user]);
  const handleSave = async () => {
    if (clinicData && user) {
      setLoading(true);
      try {
        const { success, error } = await updateClinicProfile(user.id, clinicData);
        if (success) {
          setSnackbarMessage('変更が保存されました！');
          setSnackbarSeverity('success');
        } else {
          setSnackbarMessage(error || '変更の保存に失敗しました');
          setSnackbarSeverity('error');
        }
        setIsSnackbarOpen(true);
      } catch (err) {
        console.error('Error saving profile:', err);
        setSnackbarMessage('予期せぬエラーが発生しました');
        setSnackbarSeverity('error');
        setIsSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    }
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

  const handleFileChange = (photoType: keyof typeof fileInputRefs) => async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && clinicData && user) {
      try {
        const supabase = createClientComponentClient();
        const { data, error } = await supabase.storage
          .from('clinic-photos')
          .upload(`${user.id}/${photoType}.jpg`, file, { upsert: true });

        if (error) throw error;

        const { data: publicUrlData } = supabase.storage
          .from('clinic-photos')
          .getPublicUrl(`${user.id}/${photoType}.jpg`);

        setClinicData(prevData => ({
          ...prevData!,
          photos: {
            ...prevData!.photos,
            [photoType]: publicUrlData.publicUrl,
          },
        }));
      } catch (error) {
        console.error('Error uploading file:', error);
        setSnackbarMessage('画像のアップロードに失敗しました');
        setSnackbarSeverity('error');
        setIsSnackbarOpen(true);
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setClinicData(prevData => ({
      ...prevData!,
      [name]: value,
    }));
  };

  const handlePhoneNumberChange = (part: 'part1' | 'part2' | 'part3') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setPhoneNumber(prev => ({ ...prev, [part]: newValue }));
    setClinicData(prevData => ({
      ...prevData!,
      phoneNumber: `${part === 'part1' ? newValue : phoneNumber.part1}-${part === 'part2' ? newValue : phoneNumber.part2}-${part === 'part3' ? newValue : phoneNumber.part3}`,
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
        image={clinicData?.photos[photoType] || ''}
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

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!clinicData) {
    return <Typography>No clinic data available</Typography>;
  }

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
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>医院電話番号</Typography>
                <Box display="flex" alignItems="center">
                  <TextField
                    label="電話番号"
                    value={phoneNumber.part1}
                    onChange={handlePhoneNumberChange('part1')}
                    margin="normal"
                    sx={{ width: '30%', mr: 1 }}
                  />
                  <Typography variant="h5">-</Typography>
                  <TextField
                    label=""
                    value={phoneNumber.part2}
                    onChange={handlePhoneNumberChange('part2')}
                    margin="normal"
                    sx={{ width: '30%', mx: 1 }}
                  />
                  <Typography variant="h5">-</Typography>
                  <TextField
                    label=""
                    value={phoneNumber.part3}
                    onChange={handlePhoneNumberChange('part3')}
                    margin="normal"
                    sx={{ width: '30%', ml: 1 }}
                  />
                </Box>
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
                  InputProps={{
                    endAdornment: <InputAdornment position="end">分</InputAdornment>,
                  }}
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
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}