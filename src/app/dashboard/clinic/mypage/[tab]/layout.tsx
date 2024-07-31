import React from 'react';
import MyPageTabs from '@/components/dashboard/clinic/mypage/MypageTabs';

export default function MypageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <MyPageTabs />
      {children}
    </div>
  );
}