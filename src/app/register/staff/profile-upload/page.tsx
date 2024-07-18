import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const ProfileUploadWrapper = dynamic(
  () => import('@/components/staff-registration/profile-upload/ProfileUploadWrapper'),
  { ssr: false }
);

export const metadata: Metadata = {
  title: 'プロフィール写真登録 | 歯科スタッフ登録',
};

export default function ProfileUploadPage() {
  return <ProfileUploadWrapper />;
}