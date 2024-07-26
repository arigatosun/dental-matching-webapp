import { CONFIG } from '@/config-global';
import { BlankView } from '@/sections/blank/view';
import MatchingFilter from '@/components/dashboard/clinic/MatchingFilter';
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
      <BlankView title="マッチング結果の一覧表示" />
    </Box>
  );
}