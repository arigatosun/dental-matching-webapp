'use client';
import React from 'react';
import { Tabs, Tab, Box, styled } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';

const StyledTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    backgroundColor: '#F8A1A7',
  },
});

const StyledTab = styled(Tab)({
  '&.Mui-selected': {
    color: '#F8A1A7',
  },
});

const tabRoutes = [
  { label: 'プロフィール', value: 'profile' },
  { label: '医院詳細', value: 'clinic-details' },
  { label: 'Thoot実績', value: 'thoot-performance' },
  { label: '通知設定', value: 'notification-settings' },
  { label: 'メール・パスワード設定', value: 'account-settings' },
];

export default function MyPageTabs() {
  const router = useRouter();
  const pathname = usePathname();

  // 修正: 現在のタブを正確に特定する
  const currentTab = tabRoutes.find(tab => pathname.includes(tab.value))?.value || 'profile';

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    router.push(`/dashboard/clinic/mypage/${newValue}`);
  };

  return (
    <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
      <StyledTabs 
        value={currentTab} 
        onChange={handleChange} 
        aria-label="my page tabs"
        textColor="inherit"
      >
        {tabRoutes.map((tab) => (
          <StyledTab key={tab.value} label={tab.label} value={tab.value} />
        ))}
      </StyledTabs>
    </Box>
  );
}