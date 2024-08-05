import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Paper,
  styled,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Slider,
  Checkbox,
  FormGroup,
  Alert,
} from '@mui/material';
import { Iconify } from '@/components/iconify';
import { getSupabase } from '@/utils/supabase-client';
import { getDevelopmentUser } from '@/utils/auth-helper';

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(0),
  fontWeight: 'bold',
}));

interface BasicInfoFormProps {
  onNext: (data: any) => void;
}

export const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ onNext }) => {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    lastNameKana: '',
    firstNameKana: '',
    nickname: '',
    phoneNumber1: '',
    phoneNumber2: '',
    phoneNumber3: '',
    postalCode: '',
    prefecture: '',
    city: '',
    address: '',
    buildingName: '',
    nearestStation: '',
    maritalStatus: '',
    spouseDependency: '',
    desiredProfessions: [] as string[],
    minHourlyRate: 2500,
    maxHourlyRate: 3500,
    desiredWorkLocation: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFormData(prevData => ({
      ...prevData,
      desiredProfessions: checked
        ? [...prevData.desiredProfessions, name]
        : prevData.desiredProfessions.filter(prof => prof !== name)
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const user = await getDevelopmentUser('staff', {
        email: 'dev-staff-user6@example.com',
        password: 'devpassword'
      });
      if (!user) {
        throw new Error('User not found');
      }

      const supabase = getSupabase();

      // dental_staff テーブルにデータを挿入
      const { data: dentalStaffData, error: dentalStaffError } = await supabase
        .from('dental_staff')
        .upsert({
          user_id: user.id,
          last_name: formData.lastName,
          first_name: formData.firstName,
          last_name_kana: formData.lastNameKana,
          first_name_kana: formData.firstNameKana,
          nickname: formData.nickname,
          phone_number: `${formData.phoneNumber1}-${formData.phoneNumber2}-${formData.phoneNumber3}`,
          postal_code: formData.postalCode,
          prefecture: formData.prefecture,
          city: formData.city,
          address: formData.address,
          building_name: formData.buildingName,
          nearest_station: formData.nearestStation,
          marital_status: formData.maritalStatus === 'yes',
          spouse_dependency: formData.spouseDependency === 'yes',
        })
        .select();

      if (dentalStaffError) throw dentalStaffError;

      // staff_preferences テーブルにデータを挿入
      const { data: staffPreferencesData, error: staffPreferencesError } = await supabase
        .from('staff_preferences')
        .upsert({
          user_id: user.id,
          desired_profession: formData.desiredProfessions,
          min_hourly_rate: formData.minHourlyRate,
          max_hourly_rate: formData.maxHourlyRate,
          desired_work_location: formData.desiredWorkLocation,
        })
        .select();

      if (staffPreferencesError) throw staffPreferencesError;

      console.log('Form Data saved successfully:', { dentalStaffData, staffPreferencesData });
      onNext(formData);
    } catch (error) {
      console.error('Error saving form data:', error);
      // ここでエラーメッセージをユーザーに表示する処理を追加
    }
  };

  const handlePostalCodeSearch = async () => {
    try {
      const response = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${formData.postalCode}`);
      const data = await response.json();
      if (data.results) {
        const { address1, address2, address3 } = data.results[0];
        setFormData(prevData => ({
          ...prevData,
          prefecture: address1,
          city: `${address2}${address3}`,
          address: '',
        }));
      }
    } catch (error) {
      console.error('郵便番号検索に失敗しました:', error);
    }
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setFormData(prevData => ({
      ...prevData,
      minHourlyRate: Array.isArray(newValue) ? newValue[0] : 2500,
      maxHourlyRate: Array.isArray(newValue) ? newValue[1] : 3500,
    }));
  };

  return (
    <StyledPaper elevation={3}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SectionTitle variant="h6">氏名</SectionTitle>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="姓"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="名"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="姓（カナ）"
              name="lastNameKana"
              value={formData.lastNameKana}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="名（カナ）"
              name="firstNameKana"
              value={formData.firstNameKana}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="ニックネーム"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <SectionTitle variant="h6" sx={{ mb: 2 }}>
              電話番号
              <Typography
                component="span"
                variant="body2"
                sx={{
                  ml: 1,
                  color: 'text.secondary',
                  fontWeight: 'normal'
                }}
              >
                (半角数字で入力してください)
              </Typography>
            </SectionTitle>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={2}>
                <TextField
                  fullWidth
                  name="phoneNumber1"
                  value={formData.phoneNumber1}
                  onChange={handleChange}
                  inputProps={{ maxLength: 3, inputMode: 'numeric', pattern: '[0-9]*' }}
                  required
                />
              </Grid>
              <Grid item xs="auto" sx={{ px: 0.5 }}>
                -
              </Grid>
              <Grid item xs={2}>
                <TextField
                  fullWidth
                  name="phoneNumber2"
                  value={formData.phoneNumber2}
                  onChange={handleChange}
                  inputProps={{ maxLength: 4, inputMode: 'numeric', pattern: '[0-9]*' }}
                  required
                />
              </Grid>
              <Grid item xs="auto" sx={{ px: 0.5 }}>
                -
              </Grid>
              <Grid item xs={2}>
                <TextField
                  fullWidth
                  name="phoneNumber3"
                  value={formData.phoneNumber3}
                  onChange={handleChange}
                  inputProps={{ maxLength: 4, inputMode: 'numeric', pattern: '[0-9]*' }}
                  required
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <SectionTitle variant="h6">住所情報</SectionTitle>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="郵便番号"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handlePostalCodeSearch}
              sx={{
                height: '56px',
                borderRadius: '28px',
                minWidth: '100px',
                px: 2,
              }}
            >
              <Iconify icon="mdi:magnify" width={24} sx={{ mr: 1 }} />
              検索
            </Button>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="都道府県"
              name="prefecture"
              value={formData.prefecture}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="市区町村"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="番地"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="建物名・部屋番号"
              name="buildingName"
              value={formData.buildingName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="最寄り駅"
              name="nearestStation"
              value={formData.nearestStation}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <SectionTitle variant="h6">配偶者情報</SectionTitle>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={0} alignItems="flex-start">
              <Grid item xs={12} sm={6} sx={{ pr: { sm: 1 } }}>
                <FormControl component="fieldset" sx={{ width: '100%' }}>
                  <FormLabel component="legend" sx={{ mb: 0.5 }}>配偶者の有無</FormLabel>
                  <RadioGroup
                    row
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleChange}
                  >
                    <FormControlLabel value="yes" control={<Radio size="small" />} label="有り" />
                    <FormControlLabel value="no" control={<Radio size="small" />} label="無し" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ pl: { sm: 1 }, mt: { xs: 1, sm: 0 } }}>
                <FormControl component="fieldset" sx={{ width: '100%' }}>
                  <FormLabel component="legend" sx={{ mb: 0.5 }}>配偶者の扶養義務</FormLabel>
                  <RadioGroup
                    row
                    name="spouseDependency"
                    value={formData.spouseDependency}
                    onChange={handleChange}
                  >
                    <FormControlLabel value="yes" control={<Radio size="small" />} label="有り" />
                    <FormControlLabel value="no" control={<Radio size="small" />} label="無し" />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <SectionTitle variant="h6" sx={{ mb: 2 }}>希望条件</SectionTitle>
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset" fullWidth>
              <Typography component="legend" sx={{ mb: 1 }}>希望職種（複数選択可）</Typography>
              <FormGroup row>
                {['歯科衛生士', '歯科助手', '歯科技工士', '歯科学生'].map((profession) => (
                  <FormControlLabel
                    key={profession}
                    control={
                      <Checkbox
                        checked={formData.desiredProfessions.includes(profession)}
                        onChange={handleCheckboxChange}
                        name={profession}
                      />
                    }
                    label={profession}
                    sx={{
                      flexGrow: 1,
                      flexBasis: '22%',
                      marginRight: 0,
                      '& .MuiFormControlLabel-label': {
                        fontSize: '0.9rem',
                        whiteSpace: 'nowrap'
                      }
                    }}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{ mt: 4, mb: 4 }}>
  <FormControl component="fieldset" fullWidth>
    <Typography component="legend" sx={{ mb: 1 }}>希望時給</Typography>
    <Alert 
      severity="info" 
      icon={<Iconify icon="mdi:information" />} 
      sx={{ 
        width: '100%', 
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
    <Box sx={{ width: '80%', mx: 'auto', mt: 2, mb: 1 }}>
      <Slider
        value={[formData.minHourlyRate, formData.maxHourlyRate]}
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
      />
    </Box>
    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
      スライダーを動かして希望時給の範囲を設定してください
    </Typography>
  </FormControl>
</Grid>
          <Grid item xs={12} sx={{ mt: 2, mb: 3 }}>
            <FormLabel component="legend">希望勤務地</FormLabel>
            <TextField
              fullWidth
              name="desiredWorkLocation"
              value={formData.desiredWorkLocation}
              onChange={handleChange}
              placeholder="○○県○○市○○町"
              sx={{ mt: 1 }}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{ minWidth: '200px', color: 'white' }}
              >
                次へ
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </StyledPaper>
  );
};