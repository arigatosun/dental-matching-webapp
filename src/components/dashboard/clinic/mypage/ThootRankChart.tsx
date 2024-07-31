import React from 'react';
import { Box, Typography, CircularProgress, useTheme, Button } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { ThootRankData } from '@/types/thoot-performance';

interface ThootRankChartProps {
  data: ThootRankData;
  onInfoClick: () => void;
}

const ThootRankChart: React.FC<ThootRankChartProps> = ({ data, onInfoClick }) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 300, margin: 'auto' }}>
      <Typography variant="h6" component="div" sx={{ mb: 1 }}>
        現在のThootRank
      </Typography>
      
      <Typography variant="h4" component="div" sx={{ mb: 2, color: '#C0C0C0', fontWeight: 'bold' }}>
        {data.currentRank}
      </Typography>
      
      <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
        <CircularProgress
          variant="determinate"
          value={data.progress}
          size={200}
          thickness={4}
          sx={{
            color: theme.palette.primary.main, // 元の色に戻す
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            },
          }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography variant="body1" component="div" color="text.secondary" align="center">
            RankUPまで
            <br />
            あと
            <Typography component="span" variant="h4" color="primary" sx={{ fontWeight: 'bold', mx: 0.5 }}>
              {data.remainingMatches}
            </Typography>
            回
          </Typography>
        </Box>
      </Box>
      
      <Button
        variant="outlined"
        startIcon={<InfoIcon />}
        onClick={onInfoClick}
        sx={{
          color: '#0051A2',
          borderColor: '#00B8D9',
          backgroundColor: 'white',
          '&:hover': {
            backgroundColor: 'rgba(0, 184, 217, 0.04)',
            borderColor: '#00B8D9',
          },
          borderRadius: '20px',
          padding: '6px 16px',
        }}
      >
        ThootRankとは？
      </Button>
    </Box>
  );
};

export default React.memo(ThootRankChart);