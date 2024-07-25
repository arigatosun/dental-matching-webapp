// src/components/dashboard/clinic/MyPageTabs.tsx
import React, { useState } from 'react';
import { Tabs, Tab, Box, styled } from '@mui/material';
import ProfileTab from './ProfileTab';
import ClinicDetailsTab from './ClinicDetailsTab';
import ThootPerformanceTab from './ThootPerformanceTab';
import NotificationSettingsTab from './NotificationSettingsTab';
import AccountSettingsTab from './AccountSettingsTab';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`mypage-tabpanel-${index}`}
      aria-labelledby={`mypage-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

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

export default function MyPageTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <StyledTabs 
          value={value} 
          onChange={handleChange} 
          aria-label="my page tabs"
          textColor="inherit"
        >
          <StyledTab label="プロフィール" />
          <StyledTab label="医院詳細" />
          <StyledTab label="Thoot実績" />
          <StyledTab label="通知設定" />
          <StyledTab label="メール・パスワード設定" />
        </StyledTabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ProfileTab />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ClinicDetailsTab />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ThootPerformanceTab />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <NotificationSettingsTab />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <AccountSettingsTab />
      </TabPanel>
    </Box>
  );
}