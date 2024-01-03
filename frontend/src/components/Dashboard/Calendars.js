import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const Calendars = () => {
  const events = [
    {
      id: 1,
      title: 'Task 1',
      start: new Date(2023, 1, 1),
      end: new Date(2023, 1, 5),
    },
    {
      id: 2,
      title: 'Task 2',
      start: new Date(2023, 1, 6),
      end: new Date(2023, 1, 9),
    },
    {
      id: 3,
      title: 'Task 3',
      start: new Date(2023, 1, 10),
      end: new Date(2023, 1, 15),
    },
  ];

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week', 'day']}
        defaultView="week"
      />
    </div>
  );
};

export default Calendars;
