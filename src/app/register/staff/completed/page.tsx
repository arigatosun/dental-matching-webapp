import { Metadata } from 'next';
import { RegistrationCompletePage } from '@/components/staff-registration/completed/RegistrationCompletePage';

export const metadata: Metadata = {
  title: '登録完了 | 歯科スタッフ登録',
};

export default function CompletedPage() {
  return <RegistrationCompletePage />;
}