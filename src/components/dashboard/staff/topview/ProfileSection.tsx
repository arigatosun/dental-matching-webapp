'use client';

import React from 'react';
import { Avatar, Typography, Box } from '@mui/material';

const ProfileSection: React.FC = () => {
  // サンプルデータ
  const profile = {
    name: '歯科衛生士 花子',
    avatar: '/path/to/avatar.jpg',
    profession: '歯科衛生士',
    experience: '5年',
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Avatar
        alt={profile.name}
        src={profile.avatar}
        sx={{ width: 100, height: 100, mb: 2 }}
      />
      <Typography variant="h6" gutterBottom>
        {profile.name}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {profile.profession}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        経験年数: {profile.experience}
      </Typography>
    </Box>
  );
};

export default ProfileSection;