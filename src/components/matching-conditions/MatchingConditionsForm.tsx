import React, { useState } from 'react';
import {
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
} from '@mui/material';

// フォームデータの型を定義
interface FormData {
  desiredProfession: string;
  hourlyRateMin: string;
  hourlyRateMax: string;
  recruitmentStartDate: string;
  recruitmentEndDate: string;
  workDays: string[];
  workStartTime: string;
  workEndTime: string;
  experienceYears: string;
}

export function MatchingConditionsForm() {
  const [formData, setFormData] = useState<FormData>({
    desiredProfession: '',
    hourlyRateMin: '',
    hourlyRateMax: '',
    recruitmentStartDate: '',
    recruitmentEndDate: '',
    workDays: [],
    workStartTime: '',
    workEndTime: '',
    experienceYears: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox'
        ? checked
          ? [...prevState.workDays, value]
          : prevState.workDays.filter(day => day !== value)
        : value
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    // ここで次のステップに進む処理を実装
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">希望職種</FormLabel>
            <RadioGroup
              aria-label="desired-profession"
              name="desiredProfession"
              value={formData.desiredProfession}
              onChange={handleChange}
            >
              <FormControlLabel value="歯科衛生士" control={<Radio />} label="歯科衛生士" />
              <FormControlLabel value="歯科技工士" control={<Radio />} label="歯科技工士" />
              <FormControlLabel value="歯科助手" control={<Radio />} label="歯科助手" />
              <FormControlLabel value="歯科学生" control={<Radio />} label="歯科学生" />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>時給</Typography>
          <Box display="flex" alignItems="center">
            <TextField
              name="hourlyRateMin"
              label="最小"
              type="number"
              value={formData.hourlyRateMin}
              onChange={handleChange}
              InputProps={{
                startAdornment: <Typography>¥</Typography>,
              }}
            />
            <Typography sx={{ mx: 2 }}>〜</Typography>
            <TextField
              name="hourlyRateMax"
              label="最大"
              type="number"
              value={formData.hourlyRateMax}
              onChange={handleChange}
              InputProps={{
                startAdornment: <Typography>¥</Typography>,
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>募集期間</Typography>
          <Box display="flex" alignItems="center">
            <TextField
              name="recruitmentStartDate"
              label="開始日"
              type="date"
              value={formData.recruitmentStartDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
            <Typography sx={{ mx: 2 }}>〜</Typography>
            <TextField
              name="recruitmentEndDate"
              label="終了日"
              type="date"
              value={formData.recruitmentEndDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">募集曜日</FormLabel>
            <FormGroup row>
              {['月曜', '火曜', '水曜', '木曜', '金曜', '土曜', '日曜'].map((day) => (
                <FormControlLabel
                  key={day}
                  control={
                    <Checkbox
                      checked={formData.workDays.includes(day)}
                      onChange={handleChange}
                      name="workDays"
                      value={day}
                    />
                  }
                  label={day}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>勤務時間</Typography>
          <Box display="flex" alignItems="center">
            <TextField
              name="workStartTime"
              label="開始時間"
              type="time"
              value={formData.workStartTime}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
            <Typography sx={{ mx: 2 }}>〜</Typography>
            <TextField
              name="workEndTime"
              label="終了時間"
              type="time"
              value={formData.workEndTime}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <TextField
            name="experienceYears"
            label="経験年数"
            type="number"
            value={formData.experienceYears}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button type="submit" variant="contained" color="primary" size="large">
              次へ
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}