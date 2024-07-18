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
  Select,
  MenuItem,
  SelectChangeEvent,
  Paper,
} from '@mui/material';

interface FormData {
  desiredProfession: string;
  hourlyRateMin: string;
  hourlyRateMax: string;
  recruitmentStartDate: string;
  recruitmentEndDate: string;
  workDays: string[];
  requiredSkills: string[];
  workStartTime: string;
  workEndTime: string;
  experienceYears: string;
}

interface MatchingConditionsFormProps {
  handleNext: () => void;
  handleBack: () => void;
}

export function MatchingConditionsForm({ handleNext, handleBack }: MatchingConditionsFormProps) {
  const [formData, setFormData] = useState<FormData>({
    desiredProfession: '',
    hourlyRateMin: '',
    hourlyRateMax: '',
    recruitmentStartDate: '',
    recruitmentEndDate: '',
    workDays: [],
    requiredSkills: [],
    workStartTime: '',
    workEndTime: '',
    experienceYears: '',
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: checked
        ? [...prevState[name as keyof FormData] as string[], value]
        : (prevState[name as keyof FormData] as string[]).filter((item: string) => item !== value)
    }));
  };

  const requiredSkillsOptions = [
    'リコール、P処(スケーリング、PMTC、TBI（フッ化物等の説明））',
    'エアーフロー',
    'ホワイトニング',
    'プロービング1点、4点法',
    'プロービング6点法',
    'SRP軽度ー中度',
    'SRP中度ー強度',
    '一般診療補助',
    '専門診療補助(小児、矯正、インプラント、外科、訪問診療)',
    'ナイトガード作成',
    'お会計受付業務',
    '器具洗浄等、片付け、裏仕事',
  ];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    handleNext(); // フォーム送信後に次へ進む
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>希望職種</Typography>
            <FormControl component="fieldset" fullWidth>
              <RadioGroup
                aria-label="desired-profession"
                name="desiredProfession"
                value={formData.desiredProfession}
                onChange={handleChange}
                row
              >
                <FormControlLabel value="歯科衛生士" control={<Radio />} label="歯科衛生士" sx={{ flex: 1 }} />
                <FormControlLabel value="歯科技工士" control={<Radio />} label="歯科技工士" sx={{ flex: 1 }} />
                <FormControlLabel value="歯科助手" control={<Radio />} label="歯科助手" sx={{ flex: 1 }} />
                <FormControlLabel value="歯科学生" control={<Radio />} label="歯科学生" sx={{ flex: 1 }} />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>時給</Typography>
            <Box display="flex" alignItems="center" gap={2}>
              <TextField
                name="hourlyRateMin"
                label="最小"
                type="number"
                value={formData.hourlyRateMin}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <Typography>¥</Typography>,
                }}
                sx={{ width: '45%' }}
              />
              <Typography>〜</Typography>
              <TextField
                name="hourlyRateMax"
                label="最大"
                type="number"
                value={formData.hourlyRateMax}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <Typography>¥</Typography>,
                }}
                sx={{ width: '45%' }}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>募集期間</Typography>
            <Box display="flex" alignItems="center" gap={2}>
              <TextField
                name="recruitmentStartDate"
                label="開始日"
                type="date"
                value={formData.recruitmentStartDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                sx={{ width: '45%' }}
              />
              <Typography>〜</Typography>
              <TextField
                name="recruitmentEndDate"
                label="終了日"
                type="date"
                value={formData.recruitmentEndDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                sx={{ width: '45%' }}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>募集曜日</Typography>
            <FormGroup row>
              {['月曜', '火曜', '水曜', '木曜', '金曜', '土曜', '日曜'].map((day) => (
                <FormControlLabel
                  key={day}
                  control={
                    <Checkbox
                      checked={formData.workDays.includes(day)}
                      onChange={handleCheckboxChange}
                      name="workDays"
                      value={day}
                    />
                  }
                  label={day}
                  sx={{ flex: 1, my: 1 }}
                />
              ))}
            </FormGroup>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>勤務時間</Typography>
            <Box display="flex" alignItems="center" gap={2}>
              <TextField
                name="workStartTime"
                label="開始時間"
                type="time"
                value={formData.workStartTime}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                sx={{ width: '45%' }}
              />
              <Typography>〜</Typography>
              <TextField
                name="workEndTime"
                label="終了時間"
                type="time"
                value={formData.workEndTime}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                sx={{ width: '45%' }}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>経験年数</Typography>
            <FormControl sx={{ width: '45%' }}>
              <Select
                name="experienceYears"
                value={formData.experienceYears}
                onChange={handleChange}
              >
                <MenuItem value="1年未満">1年未満</MenuItem>
                <MenuItem value="1年以上">1年以上</MenuItem>
                <MenuItem value="2年以上">2年以上</MenuItem>
                <MenuItem value="3年以上">3年以上</MenuItem>
                <MenuItem value="4年以上">4年以上</MenuItem>
                <MenuItem value="5年以上">5年以上</MenuItem>
                <MenuItem value="6～10年">6～10年</MenuItem>
                <MenuItem value="10～15年">10～15年</MenuItem>
                <MenuItem value="16年以上">16年以上</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>求めるスキル</Typography>
            <FormGroup>
              {requiredSkillsOptions.map((skill) => (
                <FormControlLabel
                  key={skill}
                  control={
                    <Checkbox
                      checked={formData.requiredSkills.includes(skill)}
                      onChange={handleCheckboxChange}
                      name="requiredSkills"
                      value={skill}
                    />
                  }
                  label={skill}
                  sx={{ my: 1 }}
                />
              ))}
            </FormGroup>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
              <Button
                onClick={handleBack}
                variant="outlined"
                size="large"
                sx={{ minWidth: 200 }}
              >
                戻る
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{ minWidth: 200, color: 'white' }}
              >
                次へ
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}