'use client';

import { ProfilePhotoUploadView } from "@/components/clinic-registration/profile/ProfilePhotoUpload";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CircularProgress, Snackbar } from '@mui/material';

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNext = () => {
    setLoading(true);
    // プロフィール写真のアップロードと保存は ProfilePhotoUploadView 内で行われるため、
    // ここでは次のページへの遷移のみを行います
    router.push('/register/clinic/matching-conditions');
  };

  const handleSkip = () => {
    router.push('/register/clinic/matching-conditions');
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <ProfilePhotoUploadView handleNext={handleNext} handleSkip={handleSkip} />
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        message={error}
      />
    </>
  );
}