'use client';

import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
  SelectChangeEvent,
  TextField,
  ListItemText,
  OutlinedInput,
  Select,
  MenuItem,
  Button,
} from '@mui/material';

const professionOptions = ['歯科衛生士', '歯科技工士', '歯科助手', '歯科学生'];

const skillOptions: Record<string, string[]> = {
  SRP: ['SRP軽度ー中程度', 'SRP中度ー重度'],
  メンテナンス経験: ['メンテナンス-子供15分', 'メンテナンス-30分', 'メンテナンス-45分', 'メンテナンス-60分'],
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
  '選択してください',
  '1年未満', '1年以上', '2年以上', '3年以上', '4年以上',
  '5年以上', '6~10年', '11年~15年', '16年以上',
];

const skillMapping: { [key: string]: string } = {
  'SRP軽度ー中程度': 'srp_light_moderate',
  'SRP中度ー重度': 'srp_moderate_severe',
  'メンテナンス-子供15分': 'maintenance_child_15min',
  'メンテナンス-30分': 'maintenance_30min',
  'メンテナンス-45分': 'maintenance_45min',
  'メンテナンス-60分': 'maintenance_60min',
  'スケーリング': 'scaling',
  'PMTC': 'pmtc',
  'エアーフロー': 'air_flow',
  'ブローピング1点、4点法': 'probing_1_4_points',
  'ブローピング6点法': 'probing_6_points',
  'ホワイトニング': 'whitening',
  'TBI(フッ化物等の説明)': 'tbi',
  '印象採得': 'impression_taking',
  '光合採得': 'optical_impression',
  'アルジネート練和、石膏流し': 'alginate_stone_casting',
  'ナイトガード作成': 'night_guard_creation',
  'ある程度のバキューム等補助操作': 'vacuum_operation',
  '外科アシスト': 'surgical_assist',
  'TEK作成': 'tek_creation',
  'MFTの指導': 'mft_instruction',
  'アタッチメント装着': 'attachment_placement',
  '口腔内写真撮影、サポート': 'intraoral_photography',
  '訪問診療メンテナンス業務': 'home_care_maintenance',
  '矯正ワイヤー除去': 'orthodontic_wire_removal',
  'CR、根管治療、義歯、形成印象等の一般診療アシスト': 'general_treatment_assist',
};

interface MatchingFilterProps {
  onFilterChange: (professions: string[], experience: string, skills: string[]) => void;
}

const MatchingFilter: React.FC<MatchingFilterProps> = ({ onFilterChange }) => {
  const [professions, setProfessions] = useState<string[]>([]);
  const [date, setDate] = useState<string>('');
  const [skills, setSkills] = useState<string[]>([]);
  const [experience, setExperience] = useState<string>('選択してください');

  const handleProfessionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setProfessions(prev => 
      checked ? [...prev, value] : prev.filter(item => item !== value)
    );
  };

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]); // 表示用のスキル

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  
  const handleSkillChange = (event: SelectChangeEvent<typeof selectedSkills>) => {
    const {
      target: { value },
    } = event;
    const newSelectedSkills = typeof value === 'string' ? value.split(',') : value;
    setSelectedSkills(newSelectedSkills);
    const mappedSkills = newSelectedSkills.map(skill => skillMapping[skill] || skill);
    setSkills(mappedSkills);
    console.log('Selected skills in MatchingFilter:', mappedSkills);
  };

  const handleExperienceChange = (event: SelectChangeEvent<string>) => {
    setExperience(event.target.value);
  };

  const handleReset = () => {
    setProfessions([]);
    setDate('');
    setSkills([]);
    setSelectedSkills([]); // 表示用のスキルもリセット
    setExperience('選択してください');
  };

  const allSkills = Object.values(skillOptions).flat();

  useEffect(() => {
    console.log('Calling onFilterChange with:', professions, experience, skills);
    onFilterChange(professions, experience, skills);
  }, [professions, experience, skills, onFilterChange]);

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3, position: 'relative', pb: 7 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1" gutterBottom>
            職種
          </Typography>
          <FormControl component="fieldset">
            <FormGroup>
              <Grid container>
                {professionOptions.map((option) => (
                  <Grid item xs={6} key={option}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={professions.includes(option)}
                          onChange={handleProfessionChange}
                          value={option}
                        />
                      }
                      label={option}
                    />
                  </Grid>
                ))}
              </Grid>
            </FormGroup>
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
            value={selectedSkills} // 変更: skills から selectedSkills に
            onChange={handleSkillChange}
            input={<OutlinedInput />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 48 * 4.5 + 8,
                  width: 400,
                  maxWidth: '90vw',
                },
              },
            }}
          >
            {allSkills.map((skill) => (
              <MenuItem key={skill} value={skill}>
                <Checkbox checked={selectedSkills.indexOf(skill) > -1} /> {/* 変更: skills から selectedSkills に */}
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
      
      <Box sx={{ position: 'absolute', bottom: 16, right: 16 }}>
        <Button
          variant="contained"
          onClick={handleReset}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            bgcolor: '#0051A2',
            color: 'white',
            '&:hover': {
              bgcolor: '#003C7E',
            },
          }}
        >
          リセット
        </Button>
      </Box>
    </Paper>
  );
};

export default MatchingFilter;