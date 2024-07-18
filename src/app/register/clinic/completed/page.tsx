import React from 'react';
import { RegistrationCompletePage } from '@/components/clinic-registration/complete/RegistrationCompletePage';

export const metadata = {
  title: '登録完了 | Thoot',
  description: 'Thootへの登録が完了しました。次のステップに進みましょう。',
};

export default function CompletedPage() {
  return <RegistrationCompletePage />;
}