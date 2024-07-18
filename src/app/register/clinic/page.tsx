// app/register/clinic/page.tsx

'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Stepper, 
  Step, 
  StepLabel, 
  Typography,
  SelectChangeEvent
} from '@mui/material';
import { BasicInfoForm } from '@/components/clinic-registration/BasicInfoForm';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

// 登録プロセスのステップを定義
const steps = ['基本情報', 'プロフィール写真登録', 'マッチング条件設定', '事前同意事項作成', '医院証明書提出', '利用規約・同意'];

// フォームデータの型定義
interface FormData {
  clinicName: string;
  directorLastName: string;
  directorFirstName: string;
  directorLastNameKana: string;
  directorFirstNameKana: string;
  phoneNumber: string;
  postalCode: string;
  prefecture: string;
  city: string;
  address: string;
  buildingName: string;
  nearestStation: string;
  staffCount: string;
  unitCount: string;
  averagePatientsPerDay: string;
  hasIntercom: string;
  businessHoursStart: dayjs.Dayjs | null;
  businessHoursEnd: dayjs.Dayjs | null;
  recallTimeSlot: string;
  clinicEquipment: string[];
  staffBrings: string[];
  appearance: string[];
  jobDetails: string[];
}

export default function ClinicRegistration() {
  // 現在のステップを管理するstate
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();

  // フォームデータを管理するstate
  const [formData, setFormData] = useState<FormData>({
    clinicName: '',
    directorLastName: '',
    directorFirstName: '',
    directorLastNameKana: '',
    directorFirstNameKana: '',
    phoneNumber: '',
    postalCode: '',
    prefecture: '',
    city: '',
    address: '',
    buildingName: '',
    nearestStation: '',
    staffCount: '',
    unitCount: '',
    averagePatientsPerDay: '',
    hasIntercom: '',
    businessHoursStart: null,
    businessHoursEnd: null,
    recallTimeSlot: '',
    clinicEquipment: [],
    staffBrings: [],
    appearance: [],
    jobDetails: [],
  });

  // テキストフィールドの変更を処理する関数
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // チェックボックスの変更を処理する関数
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: checked
        ? [...(prevData[name as keyof FormData] as string[]), value]
        : (prevData[name as keyof FormData] as string[]).filter((item: string) => item !== value)
    }));
  };

  // 時間ピッカーの変更を処理する関数
  const handleTimeChange = (field: string, value: dayjs.Dayjs | null) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  // 「次へ」ボタンのクリックを処理する関数
  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // 最終ステップの場合、データを送信
      console.log(formData);
      // ここでバックエンドへのデータ送信処理を実装する
    } else {
      if (activeStep === 0) {
        // 基本情報入力画面から次へ進む場合
        router.push('/register/clinic/photo-upload');
      } else {
        // それ以外の場合は次のステップに進む
        setActiveStep(prevActiveStep => prevActiveStep + 1);
      }
    }
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      {/* ステッパーを表示 */}
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* ページタイトルを表示 */}
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        sx={{ mb: 0, mt: 6, textAlign: 'center' }}
      >
        基本情報を入力してください
      </Typography>

      {/* 基本情報フォームを表示 */}
      <BasicInfoForm
        formData={formData}
        handleChange={handleChange}
        handleCheckboxChange={handleCheckboxChange}
        handleTimeChange={handleTimeChange}
        handleNext={handleNext}
      />
    </Box>
  );
}