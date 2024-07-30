'use client';

import React, { useState } from 'react';
import {
  Grid,
  Paper,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  Select,
  MenuItem,
  Checkbox,
  Typography,
  Box,
  SelectChangeEvent,
  TextField,
  ListItemText,
  OutlinedInput,
} from '@mui/material';

const skillOptions: Record<string, string[]> = {
  SRP: ['軽度ー中程度', '中度ー重度'],
  メンテナンス経験: ['子供15分', '30分', '45分', '60分'],
  '歯科保健指導・予防処置': [
    'スケーリング',
    'PMTC',
    'エアーフロー',
    'ブローピング1点、4点法',
    'ブローピング6点法',
    'ホワイトニング',
    'TBI(フッ化物等の説明)',
  ],
  診療補助: [
    '印象採得',
    '光合採得',
    'アルジネート練和、石膏流し',
    'ナイトガード作成',
    'ある程度のバキューム等補助操作',
    '外科アシスト',
    'TEK作成',
    'MFTの指導',
    'アタッチメント装着',
    '口腔内写真撮影、サポート',
    '訪問診療メンテナンス業務',
    '矯正ワイヤー除去',
    'CR、根管治療、義歯、形成印象等の一般診療アシスト',
  ],
};

const experienceOptions: string[] = [
  '1年未満', '1年以上', '2年以上', '3年以上', '4年以上',
  '5年以上', '6~10年', '11年~15年', '16年以上',
];

const MatchingFilter: React.FC = () => {
  const [profession, setProfession] = useState<string>('歯科衛生士');
  const [date, setDate] = useState<string>('');
  const [skills, setSkills] = useState<string[]>([]);
  const [experience, setExperience] = useState<string>('1年以上');

  const handleProfessionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfession(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleSkillChange = (event: SelectChangeEvent<typeof skills>) => {
    const {
      target: { value },
    } = event;
    setSkills(typeof value === 'string' ? value.split(',') : value);
  };

  const handleExperienceChange = (event: SelectChangeEvent<string>) => {
    setExperience(event.target.value);
  };

  // すべてのスキルを1つの配列にフラット化
  const allSkills = Object.values(skillOptions).flat();

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1" gutterBottom>
            職種
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="profession"
              name="profession"
              value={profession}
              onChange={handleProfessionChange}
            >
              <Grid container>
                {['歯科衛生士', '歯科技工士', '歯科助手', '歯科学生'].map((option) => (
                  <Grid item xs={6} key={option}>
                    <FormControlLabel value={option} control={<Radio />} label={option} />
                  </Grid>
                ))}
              </Grid>
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1" gutterBottom>
            勤務日
          </Typography>
          <TextField
            type="date"
            value={date}
            onChange={handleDateChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1" gutterBottom>
            求めるスキル
          </Typography>
          <FormControl fullWidth>
            <Select
              multiple
              value={skills}
              onChange={handleSkillChange}
              input={<OutlinedInput />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 48 * 4.5 + 8,
                    width: 400, // 幅を広げたままにします
                    maxWidth: '90vw', // 画面幅の90%を超えないようにします
                  },
                },
              }}
            >
              {allSkills.map((skill) => (
                <MenuItem key={skill} value={skill}>
                  <Checkbox checked={skills.indexOf(skill) > -1} />
                  <ListItemText primary={skill} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1" gutterBottom>
            経験年数
          </Typography>
          <FormControl fullWidth>
            <Select
              value={experience}
              onChange={handleExperienceChange}
            >
              {experienceOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MatchingFilter;