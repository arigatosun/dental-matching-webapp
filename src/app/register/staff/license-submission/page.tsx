import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const LicenseSubmissionWrapper = dynamic(
  () => import('@/components/staff-registration/license-submission/LicenseSubmissionWrapper'),
  { ssr: false }
);

export const metadata: Metadata = {
  title: '国家資格免許の提出 | 歯科スタッフ登録',
};

export default function LicenseSubmissionPage() {
  return <LicenseSubmissionWrapper />;
}