import React, { useState } from 'react';
import {
  Typography,
  Button,
  Grid,
  Box,
  FormControlLabel,
  Checkbox,
  Container,
  Paper,
  styled,
  TextField,
  IconButton,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Popover,
  Chip
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Iconify } from '@/components/iconify';
import dayjs from 'dayjs';

const StyledAddButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(1, 2),
  border: `1px dashed ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledResponsibilityChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid #637381`,
  color: '#637381',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
  },
  '& .MuiChip-deleteIcon': {
    color: '#637381',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));


const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(1),
  fontWeight: 'bold',
}));

const SubSectionTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(2),
  fontWeight: 'bold',
}));

const DescriptionText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const EquipmentItem = styled(Typography)(({ theme }) => ({
  color: '#637381',
  marginBottom: theme.spacing(1),
  fontSize: '0.8rem',
}));

interface PreferencesExperienceFormProps {
  onNext: (data: FormData) => void;
}

type SkillCategory = 'srp' | 'maintenance' | 'dentalCare' | 'assistantSkills' | 'specializedFields';
type EquipmentCategory = 'scrubs' | 'pants' | 'shoes' | 'goggles';

interface WorkExperience {
  hospitalName: string;
  startDate: dayjs.Dayjs | null;
  endDate: dayjs.Dayjs | null;
  responsibilities: string[];
}

interface FormData {
  skills: {
    [K in SkillCategory]: string[];
  };
  equipment: {
    [K in EquipmentCategory]: string[];
  };
  workExperiences: WorkExperience[];
  education: {
    schoolName: string;
    graduationYear: number;
    graduationMonth: number;
  };
}

export const PreferencesExperienceForm: React.FC<PreferencesExperienceFormProps> = ({ onNext }) => {
  const [formData, setFormData] = useState<FormData>({
    skills: {
      srp: [],
      maintenance: [],
      dentalCare: [],
      assistantSkills: [],
      specializedFields: [],
    },
    equipment: {
      scrubs: [],
      pants: [],
      shoes: [],
      goggles: [],
    },
    workExperiences: [
      { hospitalName: '', startDate: null, endDate: null, responsibilities: [] },
    ],
    education: {
      schoolName: '',
      graduationYear: new Date().getFullYear(),
      graduationMonth: new Date().getMonth() + 1,
    },
  });

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [currentExperienceIndex, setCurrentExperienceIndex] = useState<number | null>(null);

  const handleCheckboxChange = (category: 'skills' | 'equipment', subcategory: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [category]: {
        ...prevData[category],
        [subcategory]: checked
          ? [...(prevData[category][subcategory as keyof typeof prevData[typeof category]] || []), value]
          : (prevData[category][subcategory as keyof typeof prevData[typeof category]] as string[]).filter(item => item !== value)
      }
    }));
  };

  const handleWorkExperienceChange = (index: number, field: keyof WorkExperience, value: any) => {
    const newWorkExperiences = [...formData.workExperiences];
    if (field === 'startDate' || field === 'endDate') {
      newWorkExperiences[index] = { ...newWorkExperiences[index], [field]: value ? dayjs(value) : null };
    } else {
      newWorkExperiences[index] = { ...newWorkExperiences[index], [field]: value };
    }
    setFormData({ ...formData, workExperiences: newWorkExperiences });
  };


  const handleAddWorkExperience = () => {
    setFormData({
      ...formData,
      workExperiences: [...formData.workExperiences, { hospitalName: '', startDate: null, endDate: null, responsibilities: [] }],
    });
  };

  const handleEducationChange = (field: keyof FormData['education'], value: any) => {
    setFormData({ ...formData, education: { ...formData.education, [field]: value } });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form Data:', formData);
    onNext(formData);
  };

  const [open, setOpen] = useState(false);

  const handleResponsibilitiesClick = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
  setAnchorEl(event.currentTarget);
  setCurrentExperienceIndex(index);
  setOpen(true);
};

