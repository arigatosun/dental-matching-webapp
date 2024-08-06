
'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Slider,
  Switch,
  FormControlLabel,
  Paper,
  Grid,
  Chip,
  Button,
  TextField,
  IconButton,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const SkillsAndExperienceTab = () => {
  const [hourlyRate, setHourlyRate] = useState<number[]>([1500, 3000]);
  const [equipment, setEquipment] = useState({
    scrubs: false,
    pants: false,
    shoes: false,
  });
  const [skills, setSkills] = useState({
    srp: false,
    scaling: false,
    pmtc: false,
    airflow: false,
    probing: false,
    whitening: false,
  });
  const [experiences, setExperiences] = useState([
    { clinic: '', period: '', responsibilities: '' },
  ]);

  const handleHourlyRateChange = (event: Event, newValue: number | number[]) => {
    setHourlyRate(newValue as number[]);
  };

  const handleEquipmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEquipment({ ...equipment, [event.target.name]: event.target.checked });
  };

  const handleSkillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSkills({ ...skills, [event.target.name]: event.target.checked });
  };

  const handleExperienceChange = (index: number, field: string, value: string) => {
    const newExperiences = [...experiences];
    newExperiences[index] = { ...newExperiences[index], [field]: value };
    setExperiences(newExperiences);
  };

  const addExperience = () => {
    setExperiences([...experiences, { clinic: '', period: '', responsibilities: '' }]);
  };

  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom>希望時給</Typography>
        <Slider
          value={hourlyRate}
          onChange={handleHourlyRateChange}
          valueLabelDisplay="on"
          min={1000}
          max={5000}
          step={100}
          marks={[
            { value: 1000, label: '1000円' },
            { value: 5000, label: '5000円' },
          ]}
        />
      </Paper>

      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom>持ち物</Typography>
        <Grid container spacing={2}>
          {Object.entries(equipment).map(([key, value]) => (
            <Grid item xs={4} key={key}>
              <FormControlLabel
                control={
                  <Switch
                    checked={value}
                    onChange={handleEquipmentChange}
                    name={key}
                  />
                }
                label={key.charAt(0).toUpperCase() + key.slice(1)}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom>スキル情報</Typography>
        <Grid container spacing={2}>
          {Object.entries(skills).map(([key, value]) => (
            <Grid item xs={6} sm={4} key={key}>
              <FormControlLabel
                control={
                  <Switch
                    checked={value}
                    onChange={handleSkillChange}
                    name={key}
                  />
                }
                label={key.toUpperCase()}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom>職務経歴</Typography>
        {experiences.map((exp, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={5}>
                <TextField
                  fullWidth
                  label="医院名"
                  value={exp.clinic}
                  onChange={(e) => handleExperienceChange(index, 'clinic', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  fullWidth
                  label="期間"
                  value={exp.period}
                  onChange={(e) => handleExperienceChange(index, 'period', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <IconButton onClick={() => removeExperience(index)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="職務内容"
                  multiline
                  rows={2}
                  value={exp.responsibilities}
                  onChange={(e) => handleExperienceChange(index, 'responsibilities', e.target.value)}
                />
              </Grid>
            </Grid>
            {index < experiences.length - 1 && <Divider sx={{ my: 2 }} />}
          </Box>
        ))}
        <Button
          startIcon={<AddIcon />}
          onClick={addExperience}
          variant="outlined"
          sx={{ mt: 2 }}
        >
          経歴を追加
        </Button>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
        <Button variant="contained" color="primary" size="large">
          保存
        </Button>
      </Box>
    </Box>
  );
};

export default SkillsAndExperienceTab;