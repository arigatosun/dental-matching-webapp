import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const PreferencesExperienceWrapper = dynamic(
  () => import('@/components/staff-registration/preference-experience/PreferencesExperienceWrapper'),
  { ssr: false }
);

export const metadata: Metadata = {
  title: '希望条件・経歴入力 | 歯科スタッフ登録',
};

export default function PreferencesExperiencePage() {
  return <PreferencesExperienceWrapper />;
}