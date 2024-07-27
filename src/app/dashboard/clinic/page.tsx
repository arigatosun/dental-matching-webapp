import { CONFIG } from '@/config-global';
import MatchingFilter from '@/components/dashboard/clinic/MatchingFilter';
import StaffList from '@/components/dashboard/clinic/matching/StaffList';
import { Box, Typography } from '@mui/material';

export const metadata = {
  title: `Dashboard - ${CONFIG.site.name}`,
};

export default function Page() {
  return (
    <Box sx={{ px: { xs: 2, sm: 3, md: 6 }, pt: 0, pb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <MatchingFilter />
      </Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        マッチング結果の一覧表示
      </Typography>
      <StaffList />
    </Box>
  );
}