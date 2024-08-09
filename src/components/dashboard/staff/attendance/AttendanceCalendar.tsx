'use client';

import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box, Typography, IconButton, Grid } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ShiftRegistrationForm from './ShiftRegistrationForm';
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
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  

  const handleSelectSlot = ({ start }: { start: Date }) => {
    setSelectedDate(start);
    setSelectedEvent(null);
  };

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
    setSelectedDate(event.start);
  };

  const navigateMonth = (direction: 'PREV' | 'NEXT') => {
    const newDate = moment(currentDate).add(direction === 'NEXT' ? 1 : -1, 'month').toDate();
    setCurrentDate(newDate);
  };

  const handleAddShift = (start: Date, end: Date) => {
    const title = `${moment(start).format('HH:mm')} - ${moment(end).format('HH:mm')}`;
    const newEvent = { id: events.length, title, start, end };
    setEvents([...events, newEvent]);
    setSelectedDate(null);
    setSelectedEvent(null);
  };

  const handleDeleteShift = (eventToDelete: Event) => {
    setEvents(events.filter(event => event.id !== eventToDelete.id));
    setSelectedDate(null);
    setSelectedEvent(null);
  };

  const eventStyleGetter = (event: Event) => {
    return {
        style: {
          backgroundColor: '#F8A1A7',
          color: '#333',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          fontSize: '0.8em',  // フォントサイズを小さくする
        }
      };
    };

    const dayPropGetter = (date: Date) => {
  return {
    style: {
      backgroundColor: 'white',
      transition: 'background-color 0.3s',
      '&:hover': {
        backgroundColor: '#FFF0F1',
      },
    },
  };
};

  return (
    <Grid container spacing={2} sx={{ height: '100%' }}>
      <Grid item xs={12} md={8}>
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
            eventPropGetter={eventStyleGetter}
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
      </Grid>
      <Grid item xs={12} md={4}>
        <ShiftRegistrationForm
          selectedDate={selectedDate}
          selectedEvent={selectedEvent}
          onAddShift={handleAddShift}
          onDeleteShift={handleDeleteShift}
        />
      </Grid>
    </Grid>
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