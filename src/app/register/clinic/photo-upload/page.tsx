'use client';

import { ProfilePhotoUploadView } from "@/components/clinic-registration/profile/ProfilePhotoUpload";
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  const handleNext = () => {
    router.push('/register/clinic/matching-conditions');
  };

  const handleSkip = () => {
    // スキップ時の処理（例：次のステップに進む）
    router.push('/register/clinic/matching-conditions');
  };

  return <ProfilePhotoUploadView handleNext={handleNext} handleSkip={handleSkip} />;
}