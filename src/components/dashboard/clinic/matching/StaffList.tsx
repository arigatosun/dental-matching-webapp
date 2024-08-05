'use client'

import React, { useState, useEffect } from 'react';
import { Grid, Pagination, Box, Typography, CircularProgress } from '@mui/material';
import StaffCard from './StaffCard';
import { StaffInfo } from '@/types/supabase';
import { getStaffList } from '@/app/actions/staff';

interface StaffListProps {
  selectedProfessions: string[];
  selectedExperience: string;
}

const StaffList: React.FC<StaffListProps> = ({ selectedProfessions, selectedExperience }) => {
  const [staffList, setStaffList] = useState<StaffInfo[] | null>(null);
  const [filteredStaffList, setFilteredStaffList] = useState<StaffInfo[] | null>(null);
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
          setFilteredStaffList(fetchedStaffList);
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

  useEffect(() => {
    if (staffList) {
      let filtered = staffList;

      // 職種でフィルタリング
      if (selectedProfessions.length > 0) {
        filtered = filtered.filter(staff => 
          staff.profession.some(p => selectedProfessions.includes(p))
        );
      }

      // 経験年数でフィルタリング
      if (selectedExperience !== '選択してください') {
        filtered = filtered.filter(staff => {
          const staffExperience = parseInt(staff.experience_years);
          switch (selectedExperience) {
            case '1年未満':
              return staffExperience < 1;
            case '1年以上':
              return staffExperience >= 1;
            case '2年以上':
              return staffExperience >= 2;
            case '3年以上':
              return staffExperience >= 3;
            case '4年以上':
              return staffExperience >= 4;
            case '5年以上':
              return staffExperience >= 5;
            case '6~10年':
              return staffExperience >= 6 && staffExperience <= 10;
            case '11年~15年':
              return staffExperience >= 11 && staffExperience <= 15;
            case '16年以上':
              return staffExperience >= 16;
            default:
              return true;
          }
        });
      }

      setFilteredStaffList(filtered);
      setPage(1);
    }
  }, [selectedProfessions, selectedExperience, staffList]);

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

  if (!filteredStaffList || filteredStaffList.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <Typography variant="h6">条件に合うスタッフが見つかりませんでした。</Typography>
      </Box>
    );
  }

  const paginatedStaff = filteredStaffList.slice((page - 1) * staffPerPage, page * staffPerPage);

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
          count={Math.ceil(filteredStaffList.length / staffPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default StaffList;