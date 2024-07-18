import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const TermsConditionsWrapper = dynamic(
  () => import('@/components/staff-registration/term-conditions/TermsConditionsWrapper'),
  { ssr: false }
);

export const metadata: Metadata = {
  title: '利用規約・同意 | 歯科スタッフ登録',
};

export default function TermsConditionsPage() {
  return <TermsConditionsWrapper />;
}