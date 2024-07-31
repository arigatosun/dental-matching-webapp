import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const ProfileUploadWrapper = dynamic(
  () => import('@/components/staff-registration/profile-upload/ProfileUploadWrapper'),
  { ssr: false }
);

export const metadata: Metadata = {
  title: 'プロフィール写真登録 | 歯科スタッフ登録',
  description: 'アバターの選択とプロフィール写真のアップロードを行います。',
};

export default function ProfileUploadPage() {
  return <ProfileUploadWrapper />;
}