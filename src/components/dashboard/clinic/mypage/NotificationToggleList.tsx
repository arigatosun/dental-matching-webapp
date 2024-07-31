// src/components/dashboard/clinic/NotificationToggleList.tsx
import React, { useState } from 'react';
import { List, ListItem, ListItemText, Switch, Divider, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface NotificationSetting {
  id: string;
  label: string;
  enabled: boolean;
}

const StyledListItem = styled(ListItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  transition: theme.transitions.create('background-color', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const StyledSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: theme.palette.primary.main,
  },
  '& .MuiSwitch-switchBase': {
    '&:not(.Mui-checked)': {
      color: theme.palette.grey[400],
    },
    '&:not(.Mui-checked) + .MuiSwitch-track': {
      backgroundColor: theme.palette.grey[300],
    },
  },
}));

const initialSettings: NotificationSetting[] = [
  { id: 'offer', label: 'オファー受諾時', enabled: true },
  { id: 'message', label: 'メッセージ受信時', enabled: true },
  { id: 'completion', label: '勤務完了リクエスト受諾時', enabled: false },
  { id: 'admin', label: '運営からの通知', enabled: false },
  { id: 'all', label: 'すべての通知を受け取る', enabled: false },
];

export default function NotificationToggleList() {
  const [settings, setSettings] = useState<NotificationSetting[]>(initialSettings);

  const handleToggle = (id: string) => {
    setSettings(prevSettings =>
      prevSettings.map(setting =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  return (
    <List sx={{ bgcolor: 'background.paper', borderRadius: 1 }}>
      {settings.map((setting, index) => (
        <React.Fragment key={setting.id}>
          <StyledListItem>
            <ListItemText primary={setting.label} />
            <StyledSwitch
              edge="end"
              checked={setting.enabled}
              onChange={() => handleToggle(setting.id)}
              inputProps={{
                'aria-labelledby': `switch-list-label-${setting.id}`,
              }}
            />
          </StyledListItem>
          {index < settings.length - 1 && <Divider component="li" />}
        </React.Fragment>
      ))}
    </List>
  );
}