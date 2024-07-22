import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const TermsConditionsWrapper = dynamic(
  () => import('@/components/staff-registration/term-conditions/TermsConditionsWrapper'),
  { ssr: false }
);

export const metadata: Metadata = {
  title: '利用規約・同意 | 歯科スタッフ登録',
  description: '利用規約をご確認いただき、同意をお願いします。',
};

export default function TermsAndConditionsPage() {
  return <TermsConditionsWrapper />;
}