const handleResponsibilitiesClose = () => {
  setAnchorEl(null);
  setCurrentExperienceIndex(null);
  setOpen(false);
};

  const handleResponsibilityToggle = (responsibility: string) => {
    if (currentExperienceIndex !== null) {
      const newWorkExperiences = [...formData.workExperiences];
      const currentResponsibilities = newWorkExperiences[currentExperienceIndex].responsibilities;
      if (currentResponsibilities.includes(responsibility)) {
        newWorkExperiences[currentExperienceIndex].responsibilities = currentResponsibilities.filter(r => r !== responsibility);
      } else {
        newWorkExperiences[currentExperienceIndex].responsibilities = [...currentResponsibilities, responsibility];
      }
      setFormData({ ...formData, workExperiences: newWorkExperiences });
    }
  };

  const handleSkipRegistration = () => {
    // ここにスキップ処理を実装
    console.log('Registration skipped');
    onNext(formData);
  };

  const responsibilities = [
    'リコール、P処(スケーリング、PMTC、TBI）', '専門診療補助(小児、矯正、インプラント、外科、訪問診療)',
    'エアーフロー', 'ホワイトニング', 'ブローピング1点、4点法', 'ブローピング6点法', 'SRP軽度ー中度',
    'SRP中度ー強度', '一般診療補助', 'ナイトガード作成', 'お会計受付業務', '器具洗浄等、片付け、裏仕事'
  ];

  return (
    <StyledPaper elevation={3}>
      <form onSubmit={handleSubmit}>
        <Container maxWidth="md">
          <SectionTitle variant="h5">所有スキル</SectionTitle>
          <DescriptionText variant="body2">
            ※できること、経験したことがある業務・スキルにチェックを入れてください
          </DescriptionText>

          <SubSectionTitle variant="h6">SRP</SubSectionTitle>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <FormControlLabel
                control={<Checkbox onChange={handleCheckboxChange('skills', 'srp')} value="軽度ー中程度" />}
                label="軽度ー中程度"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={<Checkbox onChange={handleCheckboxChange('skills', 'srp')} value="中度ー重度" />}
                label="中度ー重度"
              />
            </Grid>
          </Grid>

          <SubSectionTitle variant="h6">メンテナンス経験</SubSectionTitle>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            {['子供15分', '30分', '45分', '60分'].map((item) => (
              <Grid item xs={6} key={item}>
                <FormControlLabel
                  control={<Checkbox onChange={handleCheckboxChange('skills', 'maintenance')} value={item} />}
                  label={item}
                />
              </Grid>
            ))}
          </Grid>

          <SubSectionTitle variant="h6">歯科保健指導・予防処置</SubSectionTitle>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            {['スケーリング', 'PMTC', 'エアーフロー', 'ブローピング1点、4点法', 'ブローピング6点法', 'ホワイトニング', 'TBI(フッ化物等の説明)'].map((item) => (
              <Grid item xs={6} key={item}>
                <FormControlLabel
                  control={<Checkbox onChange={handleCheckboxChange('skills', 'dentalCare')} value={item} />}
                  label={item}
                />
              </Grid>
            ))}
          </Grid>

          <SubSectionTitle variant="h6">診療補助(任意)</SubSectionTitle>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            {[
              '印象採得', '光合採得', 'アルジネート練和、石膏流し', 'ナイトガード作成', 'ある程度のバキューム等補助操作',
              '外科アシスト', 'TEK作成', 'MFTの指導', 'アタッチメント装着', '口腔内写真撮影、サポート',
              '訪問診療メンテナンス業務', '矯正ワイヤー除去', 'CR、根管治療、義歯、形成印象等の一般診療アシスト'
            ].map((item) => (
              <Grid item xs={6} key={item}>
                <FormControlLabel
                  control={<Checkbox onChange={handleCheckboxChange('skills', 'assistantSkills')} value={item} />}
                  label={item}
                />
              </Grid>
            ))}
          </Grid>

          <SubSectionTitle variant="h6">挑戦したい専門分野</SubSectionTitle>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {['矯正歯科', '訪問歯科', '小児歯科', '口腔外科'].map((item) => (
              <Grid item xs={6} key={item}>
                <FormControlLabel
                  control={<Checkbox onChange={handleCheckboxChange('skills', 'specializedFields')} value={item} />}
                  label={item}
                />
              </Grid>
            ))}
          </Grid>

          <SectionTitle variant="h5">持ち物</SectionTitle>
          <DescriptionText variant="body2">
            ※持っていない場合はチェックを入れないでください
          </DescriptionText>

          <Grid container spacing={2} sx={{ mb: 4 }}>
            {['スクラブ', 'パンツ', 'シューズ', 'ゴーグル'].map((category) => (
              <Grid item xs={3} key={category}>
                <EquipmentItem variant="subtitle1">{category}</EquipmentItem>
                <FormControlLabel
                  control={<Checkbox onChange={handleCheckboxChange('equipment', category.toLowerCase() as EquipmentCategory)} value="白" />}
                  label="白"
                />
                <FormControlLabel
                  control={<Checkbox onChange={handleCheckboxChange('equipment', category.toLowerCase() as EquipmentCategory)} value="黒" />}
                  label="黒"
                />
              </Grid>
            ))}
          </Grid>

          <SectionTitle variant="h5">職務経歴</SectionTitle>
          {formData.workExperiences.map((exp, index) => (
            <Card key={index} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>経歴 {index + 1}</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="病院名"
                      value={exp.hospitalName}
                      onChange={(e) => handleWorkExperienceChange(index, 'hospitalName', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>働いた期間</Typography>
                    <Box display="flex" alignItems="center">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="開始"
                          value={exp.startDate}
                          onChange={(date) => handleWorkExperienceChange(index, 'startDate', date)}
                        />
                      </LocalizationProvider>
                      <Typography sx={{ mx: 2 }}>～</Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="終了"
                          value={exp.endDate}
                          onChange={(date) => handleWorkExperienceChange(index, 'endDate', date)}
                        />
                      </LocalizationProvider>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      startIcon={<Iconify icon="mdi:clipboard-list" />}
                      onClick={(event) => handleResponsibilitiesClick(event, index)}
                      sx={{ mb: 2, color: 'text.primary', borderColor: 'text.primary' }}
                    >
                      担当業務を選択
                    </Button>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {exp.responsibilities.map((resp, respIndex) => (
                        <StyledResponsibilityChip
                          key={respIndex}
                          label={resp}
                          onDelete={() => {
                            const newResponsibilities = exp.responsibilities.filter((_, i) => i !== respIndex);
                            handleWorkExperienceChange(index, 'responsibilities', newResponsibilities);
                          }}
                        />
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 4 }}>
            <StyledAddButton onClick={handleAddWorkExperience}>
              <Iconify icon="mdi:plus" sx={{ mr: 1 }} />
              経歴を追加
            </StyledAddButton>
          </Box>

          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleResponsibilitiesClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            PaperProps={{
              style: { width: '500px', maxWidth: '90vw' },
            }}
          >
            <Box sx={{ p: 2, position: 'relative' }}>
              <Typography variant="h6" sx={{ mb: 2, pr: 4 }}>担当業務</Typography>
              {responsibilities.map((resp) => (
                <FormControlLabel
                  key={resp}
                  control={
                    <Checkbox
                      checked={currentExperienceIndex !== null && formData.workExperiences[currentExperienceIndex].responsibilities.includes(resp)}
                      onChange={() => handleResponsibilityToggle(resp)}
                      sx={{
                        color: '#637381',
                        '&.Mui-checked': {
                          color: (theme) => theme.palette.primary.main,
                        },
                      }}
                    />
                  }
                  label={resp}
                  sx={{ display: 'block', mb: 1 }}
                />
              ))}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleResponsibilitiesClose}
                  sx={{ color: 'white' }}
                >
                  完了
                </Button>
              </Box>
            </Box>
          </Popover>
          <SectionTitle variant="h5">最終学歴</SectionTitle>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="学校名"
                value={formData.education.schoolName}
                onChange={(e) => handleEducationChange('schoolName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel id="graduation-year-label">卒業年</InputLabel>
                <Select
                  labelId="graduation-year-label"
                  value={formData.education.graduationYear}
                  onChange={(e) => handleEducationChange('graduationYear', e.target.value)}
                  label="卒業年"
                >
                  {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                    <MenuItem key={year} value={year}>{year}年</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel id="graduation-month-label">卒業月</InputLabel>
                <Select
                  labelId="graduation-month-label"
                  value={formData.education.graduationMonth}
                  onChange={(e) => handleEducationChange('graduationMonth', e.target.value)}
                  label="卒業月"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <MenuItem key={month} value={month}>{month}月</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 2 }}>
            <Button
              variant="outlined"
              onClick={handleSkipRegistration}
              sx={{
                minWidth: 200,
                height: 56,
                borderRadius: '28px',
              }}
            >
              後で登録する
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                minWidth: 200,
                height: 56,
                borderRadius: '28px',
                color: 'white',
              }}
            >
              次へ
            </Button>
          </Box>
        </Container>
      </form>
    </StyledPaper>
  );
};