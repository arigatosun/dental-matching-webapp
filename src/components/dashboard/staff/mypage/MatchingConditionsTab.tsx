'use client';

import React, { useState } from 'react';
import {
  Typography,
  Box,
  Paper,
  Grid,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  styled,
  Divider,
  Slider,
  FormControl,
  FormGroup,
  Alert,
} from '@mui/material';
import { Work, MonetizationOn, Build, Person } from '@mui/icons-material';
import { Iconify } from '@/components/iconify';

const SectionTitle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  fontWeight: 'bold',
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  marginRight: theme.spacing(3),
  marginBottom: theme.spacing(1),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: 'white',
  backgroundColor: '#F8A1A7',
  '&:hover': {
    backgroundColor: '#F47A82',
  },
}));

export default function MatchingConditionsPage() {
  const [experienceYears, setExperienceYears] = useState('1年未満');
  const [minHourlyRate, setMinHourlyRate] = useState(2500);
  const [maxHourlyRate, setMaxHourlyRate] = useState(3500);
  const [equipment, setEquipment] = useState<string[]>([]);
  const [desiredProfessions, setDesiredProfessions] = useState<string[]>([]);

  const experienceOptions = [
    '1年未満', '1年以上', '2年以上', '3年以上', '4年以上',
    '5年以上', '6~10年', '11年~15年', '16年以上'
  ];

  const equipmentOptions = {
    スクラブ: ['白', '白以外'],
    パンツ: ['白', '黒'],
    院内シューズ: ['白', '黒'],
    ゴーグル: ['白', '黒'],
  };

  const professionOptions = ['歯科衛生士', '歯科技工士', '歯科助手', '歯科学生'];

  const handleEquipmentChange = (item: string) => {
    setEquipment(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleProfessionChange = (item: string) => {
    setDesiredProfessions(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setMinHourlyRate(newValue[0]);
      setMaxHourlyRate(newValue[1]);
    }
  };

  const handleSaveChanges = () => {
    // ここでSupabaseに保存する処理を実装予定
    console.log('Changes saved:', { experienceYears, minHourlyRate, maxHourlyRate, equipment, desiredProfessions });
  };

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <StyledPaper elevation={3}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <SectionTitle variant="h6">
              <Person /> 希望職種
            </SectionTitle>
            <FormControl component="fieldset" fullWidth>
              <FormGroup row>
                {professionOptions.map((profession) => (
                  <StyledFormControlLabel
                    key={profession}
                    control={
                      <Checkbox
                        checked={desiredProfessions.includes(profession)}
                        onChange={() => handleProfessionChange(profession)}
                      />
                    }
                    label={profession}
                  />
                ))}
              </FormGroup>
            </FormControl>

            <SectionTitle variant="h6" sx={{ mt: 8 }}>
              <Work /> 経験年数
            </SectionTitle>
            <Select
              value={experienceYears}
              onChange={(e) => setExperienceYears(e.target.value as string)}
              sx={{ width: '50%' }}
            >
              {experienceOptions.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>

            <SectionTitle variant="h6" sx={{ mt: 8 }}>
  <MonetizationOn /> 希望時給
</SectionTitle>
<FormControl component="fieldset" fullWidth>
  <Alert 
    severity="info" 
    icon={<Iconify icon="mdi:information" />} 
    sx={{ 
      width: '50%',
      mb: 2,
      '& .MuiAlert-message': { 
        display: 'flex', 
        alignItems: 'center' 
      } 
    }}
  >
    <Typography variant="body2" sx={{ fontWeight: 'normal' }}>
      時給は1500円以上をオススメしています!
    </Typography>
  </Alert>
  <Box sx={{ width: '80%', mt: 4, mb: 3 }}>
    <Slider
      value={[minHourlyRate, maxHourlyRate]}
      onChange={handleSliderChange}
      valueLabelDisplay="on"
      min={1000}
      max={5000}
      step={100}
      marks={[
        { value: 1000, label: '¥1000' },
        { value: 5000, label: '¥5000' },
      ]}
      valueLabelFormat={(value) => `${value}円`}
      sx={{
        '& .MuiSlider-rail': {
          height: 8,
          backgroundColor: '#0051A2',
        },
        '& .MuiSlider-track': {
          height: 8,
          backgroundColor: '#0051A2',
        },
        '& .MuiSlider-thumb': {
          width: 24,
          height: 24,
          backgroundColor: '#0051A2',
          '&:hover, &.Mui-focusVisible': {
            boxShadow: '0px 0px 0px 8px rgba(0, 81, 162, 0.16)',
          },
        },
        '& .MuiSlider-valueLabel': {
          backgroundColor: '#0051A2',
          color: 'white',
          fontSize: '0.875rem',
          padding: '2px 6px',
          '&:before': {
            borderBottom: '6px solid #0051A2',
          },
        },
        '& .MuiSlider-mark': {
          backgroundColor: '#0051A2',
        },
      }}
    />
  </Box>
  <Box sx={{ width: '80%', display: 'flex', justifyContent: 'center' }}>
    <Typography variant="body2" color="text.secondary">
      スライダーを動かして希望時給の範囲を設定してください
    </Typography>
  </Box>
</FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <SectionTitle variant="h6">
              <Build /> 持ち物
            </SectionTitle>
            {Object.entries(equipmentOptions).map(([category, options]) => (
              <Box key={category} sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>{category}</Typography>
                {options.map((option) => (
                  <StyledFormControlLabel
                    key={`${category}-${option}`}
                    control={
                      <Checkbox
                        checked={equipment.includes(`${category}-${option}`)}
                        onChange={() => handleEquipmentChange(`${category}-${option}`)}
                      />
                    }
                    label={option}
                  />
                ))}
                <Divider sx={{ mt: 1 }} />
              </Box>
            ))}
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSaveChanges}
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
      </StyledPaper>
    </Box>
  );
}