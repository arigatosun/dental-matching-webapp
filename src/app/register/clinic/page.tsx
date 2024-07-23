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
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

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

  const supabase = createClientComponentClient();

  // 「次へ」ボタンのクリックを処理する関数
const handleNext = async () => {
  // 最終ステップかどうかを確認
  if (activeStep === steps.length - 1) {
    // 最終ステップの場合、データをデータベースに送信
    try {
      // 現在のユーザー情報を取得
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not found');

      // クリニック情報をデータベースに挿入または更新
      const { data, error } = await supabase
        .from('clinics')
        .upsert({
          user_id: user.id, // ユーザーIDを関連付け
          ...formData, // フォームデータをスプレッド
          // 営業時間をISO文字列形式に変換
          business_hours_start: formData.businessHoursStart?.toISOString(),
          business_hours_end: formData.businessHoursEnd?.toISOString(),
        })
        .select(); // 挿入/更新されたデータを取得

      // エラーチェック
      if (error) throw error;

      console.log('Data saved successfully', data);
      
      // 登録完了ページへ遷移
      router.push('/register/clinic/completed');
    } catch (error) {
      console.error('Error saving data:', error);
      // TODO: エラー処理を追加（例：エラーメッセージの表示）
    }
  } else {
    // 最終ステップでない場合
    if (activeStep === 0) {
      // 基本情報入力画面（最初のステップ）の場合
      // プロフィール写真アップロードページへ遷移
      router.push('/register/clinic/photo-upload');
    } else {
      // その他のステップの場合
      // 次のステップに進む
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