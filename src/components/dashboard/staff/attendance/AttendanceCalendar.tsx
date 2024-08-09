'use client';

import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import 'moment/locale/ja';

moment.locale('ja');
const localizer = momentLocalizer(moment);

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
}

const AttendanceCalendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    const title = window.prompt('シフト名を入力してください');
    if (title) {
      setEvents([...events, { id: events.length, title, start, end }]);
    }
  };

  const handleSelectEvent = (event: Event) => {
    const action = window.confirm(`${event.title}\n\n削除しますか？`);
    if (action) {
      setEvents(events.filter(e => e.id !== event.id));
    }
  };

  const navigateMonth = (direction: 'PREV' | 'NEXT') => {
    const newDate = moment(currentDate).add(direction === 'NEXT' ? 1 : -1, 'month').toDate();
    setCurrentDate(newDate);
  };

  return (
    <Box sx={{ height: '100%' }}>
      <CustomToolbar 
        date={currentDate} 
        onNavigate={navigateMonth}
      />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100% - 50px)' }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        view="month"
        date={currentDate}
        toolbar={false}
        messages={{
          next: "次",
          previous: "前",
          today: "今日",
          month: "月",
          week: "週",
          day: "日"
        }}
      />
    </Box>
  );
};

interface CustomToolbarProps {
  date: Date;
  onNavigate: (action: 'PREV' | 'NEXT') => void;
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({ date, onNavigate }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      <IconButton onClick={() => onNavigate('PREV')}>
        <ArrowBackIosNewIcon />
      </IconButton>
      <Typography variant="h6">
        {moment(date).format('YYYY年 M月')}
      </Typography>
      <IconButton onClick={() => onNavigate('NEXT')}>
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default AttendanceCalendar;