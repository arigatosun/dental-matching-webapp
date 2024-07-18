import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const IdentityVerificationWrapper = dynamic(
  () => import('@/components/staff-registration/identity-verification/IdentityVerificationWrapper'),
  { ssr: false }
);

export const metadata: Metadata = {
  title: '本人確認書類の提出 | 歯科スタッフ登録',
};

export default function IdentityVerificationPage() {
  return <IdentityVerificationWrapper />;
}