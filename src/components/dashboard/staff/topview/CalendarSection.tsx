'use client';

import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';

const CalendarSection: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(dayjs());

  const handleDateChange = (newDate: dayjs.Dayjs | null) => {
    setSelectedDate(newDate);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        出勤カレンダー
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar value={selectedDate} onChange={handleDateChange} />
      </LocalizationProvider>
    </Box>
  );
};

export default CalendarSection;