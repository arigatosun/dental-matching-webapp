'use client';
import React, { useState } from 'react';
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
  Divider,
  Snackbar,
  Alert,
  useTheme,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from '@mui/icons-material/Work';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import FaceIcon from '@mui/icons-material/Face';

// 型定義
interface ClinicDetails {
  staffCount: string;
  unitCount: string;
  averagePatientsPerDay: string;
  hasIntercom: string;
  businessHoursStart: string;
  businessHoursEnd: string;
  recallTimeSlot: string;
  requiredSkills: string[];
  clinicEquipment: string[];
  staffEquipment: string[];
  appearance: string[];
  arrivalLocation: string;
  arrivalTime: string;
}

const initialClinicDetails: ClinicDetails = {
  staffCount: '',
  unitCount: '',
  averagePatientsPerDay: '',
  hasIntercom: '',
  businessHoursStart: '',
  businessHoursEnd: '',
  recallTimeSlot: '',
  requiredSkills: [],
  clinicEquipment: [],
  staffEquipment: [],
  appearance: [],
  arrivalLocation: '',
  arrivalTime: '',
};

const requiredSkillsOptions = [
  'リコール、P処(スケーリング、PMTC、TBI（フッ化物等の説明））',
  'エアーフロー',
  'ホワイトニング',
  'ブローピング1点、4点法',
  'ブローピング6点法',
  'SRP軽度ー中度',
  'SRP中度ー強度',
  '一般診療補助',
  '専門診療補助(小児、矯正、インプラント、外科、訪問診療)',
  'ナイトガード作成',
  'お会計受付業務',
  '器具洗浄等、片付け、裏仕事',
];

const clinicEquipmentOptions = ['スクラブ', 'パンツ', '院内シューズ', 'ゴーグル'];

const staffEquipmentCategories = ['スクラブ', 'パンツ', '院内シューズ', 'ゴーグル'];

const appearanceOptions = [
  'ネイルok',
  '髪型自由',
  'カラコンOK',
  'まつエクOK',
  '喫煙者NG',
  'アクセサリーNG',
  '過度に明るい髪NG',
];

