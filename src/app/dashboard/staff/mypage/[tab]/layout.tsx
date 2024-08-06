import React from 'react';
import StaffMyPageTabs from '@/components/dashboard/staff/mypage/StaffMypageTabs';

export default function StaffMypageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <StaffMyPageTabs />
      {children}
    </div>
  );
}