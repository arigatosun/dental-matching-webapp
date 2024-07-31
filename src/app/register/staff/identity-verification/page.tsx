import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const IdentityAndLicenseVerificationWrapper = dynamic(
  () => import('@/components/staff-registration/identity-and-license/IdentityAndLicenseVerificationWrapper'),
  { ssr: false }
);

export const metadata: Metadata = {
  title: '本人確認書類・資格免許の提出 | 歯科スタッフ登録',
};

export default function IdentityAndLicenseVerificationPage() {
  return <IdentityAndLicenseVerificationWrapper />;
}