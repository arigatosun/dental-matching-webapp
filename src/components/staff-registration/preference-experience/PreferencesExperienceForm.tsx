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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Container
} from '@mui/material';

interface PreferencesExperienceFormProps {
  onNext: (data: any) => void;
}

export const PreferencesExperienceForm: React.FC<PreferencesExperienceFormProps> = ({ onNext }) => {
  const [formData, setFormData] = useState({
    desiredProfession: [],
    minHourlyRate: '',
    maxHourlyRate: '',
    desiredWorkLocation: [],
    skills: [],
    auxiliarySkills: [],
    desiredFields: [],
    equipment: [],
    workExperience: [{
      clinicName: '',
      startDate: '',
      endDate: '',
      responsibilities: '',
    }],
    education: {
      schoolName: '',
      graduationDate: '',
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name as string]: value
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: checked
        ? [...prevData[name as keyof typeof formData] as string[], value]
        : (prevData[name as keyof typeof formData] as string[]).filter(item => item !== value)
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form Data:', formData);
    onNext(formData);
  };

  return (
    <Container maxWidth="md">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6">希望職種</Typography>
            <FormControlLabel
              control={<Checkbox onChange={handleCheckboxChange} name="desiredProfession" value="歯科衛生士" />}
              label="歯科衛生士"
            />
            <FormControlLabel
              control={<Checkbox onChange={handleCheckboxChange} name="desiredProfession" value="歯科助手" />}
              label="歯科助手"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="希望時給（最小）"
              name="minHourlyRate"
              type="number"
              value={formData.minHourlyRate}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="希望時給（最大）"
              name="maxHourlyRate"
              type="number"
              value={formData.maxHourlyRate}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">スキル</Typography>
            <FormControlLabel
              control={<Checkbox onChange={handleCheckboxChange} name="skills" value="PMTC" />}
              label="PMTC"
            />
            <FormControlLabel
              control={<Checkbox onChange={handleCheckboxChange} name="skills" value="SRP" />}
              label="SRP"
            />
            {/* 他のスキルも同様に追加 */}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">職歴</Typography>
            <TextField
              fullWidth
              label="医院名"
              name="workExperience[0].clinicName"
              value={formData.workExperience[0].clinicName}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="開始日"
              name="workExperience[0].startDate"
              type="date"
              value={formData.workExperience[0].startDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              margin="normal"
            />
            <TextField
              fullWidth
              label="終了日"
              name="workExperience[0].endDate"
              type="date"
              value={formData.workExperience[0].endDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              margin="normal"
            />
            <TextField
              fullWidth
              label="担当業務"
              name="workExperience[0].responsibilities"
              value={formData.workExperience[0].responsibilities}
              onChange={handleChange}
              multiline
              rows={4}
              margin="normal"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">学歴</Typography>
            <TextField
              fullWidth
              label="学校名"
              name="education.schoolName"
              value={formData.education.schoolName}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="卒業年月"
              name="education.graduationDate"
              type="date"
              value={formData.education.graduationDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              margin="normal"
            />
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button variant="outlined">
            戻る
          </Button>
          <Button type="submit" variant="contained" color="primary">
            次へ
          </Button>
        </Box>
      </form>
    </Container>
  );
};