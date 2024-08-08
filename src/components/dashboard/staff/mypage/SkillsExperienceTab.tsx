'use client';

import React, { useState } from 'react';
import {
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  TextField,
  Card,
  CardContent,
  Chip,
  styled,
  FormControlLabel,
  Checkbox,
  IconButton,
  Popover,
  Select,
  MenuItem,
  Divider,
} from '@mui/material';
import {
  Work,
  School,
  Build,
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

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

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  border: `1px solid #0051A2`,
  backgroundColor: 'transparent',
  color: '#0051A2',
  '&:hover': {
    backgroundColor: 'transparent', // ホバー時も背景色を変えない
    cursor: 'default', // カーソルをデフォルトのままにする
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  position: 'relative',
  '& .MuiCardContent-root': {
    paddingBottom: theme.spacing(2),
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: 'white',
  backgroundColor: '#F8A1A7',
  '&:hover': {
    backgroundColor: '#F47A82', // 若干濃いピンク
  },
}));

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  marginRight: theme.spacing(3),
  marginBottom: theme.spacing(1),
}));

interface WorkExperience {
  id: number;
  hospitalName: string;
  startDate: dayjs.Dayjs | null;
  endDate: dayjs.Dayjs | null;
  responsibilities: string[];
}

interface Skills {
  [key: string]: string[];
}

const responsibilities = [
  'リコール、P処(スケーリング、PMTC、TBI）', '専門診療補助(小児、矯正、インプラント、外科、訪問診療)',
  'エアーフロー', 'ホワイトニング', 'ブローピング1点、4点法', 'ブローピング6点法', 'SRP軽度ー中度',
  'SRP中度ー強度', '一般診療補助', 'ナイトガード作成', 'お会計受付業務', '器具洗浄等、片付け、裏仕事'
];

