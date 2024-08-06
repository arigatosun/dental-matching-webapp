'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Stepper, 
  Step, 
  StepLabel, 
  Typography,
  SelectChangeEvent,
  Snackbar,
  Alert
} from '@mui/material';
import { BasicInfoForm } from '@/components/clinic-registration/BasicInfoForm';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { getDevelopmentUser } from '@/utils/auth-helper';

const steps = ['基本情報', 'プロフィール写真登録', 'マッチング条件設定', '事前同意事項作成', '医院証明書提出', '利用規約・同意'];

export interface ClinicBasicInfo {
  clinic_name: string;
  director_last_name: string;
  director_first_name: string;
  director_last_name_kana: string;
  director_first_name_kana: string;
  phone_number: string;
  postal_code: string;
  prefecture: string;
  city: string;
  address: string;
  building_name: string;
  nearest_station: string;
  staff_count: string;
  unit_count: string;
  average_patients_per_day: string;
  has_intercom: string;
  business_hours_start: dayjs.Dayjs | null;
  business_hours_end: dayjs.Dayjs | null;
  recall_time_slot: string;
  clinic_introduction: string;
  clinic_equipment: string[];
  staff_brings: string[];
  appearance: string[];
  job_details: string[];
  website_url: string;
  walking_time_from_station: string;
}

export default function ClinicRegistration() {
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<ClinicBasicInfo>({
    clinic_name: '',
    director_last_name: '',
    director_first_name: '',
    director_last_name_kana: '',
    director_first_name_kana: '',
    phone_number: '',
    postal_code: '',
    prefecture: '',
    city: '',
    address: '',
    building_name: '',
    nearest_station: '',
    staff_count: '',
    unit_count: '',
    average_patients_per_day: '',
    has_intercom: '',
    business_hours_start: null,
    business_hours_end: null,
    recall_time_slot: '',
    clinic_introduction: '',
    clinic_equipment: [],
    staff_brings: [],
    appearance: [],
    job_details: [],
    website_url: '',
    walking_time_from_station: '',
  });

  useEffect(() => {
    const createOrGetUser = async () => {
      const email = 'dev-clinic2@example.com';
      const password = 'devpassword';

      try {
        const newUser = await getDevelopmentUser('clinic', {
          email,
          password
        });

        if (newUser) {
          setUser(newUser);
          console.log('User created or retrieved:', newUser);
        } else {
          throw new Error('Failed to create or retrieve user');
        }
      } catch (err) {
        console.error('Error creating or retrieving user:', err);
        setError('ユーザーの作成または取得に失敗しました。');
      }
    };

    if (process.env.NODE_ENV === 'development') {
      createOrGetUser();
    }
  }, []);

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
        ? [...(prevData[name as keyof ClinicBasicInfo] as string[] || []), value]
        : (prevData[name as keyof ClinicBasicInfo] as string[] || []).filter((item: string) => item !== value)
    }));
  };

  const handleTimeChange = (field: string, value: dayjs.Dayjs | null) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  const handleNext = async () => {
    try {
      let currentUser;
      if (process.env.NODE_ENV === 'development') {
        if (!user) {
          throw new Error('Development user not created or retrieved');
        }
        currentUser = user;
      } else {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        currentUser = authUser;
      }
  
      if (!currentUser) throw new Error('User not found');

      const { data, error } = await supabase
        .from('clinic_basic_info')
        .upsert({
          user_id: currentUser.id,
          ...formData,
          business_hours_start: formData.business_hours_start?.toISOString(),
          business_hours_end: formData.business_hours_end?.toISOString(),
          walking_time_from_station: parseInt(formData.walking_time_from_station),
        })
        .select();

      if (error) throw error;

      console.log('Data saved successfully', data);
      
      router.push('/register/clinic/photo-upload');
    } catch (error) {
      console.error('Error saving data:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
      }
      setError('データの保存中にエラーが発生しました。');
    }
  };

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
        sx={{ mb: 0, mt: 6, textAlign: 'center' }}
      >
        基本情報を入力してください
      </Typography>

      <BasicInfoForm
        formData={formData}
        handleChange={handleChange}
        handleCheckboxChange={handleCheckboxChange}
        handleTimeChange={handleTimeChange}
        handleNext={handleNext}
      />

      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}