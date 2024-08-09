import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, Box, Divider } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';

interface ShiftRegistrationFormProps {
  selectedDate: Date | null;
  selectedEvent: { id: number; title: string; start: Date; end: Date } | null;
  onAddShift: (start: Date, end: Date) => void;
  onDeleteShift: (event: { id: number; title: string; start: Date; end: Date }) => void;
}

const ShiftRegistrationForm: React.FC<ShiftRegistrationFormProps> = ({
  selectedDate,
  selectedEvent,
  onAddShift,
  onDeleteShift,
}) => {
  const [startTime, setStartTime] = useState<moment.Moment | null>(null);
  const [endTime, setEndTime] = useState<moment.Moment | null>(null);

  useEffect(() => {
    if (selectedEvent) {
      setStartTime(moment(selectedEvent.start));
      setEndTime(moment(selectedEvent.end));
    } else {
      setStartTime(null);
      setEndTime(null);
    }
  }, [selectedEvent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate && startTime && endTime) {
      const start = moment(selectedDate).set({
        hour: startTime.hour(),
        minute: startTime.minute(),
      }).toDate();
      const end = moment(selectedDate).set({
        hour: endTime.hour(),
        minute: endTime.minute(),
      }).toDate();
      onAddShift(start, end);
    }
  };

  const handleDelete = () => {
    if (selectedEvent) {
      onDeleteShift(selectedEvent);
    }
  };

  const isFormValid = startTime && endTime && startTime.isBefore(endTime);

  if (!selectedDate) {
    return (
      <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
        <Typography>日付を選択して勤務可能時間を登録してください。</Typography>
      </Paper>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
        <Typography variant="h6" gutterBottom>
          {moment(selectedDate).format('YYYY年M月D日')}の勤務可能時間を登録する
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 4, mt: 4 }}>
            <TimePicker
              label="開始時間"
              value={startTime}
              onChange={(newValue) => setStartTime(newValue)}
              sx={{ width: '100%' }}
            />
          </Box>
          <Box sx={{ mb: 4 }}>
            <TimePicker
              label="終了時間"
              value={endTime}
              onChange={(newValue) => setEndTime(newValue)}
              sx={{ width: '100%' }}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {!selectedEvent ? (
              <Button
                type="submit"
                variant="contained"
                disabled={!isFormValid}
                sx={{
                  bgcolor: '#F8A1A7',
                  color: 'white',
                  '&:hover': { bgcolor: '#F57F89' },
                  width: '100%',
                  height: '48px',
                  fontSize: '14px',
                }}
              >
                希望日時を登録する
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleDelete}
                sx={{
                  bgcolor: '#E0E0E0',
                  color: 'black',
                  '&:hover': { bgcolor: '#BDBDBD' },
                  width: '100%',
                  height: '48px',
                  fontSize: '14px',
                }}
              >
                登録した希望日時を削除する
              </Button>
            )}
          </Box>
        </form>
        <Divider sx={{ my: 4 }} />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2, fontSize: '0.875rem', lineHeight: 1.5 }}>
          連日での勤務登録をした場合、歯科医院から複数日のオファーが届くことがございます。
          トラブルを避ける為にも、初回は1日マッチングをお勧めしています。
          シフト登録した時間を超えるオファーを受諾することがあります。
        </Typography>
      </Paper>
    </LocalizationProvider>
  );
};

export default ShiftRegistrationForm;