// src/app/register/clinic/photo-upload/page.tsx
'use client';

import { ProfilePhotoUploadView } from "@/components/clinic-registration/profile/ProfilePhotoUpload";
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  const handleNext = () => {
    // 次のステップへ進む処理
    router.push('/register/clinic/matching-conditions');
  };

  const handleBack = () => {
    // 前のステップへ戻る処理
    router.back();
  };

  return <ProfilePhotoUploadView handleNext={handleNext} handleBack={handleBack} />;
}