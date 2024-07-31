import React from 'react';
import ProfileTab from '@/components/dashboard/clinic/mypage/ProfileTab';
import ClinicDetailsTab from '@/components/dashboard/clinic/mypage/ClinicDetailsTab';
import ThootPerformanceTab from '@/components/dashboard/clinic/mypage/ThootPerformanceTab';
import NotificationSettingsTab from '@/components/dashboard/clinic/mypage/NotificationSettingsTab';
import AccountSettingsTab from '@/components/dashboard/clinic/mypage/AccountSettingsTab';

const tabComponents = {
  'profile': ProfileTab,
  'clinic-details': ClinicDetailsTab,
  'thoot-performance': ThootPerformanceTab,
  'notification-settings': NotificationSettingsTab,
  'account-settings': AccountSettingsTab,
};

export default function MypageTab({ params }: { params: { tab: string } }) {
  const TabComponent = tabComponents[params.tab as keyof typeof tabComponents] || ProfileTab;
  
  return <TabComponent />;
}