export default function SkillsExperienceTab() {
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([
    { id: 1, hospitalName: 'サンプル歯科医院', startDate: dayjs('2018-01-01'), endDate: dayjs('2021-12-31'), responsibilities: ['リコール', 'ホワイトニング'] },
  ]);

  const [education, setEducation] = useState({
    schoolName: '歯科衛生士専門学校',
    graduationYear: 2018,
    graduationMonth: 3,
  });

  const [skills, setSkills] = useState<Skills>({
    srp: ['軽度ー中程度'],
    maintenance: ['30分', '45分'],
    dentalCare: ['スケーリング', 'PMTC', 'エアーフロー'],
    assistantSkills: ['印象採得', 'ナイトガード作成'],
    specializedFields: ['矯正歯科'],
  });

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [currentExperienceIndex, setCurrentExperienceIndex] = useState<number | null>(null);

  const handleAddWorkExperience = () => {
    setWorkExperiences([...workExperiences, { id: Date.now(), hospitalName: '', startDate: null, endDate: null, responsibilities: [] }]);
  };

  const handleDeleteWorkExperience = (id: number) => {
    setWorkExperiences(workExperiences.filter(exp => exp.id !== id));
  };

  const handleResponsibilitiesClick = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    setAnchorEl(event.currentTarget);
    setCurrentExperienceIndex(index);
  };

  const handleResponsibilitiesClose = () => {
    setAnchorEl(null);
    setCurrentExperienceIndex(null);
  };

  const handleResponsibilityToggle = (responsibility: string) => {
    if (currentExperienceIndex !== null) {
      const newWorkExperiences = [...workExperiences];
      const currentResponsibilities = newWorkExperiences[currentExperienceIndex].responsibilities;
      if (currentResponsibilities.includes(responsibility)) {
        newWorkExperiences[currentExperienceIndex].responsibilities = currentResponsibilities.filter(r => r !== responsibility);
      } else {
        newWorkExperiences[currentExperienceIndex].responsibilities = [...currentResponsibilities, responsibility];
      }
      setWorkExperiences(newWorkExperiences);
    }
  };

  const handleSkillChange = (category: string, skill: string) => {
    setSkills(prevSkills => {
      const updatedSkills = { ...prevSkills };
      if (updatedSkills[category].includes(skill)) {
        updatedSkills[category] = updatedSkills[category].filter(s => s !== skill);
      } else {
        updatedSkills[category] = [...updatedSkills[category], skill];
      }
      return updatedSkills;
    });
  };

  const handleSaveChanges = () => {
    // ここで変更をsupabaseに保存する処理を実装予定
    console.log('Changes saved:', { workExperiences, education, skills });
  };

  
  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <StyledPaper elevation={3}>
        <SectionTitle variant="h6">
          <Work /> 職務経歴
        </SectionTitle>
        {workExperiences.map((exp, index) => (
          <StyledCard key={exp.id}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="病院名"
                    value={exp.hospitalName}
                    onChange={(e) => {
                      const newExperiences = [...workExperiences];
                      newExperiences[index].hospitalName = e.target.value;
                      setWorkExperiences(newExperiences);
                    }}
                    
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="開始日"
                      value={exp.startDate}
                      onChange={(date) => {
                        const newExperiences = [...workExperiences];
                        newExperiences[index].startDate = date;
                        setWorkExperiences(newExperiences);
                      }}
                      slotProps={{ textField: {  fullWidth: true } }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="終了日"
                      value={exp.endDate}
                      onChange={(date) => {
                        const newExperiences = [...workExperiences];
                        newExperiences[index].endDate = date;
                        setWorkExperiences(newExperiences);
                      }}
                      slotProps={{ textField: {  fullWidth: true } }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">担当業務</Typography>
                  <Box sx={{ minHeight: 40 }}>
                    {exp.responsibilities.map((resp, respIndex) => (
                      <StyledChip
                        key={respIndex}
                        label={resp}
                      />
                    ))}
                  </Box>
                  <StyledButton
  variant="contained"
  onClick={(event) => handleResponsibilitiesClick(event, index)}
  sx={{ mt: 1 }}
>
  担当業務を選択
</StyledButton>
                </Grid>
              </Grid>
              <IconButton
                sx={{ position: 'absolute', bottom: 8, right: 8 }}
                onClick={() => handleDeleteWorkExperience(exp.id)}
              >
                <DeleteIcon />
              </IconButton>
            </CardContent>
          </StyledCard>
        ))}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button
            startIcon={<AddIcon />}
            onClick={handleAddWorkExperience}
            variant="outlined"
          >
            職務経歴を追加
          </Button>
        </Box>
      </StyledPaper>

      <StyledPaper elevation={3}>
        <SectionTitle variant="h6">
          <School /> 最終学歴
        </SectionTitle>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="学校名"
              value={education.schoolName}
              onChange={(e) => setEducation({ ...education, schoolName: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Select
              fullWidth
              value={education.graduationYear}
              onChange={(e) => setEducation({ ...education, graduationYear: Number(e.target.value) })}
            >
              {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                <MenuItem key={year} value={year}>{year}年</MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Select
              fullWidth
              value={education.graduationMonth}
              onChange={(e) => setEducation({ ...education, graduationMonth: Number(e.target.value) })}
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <MenuItem key={month} value={month}>{month}月</MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </StyledPaper>

      <StyledPaper elevation={3}>
        <SectionTitle variant="h6">
          <Build /> スキル
        </SectionTitle>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>SRP</Typography>
            <Box sx={{ mb: 2 }}>
              <StyledFormControlLabel
                control={<Checkbox checked={skills.srp.includes('軽度ー中程度')} onChange={() => handleSkillChange('srp', '軽度ー中程度')} />}
                label="軽度ー中程度"
              />
              <StyledFormControlLabel
                control={<Checkbox checked={skills.srp.includes('中度ー重度')} onChange={() => handleSkillChange('srp', '中度ー重度')} />}
                label="中度ー重度"
              />
            </Box>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>メンテナンス経験</Typography>
            <Box sx={{ mb: 2 }}>
              {['子供15分', '30分', '45分', '60分'].map((item) => (
                <StyledFormControlLabel
                  key={item}
                  control={<Checkbox checked={skills.maintenance.includes(item)} onChange={() => handleSkillChange('maintenance', item)} />}
                  label={item}
                />
              ))}
            </Box>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>歯科保健指導・予防処置</Typography>
            <Box sx={{ mb: 2 }}>
              {['スケーリング', 'PMTC', 'エアーフロー', 'ブローピング1点、4点法', 'ブローピング6点法', 'ホワイトニング', 'TBI(フッ化物等の説明)'].map((item) => (
                <StyledFormControlLabel
                  key={item}
                  control={<Checkbox checked={skills.dentalCare.includes(item)} onChange={() => handleSkillChange('dentalCare', item)} />}
                  label={item}
                />
              ))}
            </Box>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>診療補助(任意)</Typography>
            <Box sx={{ mb: 2 }}>
              {[
                '印象採得', '光合採得', 'アルジネート練和、石膏流し', 'ナイトガード作成', 'ある程度のバキューム等補助操作',
                '外科アシスト', 'TEK作成', 'MFTの指導', 'アタッチメント装着', '口腔内写真撮影、サポート',
                '訪問診療メンテナンス業務', '矯正ワイヤー除去', 'CR、根管治療、義歯、形成印象等の一般診療アシスト'
              ].map((item) => (
                <StyledFormControlLabel
                  key={item}
                  control={<Checkbox checked={skills.assistantSkills.includes(item)} onChange={() => handleSkillChange('assistantSkills', item)} />}
                  label={item}
                />
              ))}
            </Box>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>挑戦したい専門分野</Typography>
            <Box>
              {['矯正歯科', '訪問歯科', '小児歯科', '口腔外科'].map((item) => (
                <StyledFormControlLabel
                  key={item}
                  control={<Checkbox checked={skills.specializedFields.includes(item)} onChange={() => handleSkillChange('specializedFields', item)} />}
                  label={item}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </StyledPaper>



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
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleResponsibilitiesClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2 }}>
          {responsibilities.map((resp) => (
            <FormControlLabel
              key={resp}
              control={
                <Checkbox
                  checked={currentExperienceIndex !== null && workExperiences[currentExperienceIndex].responsibilities.includes(resp)}
                  onChange={() => handleResponsibilityToggle(resp)}
                />
              }
              label={resp}
            />
          ))}
        </Box>
      </Popover>
    </Box>
  );
}