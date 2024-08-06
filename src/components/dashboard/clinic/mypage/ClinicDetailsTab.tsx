'use client';

import React, { useState, useEffect } from 'react';
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
  CircularProgress,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useAuthContext } from '@/auth/hooks/use-auth-context';
import { getClinicDetails, updateClinicDetails, ClinicDetailsData } from '@/app/actions/clinic-details';
import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from '@mui/icons-material/Work';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import FaceIcon from '@mui/icons-material/Face';

// 依頼する仕事内容のオプション
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

// 医院で用意できるものの選択肢
const clinicEquipmentOptions = ['スクラブ', 'パンツ', '院内シューズ', 'ゴーグル'];

// スタッフに持参してもらうものの選択肢
const staffEquipmentCategories = ['スクラブ', 'パンツ', '院内シューズ', 'ゴーグル'];

// 身だしなみの選択肢
const appearanceOptions = [
  'ネイルOK',
  '髪型自由',
  'カラコンOK',
  'まつエクOK',
  '喫煙者NG',
  'アクセサリーNG',
  '過度に明るい髪NG',
];

export default function ClinicDetailsTab() {
  const { user } = useAuthContext();
  const { control, handleSubmit, reset } = useForm<ClinicDetailsData>({
    defaultValues: {
      business_hours_start: '',
      business_hours_end: '',
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const theme = useTheme();

  // コンポーネントのマウント時にクリニックの詳細情報を取得
  useEffect(() => {
    async function loadClinicDetails() {
      if (user) {
        setLoading(true);
        const { details, error } = await getClinicDetails(user.id);
        if (error) {
          setError(error);
        } else if (details) {
          reset(details);
        }
        setLoading(false);
      }
    }
    loadClinicDetails();
  }, [user, reset]);

  // フォーム送信時の処理
  const onSubmit = async (data: ClinicDetailsData) => {
    if (user) {
      setLoading(true);
      const { success, error } = await updateClinicDetails(user.id, data);
      setLoading(false);
      if (success) {
        setSnackbar({ open: true, message: '変更が保存されました', severity: 'success' });
      } else {
        setSnackbar({ open: true, message: error || '変更の保存に失敗しました', severity: 'error' });
      }
    }
  };

  // スナックバーを閉じる処理
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // セクションタイトルのコンポーネント
  const SectionTitle = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      {icon}
      <Typography variant="h6" sx={{ ml: 1 }}>
        {title}
      </Typography>
    </Box>
  );

  // ローディング中の表示
  if (loading) {
    return <CircularProgress />;
  }

  // エラー時の表示
  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 医院の詳細情報セクション */}
        <Paper elevation={3} sx={{ p: 4, mb: 4, backgroundColor: theme.palette.background.paper }}>
          <SectionTitle icon={<BusinessIcon color="primary" />} title="医院の詳細情報" />
          <Grid container spacing={3}>
            {/* 在籍スタッフ人数 */}
            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name="staff_count"
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
            {/* ユニット台数 */}
            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name="unit_count"
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
            {/* 1日平均患者数 */}
            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name="average_patients_per_day"
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
            {/* インカム有無 */}
            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name="has_intercom"
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
           {/* 営業時間開始 */}
<Grid item xs={12} sm={6} md={4}>
  <Controller
    name="business_hours_start"
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        fullWidth
        label="営業時間開始"
        type="time"
        InputLabelProps={{ shrink: true }}
        inputProps={{ step: 300 }} // 5分単位
        value={field.value || ''}
        onChange={(e) => field.onChange(e.target.value)}
      />
    )}
  />
</Grid>

{/* 営業時間終了 */}
<Grid item xs={12} sm={6} md={4}>
  <Controller
    name="business_hours_end"
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        fullWidth
        label="営業時間終了"
        type="time"
        InputLabelProps={{ shrink: true }}
        inputProps={{ step: 300 }} // 5分単位
        value={field.value || ''}
        onChange={(e) => field.onChange(e.target.value)}
      />
    )}
  />
</Grid>
            {/* 歯科衛生士のリコール時間枠 */}
            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name="recall_time_slot"
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
          </Grid>
        </Paper>

        <Grid container spacing={4}>
          {/* 依頼する仕事内容セクション */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4, height: '100%', backgroundColor: theme.palette.background.paper }}>
              <SectionTitle icon={<WorkIcon color="primary" />} title="依頼する仕事内容" />
              <Controller
                name="job_details"
                control={control}
                render={({ field }) => (
                  <FormGroup>
                    {requiredSkillsOptions.map((skill) => (
                      <FormControlLabel
                        key={skill}
                        control={
                          <Checkbox
                            checked={field.value?.includes(skill)}
                            onChange={(e) => {
                              const updatedSkills = e.target.checked
                                ? [...(field.value || []), skill]
                                : (field.value || []).filter((s) => s !== skill);
                              field.onChange(updatedSkills);
                            }}
                          />
                        }
                        label={skill}
                        sx={{ mb: 1.5 }}
                      />
                    ))}
                  </FormGroup>
                )}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4, backgroundColor: theme.palette.background.paper }}>
              {/* 医院で用意できるものセクション */}
              <SectionTitle icon={<CheckroomIcon color="primary" />} title="医院で用意できるもの" />
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                ※すべてのサイズを用意できる場合のみチェックを入れてください。
              </Typography>
              <Controller
                name="clinic_equipment"
                control={control}
                render={({ field }) => (
                  <Grid container spacing={2}>
                    {clinicEquipmentOptions.map((item) => (
                      <Grid item xs={6} sm={3} key={item}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={field.value?.includes(item)}
                              onChange={(e) => {
                                const updatedEquipment = e.target.checked
                                  ? [...(field.value || []), item]
                                  : (field.value || []).filter((i) => i !== item);
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

              {/* スタッフに持参してもらうものセクション */}
              <SectionTitle icon={<CheckroomIcon color="primary" />} title="スタッフに持参してもらうもの" />
              <Controller
                name="staff_brings"
                control={control}
                render={({ field }) => (
                  <Grid container spacing={3}>
                    {staffEquipmentCategories.map((category) => (
                      <Grid item xs={12} sm={6} key={category}>
                        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>{category}</Typography>
                        <FormGroup>
                          {['白', category === 'スクラブ' ? '白以外' : '黒'].map((color) => (
                            <FormControlLabel
                              key={`${category}-${color}`}
                              control={
                                <Checkbox
                                  checked={field.value?.includes(`${category}#${color}`)}
                                  onChange={(e) => {
                                    const value = `${category}#${color}`;
                                    const updatedEquipment = e.target.checked
                                      ? [...(field.value || []), value]
                                      : (field.value || []).filter((i) => i !== value);
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

              {/* 身だしなみセクション */}
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
                              checked={field.value?.includes(item)}
                              onChange={(e) => {
                                const updatedAppearance = e.target.checked
                                  ? [...(field.value || []), item]
                                  : (field.value || []).filter((i) => i !== item);
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

       {/* 保存ボタン */}
<Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
  <Button
    type="submit"
    variant="contained"
    color="primary"
    size="large"
    sx={{ 
      minWidth: 160,
      height: 48,
      fontSize: '0.875rem',
      color: 'white',// テキストカラーをホワイトに設定
      '&:hover': {
        boxShadow: theme.shadows[5],
      }
    }}
  >
    変更を保存する
  </Button>
</Box>
      </form>

      {/* スナックバー（通知） */}
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