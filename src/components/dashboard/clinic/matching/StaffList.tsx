'use client'
import React, { useState } from 'react';
import { Grid, Pagination, Box } from '@mui/material';
import StaffCard from './StaffCard';

// サンプルデータ（実際のデータはAPIから取得することを想定）
const sampleStaffData = [
    {
      id: 1,
      nickname: "歯科衛生士A",
      profession: "歯科衛生士",
      thootRank: "THOOTRANK",
      desiredSalary: 1500,
      matchCount: 3,
      location: "尼崎市東口町",
      experience: "歯科衛生士 5年",
    },
    {
      id: 2,
      nickname: "歯科衛生士B",
      profession: "歯科衛生士",
      thootRank: "THOOTRANK",
      desiredSalary: 1600,
      matchCount: 5,
      location: "大阪市北区",
      experience: "歯科衛生士 3年",
    },
    {
      id: 3,
      nickname: "歯科助手C",
      profession: "歯科助手",
      thootRank: "THOOTRANK",
      desiredSalary: 1300,
      matchCount: 2,
      location: "神戸市中央区",
      experience: "歯科助手 2年",
    },
    {
      id: 4,
      nickname: "歯科衛生士D",
      profession: "歯科衛生士",
      thootRank: "THOOTRANK",
      desiredSalary: 1700,
      matchCount: 7,
      location: "京都市下京区",
      experience: "歯科衛生士 8年",
    },
    {
      id: 5,
      nickname: "歯科技工士E",
      profession: "歯科技工士",
      thootRank: "THOOTRANK",
      desiredSalary: 1800,
      matchCount: 4,
      location: "奈良市",
      experience: "歯科技工士 6年",
    },
    {
      id: 6,
      nickname: "歯科衛生士F",
      profession: "歯科衛生士",
      thootRank: "THOOTRANK",
      desiredSalary: 1550,
      matchCount: 1,
      location: "和歌山市",
      experience: "歯科衛生士 1年",
    }
  ];

const StaffList: React.FC = () => {
  const [page, setPage] = useState(1);
  const staffPerPage = 6;

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const paginatedStaff = sampleStaffData.slice((page - 1) * staffPerPage, page * staffPerPage);

  return (
    <Box sx={{ flexGrow: 1, m: 2 }}>
      <Grid container spacing={2}>
        {paginatedStaff.map((staff) => (
          <Grid item xs={12} sm={6} md={4} key={staff.id}>
            <StaffCard {...staff} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={Math.ceil(sampleStaffData.length / staffPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default StaffList;