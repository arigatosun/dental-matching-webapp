'use client';

import React, { useState } from 'react';
import { 
  Typography, 
  TextField, 
  Button, 
  Grid,
  Box,
  FormControlLabel,
  Checkbox,
  Container
} from '@mui/material';

interface BasicInfoFormProps {
  onNext: (data: any) => void;
}

export const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ onNext }) => {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    lastNameKana: '',
    firstNameKana: '',
    nickname: '',
    phoneNumber: '',
    postalCode: '',
    prefecture: '',
    city: '',
    address: '',
    buildingName: '',
    nearestStation: '',
    maritalStatus: false,
    spouseDependency: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form Data:', formData);
    onNext(formData);
  };

  const handlePostalCodeSearch = () => {
    // 郵便番号検索のロジックをここに実装
    console.log('Postal code search');
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" align="center" gutterBottom>
        基本情報を入力してください
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="姓"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="名"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="姓（カナ）"
              name="lastNameKana"
              value={formData.lastNameKana}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="名（カナ）"
              name="firstNameKana"
              value={formData.firstNameKana}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="ニックネーム"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="電話番号"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={9}>
            <TextField
              fullWidth
              label="郵便番号"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button 
              variant="contained" 
              color="primary"
              onClick={handlePostalCodeSearch}
              sx={{ height: '56px', width: '100%' }}
            >
              検索
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="都道府県"
              name="prefecture"
              value={formData.prefecture}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="市区町村"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="番地"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="建物名"
              name="buildingName"
              value={formData.buildingName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="最寄り駅"
              name="nearestStation"
              value={formData.nearestStation}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.maritalStatus}
                  onChange={handleChange}
                  name="maritalStatus"
                />
              }
              label="配偶者あり"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.spouseDependency}
                  onChange={handleChange}
                  name="spouseDependency"
                />
              }
              label="配偶者の扶養に入っている"
            />
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ minWidth: '200px' }}
          >
            次へ
          </Button>
        </Box>
      </form>
    </Container>
  );
};