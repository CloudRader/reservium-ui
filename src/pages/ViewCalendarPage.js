import React from 'react';
import KioskCalendar from "../Components/KioskCalendar";

const CalendarView = ({ googleCalendars }) => {
    return (
        <div className="w-full h-screen dark:!bg-slate-400 shadow-md overflow-hidden no-underline">
            <KioskCalendar googleCalendars={googleCalendars} />
        </div>
    );
};

export default CalendarView;