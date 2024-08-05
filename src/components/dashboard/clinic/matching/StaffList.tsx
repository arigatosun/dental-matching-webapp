'use client'

import React, { useState, useEffect } from 'react';
import { Grid, Pagination, Box, Typography, CircularProgress } from '@mui/material';
import StaffCard from './StaffCard';
import { StaffInfo } from '@/types/supabase';  // supabase.ts ファイルへの正確なパスを指定してください
import { getStaffList } from '@/app/actions/staff';

const StaffList: React.FC = () => {
  const [staffList, setStaffList] = useState<StaffInfo[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const staffPerPage = 6;

  useEffect(() => {
    async function fetchStaffList() {
      try {
        const { staffList: fetchedStaffList, error } = await getStaffList();
        if (error) {
          setError(error);
        } else {
          setStaffList(fetchedStaffList);
        }
      } catch (err) {
        console.error('Failed to fetch staff list:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    }
    fetchStaffList();
  }, []);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <Typography color="error">エラーが発生しました: {error}</Typography>
      </Box>
    );
  }

  if (!staffList || staffList.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <Typography variant="h6">スタッフが見つかりませんでした。</Typography>
      </Box>
    );
  }

  const paginatedStaff = staffList.slice((page - 1) * staffPerPage, page * staffPerPage);

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
          count={Math.ceil(staffList.length / staffPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default StaffList;