'use client'

import React, { useState, useEffect, useRef } from 'react';
import {
  Grid, Card, CardMedia, Typography, Button, TextField, Box, Snackbar, Alert, Paper, Link
} from '@mui/material';
import { useAuth } from '@/hooks/useAuth';
import { getSupabase } from '@/utils/supabase-client';

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

export default function ProfileTab() {
  const { user } = useAuth();
  const [clinicData, setClinicData] = useState<ClinicData>({
    clinicName: '',
    directorName: '',
    phoneNumber: '',
    prefecture: '',
    city: '',
    address: '',
    nearestStation: '',
    walkingTimeFromStation: '',
    introduction: '',
    clinicUrl: '',
    photos: {
      director: '',
      exterior: '',
      reception: '',
      unit: '',
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const fileInputRefs = {
    director: useRef<HTMLInputElement>(null),
    reception: useRef<HTMLInputElement>(null),
    exterior: useRef<HTMLInputElement>(null),
    unit: useRef<HTMLInputElement>(null),
  };

  useEffect(() => {
    console.log('Current user:', user);
    if (user) {
      console.log('User ID:', user.id);
      fetchClinicData();
    } else {
      console.log('No user logged in');
      setIsLoading(false);
    }
  }, [user]);


  const fetchClinicData = async () => {
  setIsLoading(true);
  try {
    console.log('Fetching clinic data...');
    const supabase = getSupabase();
    console.log('Supabase client created');
    
    console.log('Fetching basic info...');
    const { data: basicInfo, error: basicInfoError } = await supabase
      .from('clinic_basic_info')
      .select('*')
      .eq('user_id', user?.id)
      .single();

    console.log('Basic info fetched:', basicInfo);
    if (basicInfoError) {
      console.error('Error fetching basic info:', basicInfoError);
      throw basicInfoError;
    }

    if (!basicInfo) {
      console.log('No basic info found for user');
      return; // Exit the function if no data is found
    }

    console.log('Fetching photos...');
    const { data: photos, error: photosError } = await supabase
      .from('clinic_photos')
      .select('*')
      .eq('user_id', user?.id)
      .single();

    console.log('Photos fetched:', photos);
    if (photosError) {
      console.error('Error fetching photos:', photosError);
      throw photosError;
    }

    setClinicData({
      clinicName: basicInfo.clinic_name || '',
      directorName: `${basicInfo.director_last_name || ''} ${basicInfo.director_first_name || ''}`,
      phoneNumber: basicInfo.phone_number || '',
      prefecture: basicInfo.prefecture || '',
      city: basicInfo.city || '',
      address: basicInfo.address || '',
      nearestStation: basicInfo.nearest_station || '',
      walkingTimeFromStation: basicInfo.walking_time_from_station?.toString() || '',
      introduction: basicInfo.clinic_introduction || '',
      clinicUrl: basicInfo.website_url || '',
      photos: {
        director: photos?.director_photo_url || '',
        exterior: photos?.exterior_photo_url || '',
        reception: photos?.reception_photo_url || '',
        unit: photos?.unit_photo_url || '',
      },
    });
    console.log('Clinic data set:', clinicData);
  } catch (error) {
    console.error('Error in fetchClinicData:', error);
    showSnackbar('プロフィールデータの取得に失敗しました', 'error');
  } finally {
    setIsLoading(false);
  }
};

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setClinicData(prevData => ({...prevData, [name]: value}));
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      const supabase = getSupabase();
      const { error: updateError } = await supabase
        .from('clinic_basic_info')
        .update({
          clinic_name: clinicData.clinicName,
          phone_number: clinicData.phoneNumber,
          prefecture: clinicData.prefecture,
          city: clinicData.city,
          address: clinicData.address,
          nearest_station: clinicData.nearestStation,
          walking_time_from_station: parseInt(clinicData.walkingTimeFromStation) || null,
          clinic_introduction: clinicData.introduction,
          website_url: clinicData.clinicUrl,
        })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      showSnackbar('プロフィールが更新されました', 'success');
    } catch (error) {
      console.error('Error updating profile:', error);
      showSnackbar('プロフィールの更新に失敗しました', 'error');
    }
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
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

  const handleFileChange = (photoType: keyof typeof fileInputRefs) => async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && user) {
      try {
        const supabase = getSupabase();
        const fileExt = file.name.split('.').pop();
        const fileName = `${photoType}_${Date.now()}.${fileExt}`;
        const { data, error } = await supabase.storage
          .from('clinic-photos')
          .upload(`${user.id}/${fileName}`, file);

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
          .from('clinic-photos')
          .getPublicUrl(`${user.id}/${fileName}`);

        await supabase
          .from('clinic_photos')
          .upsert({ user_id: user.id, [`${photoType}_photo_url`]: publicUrl }, { onConflict: 'user_id' });

        setClinicData(prevData => ({
          ...prevData,
          photos: { ...prevData.photos, [photoType]: publicUrl }
        }));

        showSnackbar('写真がアップロードされました', 'success');
      } catch (error) {
        console.error('Error uploading photo:', error);
        showSnackbar('写真のアップロードに失敗しました', 'error');
      }
    }
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
        image={clinicData.photos[photoType] || '/images/profile-sample/no-image-profile-photo.svg'}
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

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }
  
  if (!clinicData.clinicName) {
    return <Typography>No data available</Typography>;
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
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}