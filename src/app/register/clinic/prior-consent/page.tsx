// app/register/clinic/prior-consent/page.tsx
'use client';

import React, { useState } from 'react';
import { PriorConsentForm } from '@/components/clinic-registration/prior-consent/PriorConsentForm';
import { useRouter } from 'next/navigation';
import { Snackbar } from '@mui/material';

export default function PriorConsentPage() {
  const router = useRouter();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleNext = () => {
    router.push('/register/clinic/certification-upload');
  };

  const handleSkip = () => {
    router.push('/register/clinic/certification-upload');
  };

  const handleError = (message: string) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  return (
    <>
      <PriorConsentForm 
        handleNext={handleNext} 
        handleSkip={handleSkip} 
        handleError={handleError}
      />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </>
  );
}