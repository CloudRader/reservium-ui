import React from 'react';
import DisplayCalendar from '@features/calendar/components/DisplayCalendar';

const CalendarView = ({ googleCalendars }) => {
  return (
    <div className="w-full h-screen dark:!bg-slate-400 shadow-md overflow-hidden no-underline">
      <DisplayCalendar googleCalendars={googleCalendars} />
    </div>
  );
};

export default CalendarView;
