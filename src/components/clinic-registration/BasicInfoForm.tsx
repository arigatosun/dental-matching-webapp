import React from 'react';
import {
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormGroup,
  FormControlLabel,
  SelectChangeEvent,
  Paper,
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { ClinicBasicInfo } from '@/app/register/clinic/page';

interface BasicInfoFormProps {
  formData: ClinicBasicInfo;
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => void;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTimeChange: (field: string, value: dayjs.Dayjs | null) => void;
  handleNext: () => void;
}

export const BasicInfoForm: React.FC<BasicInfoFormProps> = ({
  formData,
  handleChange,
  handleCheckboxChange,
  handleTimeChange,
  handleNext,
}) => {
  const handlePostalCodeSearch = async () => {
    try {
      const response = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${formData.postal_code}`);
      const data = await response.json();
      if (data.results) {
        const address = data.results[0];
        handleChange({ target: { name: 'prefecture', value: address.address1 } } as React.ChangeEvent<HTMLInputElement>);
        handleChange({ target: { name: 'city', value: address.address2 + address.address3 } } as React.ChangeEvent<HTMLInputElement>);
      }
    } catch (error) {
      console.error('郵便番号検索エラー:', error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Container maxWidth="md">
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            歯科医院情報
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="歯科医院名"
                name="clinic_name"
                value={formData.clinic_name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="院長 姓"
                name="director_last_name"
                value={formData.director_last_name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="院長 名"
                name="director_first_name"
                value={formData.director_first_name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="院長 姓（カナ）"
                name="director_last_name_kana"
                value={formData.director_last_name_kana}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="院長 名（カナ）"
                name="director_first_name_kana"
                value={formData.director_first_name_kana}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="医院電話番号"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* 住所情報 */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 3 }}>
                住所情報
              </Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                fullWidth
                label="郵便番号"
                name="postal_code"
                value={formData.postal_code}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handlePostalCodeSearch}
                sx={{
                  height: '56px',
                  borderRadius: '28px',
                  color: 'white',
                  width: { xs: '100%', sm: 'auto' },
                  minWidth: '100px',
                  px: 2,
                }}
              >
                検索
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="都道府県"
                name="prefecture"
                value={formData.prefecture}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
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
                label="建物名"
                name="building_name"
                value={formData.building_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="最寄り駅"
                name="nearest_station"
                value={formData.nearest_station}
                onChange={handleChange}
              />
            </Grid>

            {/* 医院の詳細情報 */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 3 }}>
                医院の詳細情報
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>在籍スタッフ人数</InputLabel>
                <Select
                  name="staff_count"
                  value={formData.staff_count}
                  onChange={handleChange as (event: SelectChangeEvent<string>, child: React.ReactNode) => void}
                >
                  <MenuItem value="5人未満">5人未満</MenuItem>
                  <MenuItem value="6人-10人">6人-10人</MenuItem>
                  <MenuItem value="11人-20人">11人-20人</MenuItem>
                  <MenuItem value="21人-30人">21人-30人</MenuItem>
                  <MenuItem value="30人以上">30人以上</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>ユニット台数</InputLabel>
                <Select
                  name="unit_count"
                  value={formData.unit_count}
                  onChange={handleChange as (event: SelectChangeEvent<string>, child: React.ReactNode) => void}
                >
                  <MenuItem value="1台">1台</MenuItem>
                  <MenuItem value="2台">2台</MenuItem>
                  <MenuItem value="3台">3台</MenuItem>
                  <MenuItem value="4台">4台</MenuItem>
                  <MenuItem value="5台以上">5台以上</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>1日平均患者数</InputLabel>
                <Select
                  name="average_patients_per_day"
                  value={formData.average_patients_per_day}
                  onChange={handleChange as (event: SelectChangeEvent<string>, child: React.ReactNode) => void}
                >
                  <MenuItem value="10人未満">10人未満</MenuItem>
                  <MenuItem value="11人-20人">11人-20人</MenuItem>
                  <MenuItem value="21人-30人">21人-30人</MenuItem>
                  <MenuItem value="31人-40人">31人-40人</MenuItem>
                  <MenuItem value="41人-50人">41人-50人</MenuItem>
                  <MenuItem value="50人以上">50人以上</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>インカム有無</InputLabel>
                <Select
                  name="has_intercom"
                  value={formData.has_intercom}
                  onChange={handleChange as (event: SelectChangeEvent<string>, child: React.ReactNode) => void}
                >
                  <MenuItem value="有り">有り</MenuItem>
                  <MenuItem value="無し">無し</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={5}>
            <TimePicker
                label="営業時間（開始）"
                value={formData.business_hours_start}
                onChange={(newValue) => handleTimeChange('business_hours_start', newValue)}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography>～</Typography>
            </Grid>
            <Grid item xs={12} sm={5}>
              <TimePicker
                label="営業時間（終了）"
                value={formData.business_hours_end}
                onChange={(newValue) => handleTimeChange('business_hours_end', newValue)}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>歯科衛生士のリコール時間枠</InputLabel>
                <Select
                  name="recall_time_slot"
                  value={formData.recall_time_slot}
                  onChange={handleChange as (event: SelectChangeEvent<string>, child: React.ReactNode) => void}
                >
                  <MenuItem value="15分">15分</MenuItem>
                  <MenuItem value="30分">30分</MenuItem>
                  <MenuItem value="45分">45分</MenuItem>
                  <MenuItem value="60分">60分</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="医院自己紹介文"
              name="clinic_introduction"
              value={formData.clinic_introduction}
              onChange={handleChange}
              multiline
              rows={4}
              placeholder="医院の特徴や強みなどを入力してください"
            />
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 3 }}>
                医院で用意できるもの
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                ※すべてのサイズを用意できる場合のみチェックを入れてください。一部のサイズしか用意できない場合は、チェックを入れずに「スタッフに持参してもらうもの」で必要な持ち物を指定してください。
              </Typography>
              <FormGroup row>
  <FormControlLabel 
    control={
      <Checkbox 
        checked={formData.clinic_equipment?.includes('scrubs') ?? false} 
        onChange={handleCheckboxChange} 
        name="clinic_equipment" 
        value="scrubs" 
      />
    } 
    label="スクラブ" 
  />
  <FormControlLabel 
    control={
      <Checkbox 
        checked={formData.clinic_equipment?.includes('pants') ?? false} 
        onChange={handleCheckboxChange} 
        name="clinic_equipment" 
        value="pants" 
      />
    } 
    label="パンツ" 
  />
  <FormControlLabel 
    control={
      <Checkbox 
        checked={formData.clinic_equipment?.includes('shoes') ?? false} 
        onChange={handleCheckboxChange} 
        name="clinic_equipment" 
        value="shoes" 
      />
    } 
    label="院内シューズ" 
  />
  <FormControlLabel 
    control={
      <Checkbox 
        checked={formData.clinic_equipment?.includes('goggles') ?? false} 
        onChange={handleCheckboxChange} 
        name="clinic_equipment" 
        value="goggles" 
      />
    } 
    label="ゴーグル" 
  />
</FormGroup>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 3 }}>
                スタッフに持参してもらうもの
              </Typography>
              <FormGroup row>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="subtitle2">スクラブ</Typography>
                    <FormControlLabel control={<Checkbox checked={formData.staff_brings.includes('scrubs-white')} onChange={handleCheckboxChange} name="staff_brings" value="scrubs-white" />} label="白" />
                    <FormControlLabel control={<Checkbox checked={formData.staff_brings.includes('scrubs-other')} onChange={handleCheckboxChange} name="staff_brings" value="scrubs-other" />} label="白以外" />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="subtitle2">パンツ</Typography>
                    <FormControlLabel control={<Checkbox checked={formData.staff_brings.includes('pants-white')} onChange={handleCheckboxChange} name="staff_brings" value="pants-white" />} label="白" />
                    <FormControlLabel control={<Checkbox checked={formData.staff_brings.includes('pants-black')} onChange={handleCheckboxChange} name="staff_brings" value="pants-black" />} label="黒" />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="subtitle2">院内シューズ</Typography>
                    <FormControlLabel control={<Checkbox checked={formData.staff_brings.includes('shoes-white')} onChange={handleCheckboxChange} name="staff_brings" value="shoes-white" />} label="白" />
                    <FormControlLabel control={<Checkbox checked={formData.staff_brings.includes('shoes-black')} onChange={handleCheckboxChange} name="staff_brings" value="shoes-black" />} label="黒" />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="subtitle2">ゴーグル</Typography>
                    <FormControlLabel control={<Checkbox checked={formData.staff_brings.includes('goggles-white')} onChange={handleCheckboxChange} name="staff_brings" value="goggles-white" />} label="白" />
                    <FormControlLabel control={<Checkbox checked={formData.staff_brings.includes('goggles-black')} onChange={handleCheckboxChange} name="staff_brings" value="goggles-black" />} label="黒" />
                  </Grid>
                </Grid>
              </FormGroup>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 3 }}>
                身だしなみ
              </Typography>
              <FormGroup row>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={4}>
                    <FormControlLabel control={<Checkbox checked={formData.appearance.includes('nailOk')} onChange={handleCheckboxChange} name="appearance" value="nailOk" />} label="ネイルOK" />
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <FormControlLabel control={<Checkbox checked={formData.appearance.includes('freeHairstyle')} onChange={handleCheckboxChange} name="appearance" value="freeHairstyle" />} label="髪型自由" />
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <FormControlLabel control={<Checkbox checked={formData.appearance.includes('colorContactsOk')} onChange={handleCheckboxChange} name="appearance" value="colorContactsOk" />} label="カラコンOK" />
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <FormControlLabel control={<Checkbox checked={formData.appearance.includes('eyelashExtensionsOk')} onChange={handleCheckboxChange} name="appearance" value="eyelashExtensionsOk" />} label="まつエクOK" />
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <FormControlLabel control={<Checkbox checked={formData.appearance.includes('noSmokers')} onChange={handleCheckboxChange} name="appearance" value="noSmokers" />} label="喫煙者NG" />
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <FormControlLabel control={<Checkbox checked={formData.appearance.includes('noAccessories')} onChange={handleCheckboxChange} name="appearance" value="noAccessories" />} label="アクセサリーNG" />
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <FormControlLabel control={<Checkbox checked={formData.appearance.includes('noBrightHair')} onChange={handleCheckboxChange} name="appearance" value="noBrightHair" />} label="過度に明るい髪NG" />
                  </Grid>
                </Grid>
              </FormGroup>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              依頼する仕事内容
            </Typography>
            <FormGroup>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={formData.job_details.includes('recall')} onChange={handleCheckboxChange} name="job_details" value="recall" />}
                    label="リコール、P処(スケーリング、PMTC、TBI（フッ化物等の説明））"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={formData.job_details.includes('airFlow')} onChange={handleCheckboxChange} name="job_details" value="airFlow" />}
                    label="エアーフロー"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={formData.job_details.includes('whitening')} onChange={handleCheckboxChange} name="job_details" value="whitening" />}
                    label="ホワイトニング"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={formData.job_details.includes('probing1_4')} onChange={handleCheckboxChange} name="job_details" value="probing1_4" />}
                    label="ブローピング1点、4点法"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={formData.job_details.includes('probing6')} onChange={handleCheckboxChange} name="job_details" value="probing6" />}
                    label="ブローピング6点法"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={formData.job_details.includes('srpLightModerate')} onChange={handleCheckboxChange} name="job_details" value="srpLightModerate" />}
                    label="SRP軽度ー中度"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={formData.job_details.includes('srpModerateSevere')} onChange={handleCheckboxChange} name="job_details" value="srpModerateSevere" />}
                    label="SRP中度ー強度"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={formData.job_details.includes('generalTreatmentAssistance')} onChange={handleCheckboxChange} name="job_details" value="generalTreatmentAssistance" />}
                    label="一般診療補助"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={formData.job_details.includes('specializedTreatmentAssistance')} onChange={handleCheckboxChange} name="job_details" value="specializedTreatmentAssistance" />}
                    label="専門診療補助(小児、矯正、インプラント、外科、訪問診療)"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={formData.job_details.includes('nightGuardCreation')} onChange={handleCheckboxChange} name="job_details" value="nightGuardCreation" />}
                    label="ナイトガード作成"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={formData.job_details.includes('receptionAccounting')} onChange={handleCheckboxChange} name="job_details" value="receptionAccounting" />}
                    label="お会計受付業務"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={formData.job_details.includes('cleaningAndMaintenance')} onChange={handleCheckboxChange} name="job_details" value="cleaningAndMaintenance" />}
                    label="器具洗浄等、片付け、裏仕事"
                  />
                </Grid>
              </Grid>
            </FormGroup>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              sx={{
                minWidth: '200px',
                minHeight: '56px',
                color: 'white',
                fontSize: '1.1rem',
              }}
            >
              次へ
            </Button>
          </Box>
        </Container>
      </Paper>
    </LocalizationProvider>
  );
};