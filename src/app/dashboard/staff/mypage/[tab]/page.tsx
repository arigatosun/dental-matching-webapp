import React from 'react';
import ProfileTab from '@/components/dashboard/staff/mypage/ProfileTab';
import SkillsExperienceTab from '@/components/dashboard/staff/mypage/SkillsExperienceTab';
import MatchingConditionsTab from '@/components/dashboard/staff/mypage/MatchingConditionsTab';
import NotificationSettingsTab from '@/components/dashboard/staff/mypage/NotificationSettingsTab';
import AccountSettingsTab from '@/components/dashboard/staff/mypage/AccountSettingsTab';

const tabComponents = {
  'profile': ProfileTab,
  'skills-experience': SkillsExperienceTab,
  'matching-conditions': MatchingConditionsTab,
  'notification-settings': NotificationSettingsTab,
  'account-settings': AccountSettingsTab,
};

export default function StaffMypageTab({ params }: { params: { tab: string } }) {
  const TabComponent = tabComponents[params.tab as keyof typeof tabComponents] || ProfileTab;
  
  return <TabComponent />;
}