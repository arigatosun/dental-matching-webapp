// src/components/dashboard/clinic/ThootPerformanceTab.tsx
'use client';
import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import MatchingGraph from './MatchingGraph';
import ThootRankChart from './ThootRankChart';
import ReviewTable from './ReviewTable';
import { MatchingData, ThootRankData, ReviewData, PerformanceSummary } from '@/types/thoot-performance';

// ダミーデータ（実際の使用時はpropsで渡すか、APIから取得します）
const matchingData = {
  '2023': [
    { month: '1月', matchCount: 5 },
    { month: '2月', matchCount: 8 },
    { month: '3月', matchCount: 12 },
    { month: '4月', matchCount: 10 },
    { month: '5月', matchCount: 15 },
    { month: '6月', matchCount: 20 },
    { month: '7月', matchCount: 18 },
    { month: '8月', matchCount: 22 },
    { month: '9月', matchCount: 25 },
    { month: '10月', matchCount: 23 },
    { month: '11月', matchCount: 28 },
    { month: '12月', matchCount: 30 },
  ],
  '2022': [
    { month: '1月', matchCount: 12 },
    { month: '2月', matchCount: 4 },
    { month: '3月', matchCount: 0 },
    { month: '4月', matchCount: 8 },
    { month: '5月', matchCount: 15 },
    { month: '6月', matchCount: 6 },
    { month: '7月', matchCount: 20 },
    { month: '8月', matchCount: 22 },
    { month: '9月', matchCount: 4 },
    { month: '10月', matchCount: 23 },
    { month: '11月', matchCount: 10 },
    { month: '12月', matchCount: 15 }, // 2022年のデータも同様に12ヶ月分追加
  ]
};

const thootRankData: ThootRankData = {
  currentRank: 'シルバー',
  progress: 75,
  remainingMatches: 5,
};

const reviewData: ReviewData[] = [
  { id: 1, name: '山田花子', workDate: '2023-07-01', overallRating: 4.5, cleanliness: 5, communication: 4, workability: 4.5 },
  { id: 2, name: '鈴木一郎', workDate: '2023-07-05', overallRating: 4, cleanliness: 4, communication: 4, workability: 4 },
  { id: 3, name: '佐藤めぐみ', workDate: '2023-07-10', overallRating: 5, cleanliness: 5, communication: 5, workability: 5 },
  { id: 4, name: '田中健太', workDate: '2023-07-15', overallRating: 4.5, cleanliness: 4, communication: 5, workability: 4.5 },
  { id: 5, name: '小林美咲', workDate: '2023-07-20', overallRating: 4, cleanliness: 4, communication: 4, workability: 4 },
];

const performanceSummary: PerformanceSummary = {
  totalMatches: 88,
  averageRating: 4.4,
};

const ThootPerformanceTab: React.FC = () => {
  const handleInfoClick = () => {
    // ThootRankの詳細説明を表示するロジックをここに実装
    console.log('ThootRank info clicked');
    // 例: モーダルを開く、ポップオーバーを表示する、など
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 2, pb: 8 }}> {/* pb (padding-bottom) を追加 */}
            <MatchingGraph data={matchingData} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
            <ThootRankChart data={thootRankData} onInfoClick={handleInfoClick} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              総合マッチング成立回数
            </Typography>
            <Typography variant="h4" color="primary">
              {performanceSummary.totalMatches}回
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              総合レビュー平均値
            </Typography>
            <Typography variant="h4" color="primary">
              {performanceSummary.averageRating.toFixed(1)}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <ReviewTable reviews={reviewData} />
          </Paper>
        </Grid>
       
      </Grid>
    </Box>
  );
};

export default ThootPerformanceTab;