export default function ClinicDetailsTab() {
  const { control, handleSubmit } = useForm<ClinicDetails>({
    defaultValues: initialClinicDetails,
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const theme = useTheme();

  const onSubmit = (data: ClinicDetails) => {
    console.log(data);
    setSnackbar({ open: true, message: '変更を保存しました', severity: 'success' });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const SectionTitle = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      {icon}
      <Typography variant="h6" sx={{ ml: 1 }}>
        {title}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4, backgroundColor: theme.palette.background.paper }}>
        <SectionTitle icon={<BusinessIcon color="primary" />} title="医院の詳細情報" />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="staffCount"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>在籍スタッフ人数</InputLabel>
                  <Select {...field} label="在籍スタッフ人数">
                    <MenuItem value="5人未満">5人未満</MenuItem>
                    <MenuItem value="6人-10人">6人-10人</MenuItem>
                    <MenuItem value="11人-20人">11人-20人</MenuItem>
                    <MenuItem value="21人-30人">21人-30人</MenuItem>
                    <MenuItem value="30人以上">30人以上</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="unitCount"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>ユニット台数</InputLabel>
                  <Select {...field} label="ユニット台数">
                    <MenuItem value="1台">1台</MenuItem>
                    <MenuItem value="2台">2台</MenuItem>
                    <MenuItem value="3台">3台</MenuItem>
                    <MenuItem value="4台">4台</MenuItem>
                    <MenuItem value="5台以上">5台以上</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="averagePatientsPerDay"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>1日平均患者数</InputLabel>
                  <Select {...field} label="1日平均患者数">
                    <MenuItem value="10人未満">10人未満</MenuItem>
                    <MenuItem value="11人-20人">11人-20人</MenuItem>
                    <MenuItem value="21人-30人">21人-30人</MenuItem>
                    <MenuItem value="31人-40人">31人-40人</MenuItem>
                    <MenuItem value="41人-50人">41人-50人</MenuItem>
                    <MenuItem value="50人以上">50人以上</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="hasIntercom"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>インカム有無</InputLabel>
                  <Select {...field} label="インカム有無">
                    <MenuItem value="有り">有り</MenuItem>
                    <MenuItem value="無し">無し</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="businessHoursStart"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="営業時間開始"
                  type="time"
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="businessHoursEnd"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="営業時間終了"
                  type="time"
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="recallTimeSlot"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>歯科衛生士のリコール時間枠</InputLabel>
                  <Select {...field} label="歯科衛生士のリコール時間枠">
                    <MenuItem value="15分">15分</MenuItem>
                    <MenuItem value="30分">30分</MenuItem>
                    <MenuItem value="45分">45分</MenuItem>
                    <MenuItem value="60分">60分</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="arrivalLocation"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="到着場所"
                  placeholder="例: 1階受付前"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="arrivalTime"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>到着時間</InputLabel>
                  <Select {...field} label="到着時間">
                    <MenuItem value="勤務開始の5分前">勤務開始の5分前</MenuItem>
                    <MenuItem value="勤務開始の10分前">勤務開始の10分前</MenuItem>
                    <MenuItem value="勤務開始の15分前">勤務開始の15分前</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, height: '100%', backgroundColor: theme.palette.background.paper }}>
            <SectionTitle icon={<WorkIcon color="primary" />} title="依頼する仕事内容" />
            <Controller
              name="requiredSkills"
              control={control}
              render={({ field }) => (
                <FormGroup>
                  {requiredSkillsOptions.map((skill) => (
                    <FormControlLabel
                      key={skill}
                      control={
                        <Checkbox
                          checked={field.value.includes(skill)}
                          onChange={(e) => {
                            const updatedSkills = e.target.checked
                              ? [...field.value, skill]
                              : field.value.filter((s) => s !== skill);
                            field.onChange(updatedSkills);
                          }}
                        />
                      }
                      label={skill}
                      sx={{ mb: 1.5 }} // 項目間のマージンを増やす
                    />
                  ))}
                </FormGroup>
              )}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, backgroundColor: theme.palette.background.paper }}>
            <SectionTitle icon={<CheckroomIcon color="primary" />} title="医院で用意できるもの" />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              ※すべてのサイズを用意できる場合のみチェックを入れてください。
            </Typography>
            <Controller
              name="clinicEquipment"
              control={control}
              render={({ field }) => (
                <Grid container spacing={2}>
                  {clinicEquipmentOptions.map((item) => (
                    <Grid item xs={6} sm={3} key={item}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={field.value.includes(item)}
                            onChange={(e) => {
                              const updatedEquipment = e.target.checked
                                ? [...field.value, item]
                                : field.value.filter((i) => i !== item);
                              field.onChange(updatedEquipment);
                            }}
                          />
                        }
                        label={item}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
            />

            <Divider sx={{ my: 4 }} />

            <SectionTitle icon={<CheckroomIcon color="primary" />} title="スタッフに持参してもらうもの" />
            <Controller
              name="staffEquipment"
              control={control}
              render={({ field }) => (
                <Grid container spacing={3}>
                  {staffEquipmentCategories.map((category) => (
                    <Grid item xs={12} sm={6} key={category}>
                      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>{category}</Typography>
                      <FormGroup>
                        {['白', category !== 'パンツ' ? '白以外' : '黒'].map((color) => (
                          <FormControlLabel
                            key={`${category}-${color}`}
                            control={
                              <Checkbox
                                checked={field.value.includes(`${category}#${color}`)}
                                onChange={(e) => {
                                  const value = `${category}#${color}`;
                                  const updatedEquipment = e.target.checked
                                    ? [...field.value, value]
                                    : field.value.filter((i) => i !== value);
                                  field.onChange(updatedEquipment);
                                }}
                              />
                            }
                            label={color}
                          />
                        ))}
                      </FormGroup>
                    </Grid>
                  ))}
                </Grid>
              )}
            />

            <Divider sx={{ my: 4 }} />

            <SectionTitle icon={<FaceIcon color="primary" />} title="身だしなみ" />
            <Controller
              name="appearance"
              control={control}
              render={({ field }) => (
                <Grid container spacing={2}>
                  {appearanceOptions.map((item) => (
                    <Grid item xs={6} sm={4} key={item}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={field.value.includes(item)}
                            onChange={(e) => {
                              const updatedAppearance = e.target.checked
                                ? [...field.value, item]
                                : field.value.filter((i) => i !== item);
                              field.onChange(updatedAppearance);
                            }}
                          />
                        }
                        label={item}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
            />
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSubmit(onSubmit)}
          sx={{ 
            py: 1.5, 
            px: 4, 
            borderRadius: 2,
            boxShadow: theme.shadows[3],
            '&:hover': {
              boxShadow: theme.shadows[5],
            }
          }}
        >
          変更を保存する
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}