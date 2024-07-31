import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Typography, Box, useTheme, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { MatchingData } from '@/types/thoot-performance';

interface MatchingGraphProps {
  data: { [year: string]: MatchingData[] };
}

const MatchingGraph: React.FC<MatchingGraphProps> = ({ data }) => {
  const theme = useTheme();
  // 2023年をデフォルトで選択
  const [selectedYear, setSelectedYear] = useState('2023');

  const handleYearChange = (event: SelectChangeEvent) => {
    setSelectedYear(event.target.value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box sx={{ bgcolor: 'background.paper', p: 2, border: 1, borderColor: 'grey.300' }}>
          <Typography variant="body2">{`${label}: ${payload[0].value}回`}</Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box sx={{ width: '100%', height: 400 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">マッチング実績グラフ</Typography>
        <Select
          value={selectedYear}
          onChange={handleYearChange}
          size="small"
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(0, 0, 0, 0.1)', // 薄いグレーのボーダー
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(0, 0, 0, 0.2)', // ホバー時のボーダー色
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(0, 0, 0, 0.3)', // フォーカス時のボーダー色
            },
          }}
        >
          {Object.keys(data).map((year) => (
            <MenuItem key={year} value={year}>{year}年</MenuItem>
          ))}
        </Select>
      </Box>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data[selectedYear]}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 25,
          }}
          barSize={30}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="month" 
            interval={0}
            tick={{ fontSize: 15 }}
          />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="matchCount" fill={theme.palette.primary.main} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default React.memo(MatchingGraph);