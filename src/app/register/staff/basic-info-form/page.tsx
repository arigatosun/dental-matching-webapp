import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const BasicInfoFormWrapper = dynamic(
  () => import('@/components/staff-registration/basic-info/BasicInfoFormWrapper'),
  { ssr: false }
);

export const metadata: Metadata = {
  title: '基本情報入力 | 歯科スタッフ登録',
};

export default function BasicInfoFormPage() {
  return <BasicInfoFormWrapper />;
}