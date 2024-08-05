'use client';

import React, { useState } from 'react';
import MatchingFilter from '@/components/dashboard/clinic/MatchingFilter';
import StaffList from '@/components/dashboard/clinic/matching/StaffList';
import { Box, Typography } from '@mui/material';

export default function Page() {
  const [selectedProfessions, setSelectedProfessions] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string>('選択してください');

  const handleFilterChange = (professions: string[], experience: string) => {
    setSelectedProfessions(professions);
    setSelectedExperience(experience);
  };

  return (
    <Box sx={{ px: { xs: 2, sm: 3, md: 6 }, pt: 0, pb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <MatchingFilter onFilterChange={handleFilterChange} />
      </Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        マッチング結果の一覧表示
      </Typography>
      <StaffList selectedProfessions={selectedProfessions} selectedExperience={selectedExperience} />
    </Box>
  );
}