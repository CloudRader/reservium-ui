import React from 'react';
import { mockGoogleCalendars } from "../tests/mockCalendars";
import KioskCalendar from "../Components/KioskCalendar";

const CalendarView = ({ roomCalendarLinks }) => {

    return (
        <div className={`w-full dark:!bg-slate-400 shadow-md overflow-hidden p-10 no-underline`}>
            <KioskCalendar googleCalendars={mockGoogleCalendars} />
        </div>
    );
};

export default CalendarView;