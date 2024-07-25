import React, { useState, ChangeEvent } from 'react';
import {
  Typography,
  Box,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
  Paper,
  SelectChangeEvent,
} from '@mui/material';

// 型定義
type ClinicDetailsType = {
  staffCount: string;
  unitCount: string;
  averagePatientsPerDay: string;
  hasIntercom: string;
  businessHoursStart: string;
  businessHoursEnd: string;
  recallTimeSlot: string;
};

type RequiredSkillsType = {
  recall: boolean;
  airFlow: boolean;
  whitening: boolean;
  probing: boolean;
  srp: boolean;
  generalAssistance: boolean;
  specializedAssistance: boolean;
  nightGuard: boolean;
  reception: boolean;
  cleaning: boolean;
};

type EquipmentType = {
  scrub: { s: boolean; m: boolean; l: boolean; ll: boolean };
  pants: { s: boolean; m: boolean; l: boolean };
  shoes: { s: boolean; m: boolean; l: boolean };
  goggles: { s: boolean; m: boolean; l: boolean };
};

type AppearanceType = {
  nailOk: boolean;
  freeHairstyle: boolean;
  colorContactsOk: boolean;
  eyelashExtensionsOk: boolean;
};

export default function ClinicDetailsTab() {
  const [clinicDetails, setClinicDetails] = useState<ClinicDetailsType>({
    staffCount: '15人',
    unitCount: '3台',
    averagePatientsPerDay: '50人',
    hasIntercom: 'はい',
    businessHoursStart: '9:00',
    businessHoursEnd: '19:00',
    recallTimeSlot: '45分',
  });

  const [requiredSkills, setRequiredSkills] = useState<RequiredSkillsType>({
    recall: false,
    airFlow: true,
    whitening: true,
    probing: false,
    srp: false,
    generalAssistance: true,
    specializedAssistance: false,
    nightGuard: false,
    reception: false,
    cleaning: false,
  });

  const [equipment, setEquipment] = useState<EquipmentType>({
    scrub: { s: false, m: false, l: false, ll: false },
    pants: { s: false, m: false, l: false },
    shoes: { s: false, m: false, l: false },
    goggles: { s: false, m: false, l: false },
  });

  const [appearance, setAppearance] = useState<AppearanceType>({
    nailOk: false,
    freeHairstyle: false,
    colorContactsOk: false,
    eyelashExtensionsOk: false,
  });

  const handleChange = (event: SelectChangeEvent<string> | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setClinicDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setRequiredSkills(prev => ({ ...prev, [name]: checked }));
  };

  const handleEquipmentChange = (category: keyof EquipmentType, size: string) => (event: ChangeEvent<HTMLInputElement>) => {
    setEquipment(prev => ({
      ...prev,
      [category]: { ...prev[category], [size]: event.target.checked },
    }));
  };

  const handleAppearanceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setAppearance(prev => ({ ...prev, [name]: checked }));
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        医院の詳細情報
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>在籍スタッフ人数</InputLabel>
            <Select
              name="staffCount"
              value={clinicDetails.staffCount}
              onChange={handleChange}
              label="在籍スタッフ人数"
            >
              <MenuItem value="15人">15人</MenuItem>
              {/* 他のオプションも追加 */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>ユニット台数</InputLabel>
            <Select
              name="unitCount"
              value={clinicDetails.unitCount}
              onChange={handleChange}
              label="ユニット台数"
            >
              <MenuItem value="3台">3台</MenuItem>
              {/* 他のオプションも追加 */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>1日平均患者数</InputLabel>
            <Select
              name="averagePatientsPerDay"
              value={clinicDetails.averagePatientsPerDay}
              onChange={handleChange}
              label="1日平均患者数"
            >
              <MenuItem value="50人">50人</MenuItem>
              {/* 他のオプションも追加 */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>インカム有無</InputLabel>
            <Select
              name="hasIntercom"
              value={clinicDetails.hasIntercom}
              onChange={handleChange}
              label="インカム有無"
            >
              <MenuItem value="はい">はい</MenuItem>
              <MenuItem value="いいえ">いいえ</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="営業時間開始"
            type="time"
            name="businessHoursStart"
            value={clinicDetails.businessHoursStart}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="営業時間終了"
            type="time"
            name="businessHoursEnd"
            value={clinicDetails.businessHoursEnd}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        歯科衛生士のリコール時間枠
      </Typography>
      <FormControl fullWidth>
        <InputLabel>時間枠</InputLabel>
        <Select
          name="recallTimeSlot"
          value={clinicDetails.recallTimeSlot}
          onChange={handleChange}
          label="時間枠"
        >
          <MenuItem value="45分">45分</MenuItem>
          {/* 他のオプションも追加 */}
        </Select>
      </FormControl>

      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        依頼する仕事内容
      </Typography>
      <FormGroup>
        <Grid container spacing={2}>
          {Object.entries(requiredSkills).map(([key, value]) => (
            <Grid item xs={12} sm={6} md={4} key={key}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={value}
                    onChange={handleCheckboxChange}
                    name={key}
                  />
                }
                label={key} // 実際のラベルテキストに変更する必要があります
              />
            </Grid>
          ))}
        </Grid>
      </FormGroup>

      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        医院で用意できるもの
      </Typography>
      {Object.entries(equipment).map(([category, sizes]) => (
        <Box key={category} sx={{ mb: 2 }}>
          <Typography variant="subtitle1">{category}</Typography>
          <FormGroup row>
            {Object.entries(sizes).map(([size, checked]) => (
              <FormControlLabel
                key={`${category}-${size}`}
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleEquipmentChange(category as keyof EquipmentType, size)}
                  />
                }
                label={size.toUpperCase()}
              />
            ))}
          </FormGroup>
        </Box>
      ))}

      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        身だしなみ
      </Typography>
      <FormGroup>
        <Grid container spacing={2}>
          {Object.entries(appearance).map(([key, value]) => (
            <Grid item xs={12} sm={6} md={4} key={key}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={value}
                    onChange={handleAppearanceChange}
                    name={key}
                  />
                }
                label={key} // 実際のラベルテキストに変更する必要があります
              />
            </Grid>
          ))}
        </Grid>
      </FormGroup>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary">
          変更を保存する
        </Button>
      </Box>
    </Paper>
  );
}