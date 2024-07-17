'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Stepper, 
  Step, 
  StepLabel, 
  Paper,
  SelectChangeEvent,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { BasicInfoForm } from '@/components/clinic-registration/BasicInfoForm';
import { ProfilePhotoUploadView } from '@/sections/profile/ProfilePhotoUpload';
import { useRouter } from 'next/navigation';

const steps = ['基本情報', 'プロフィール写真登録', 'マッチング条件設定', '事前同意事項作成', '医院証明書提出', '利用規約・同意'];

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(3, 0),
}));

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
  businessHoursStart: string;
  businessHoursEnd: string;
  recallTimeSlot: string;
  clinicEquipment: string[];
  staffBrings: string[];
  appearance: string[];
  jobDetails: string[];
}

export default function ClinicRegistration() {
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();
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
    businessHoursStart: '',
    businessHoursEnd: '',
    recallTimeSlot: '',
    clinicEquipment: [],
    staffBrings: [],
    appearance: [],
    jobDetails: [],
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: checked
        ? [...(prevData[name as keyof FormData] as string[]), value]
        : (prevData[name as keyof FormData] as string[]).filter((item: string) => item !== value)
    }));
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // 最後のステップの場合、登録処理を行う
      console.log(formData);
      // ここでバックエンドへのデータ送信処理を実装する
    } else {
      if (activeStep === 1) {
        // プロフィール写真登録画面から次へ進む場合
        router.push('/register/clinic/matching-conditions');
      } else {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    // ここでバックエンドへのデータ送信処理を実装する
  };

  const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginTop: theme.spacing(0), // 上部のマージンを減らす
  }));
  

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Typography 
      variant="h4" 
      component="h1" 
      gutterBottom 
      sx={{ mb: 0, mt: 6, textAlign: 'center' }} // mb を 4 から 2 に変更
    >
      {activeStep === 0 ? '基本情報を入力してください' : 
       activeStep === 1 ? 'プロフィール写真を登録してください' :
       'ステップ情報'}
    </Typography>

    {activeStep === 1 && (
      <Typography 
        variant="body2" 
        sx={{ 
          mt: 1, 
          textAlign: 'center', 
          color: 'text.disabled',
          fontStyle: 'italic'
        }}
      >
        ※プロフィール写真は後から変更できます
      </Typography>
    )}

      
      <StyledPaper>
        <form onSubmit={handleSubmit}>
          {activeStep === 0 && (
            <BasicInfoForm
              formData={formData}
              handleChange={handleChange}
              handleCheckboxChange={handleCheckboxChange}
              handleNext={handleNext}
              handleBack={handleBack}
              activeStep={activeStep}
              steps={steps}
            />
          )}
           {activeStep === 1 && (
            <ProfilePhotoUploadView
              handleNext={handleNext}
              handleBack={handleBack}
            />
          )}
          {/* 他のステップのコンポーネントも同様に追加 */}
        </form>
      </StyledPaper>
    </Box>
  );
}