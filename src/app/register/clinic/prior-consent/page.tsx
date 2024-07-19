'use client';

import React from 'react';
import { PriorConsentForm } from '@/components/clinic-registration/prior-consent/PriorConsentForm';
import { useRouter } from 'next/navigation';

export default function PriorConsentPage() {
  const router = useRouter();

  const handleNext = () => {
    router.push('/register/clinic/certification-upload');
  };

  const handleSkip = () => {
    router.push('/register/clinic/certification-upload');
  };

  return <PriorConsentForm handleNext={handleNext} handleSkip={handleSkip} />;
}