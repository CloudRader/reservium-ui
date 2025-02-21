import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CalendarView from '../pages/ViewCalendarPage';
import { useViewCalendarData } from '../hooks/useViewCalendarData';
import PulsatingLoader from '../Components/PulsatingLoader';

export const ViewCalendarRoutes = () => {
    const { data, isLoading, isError } = useViewCalendarData();

    if (isLoading) {
        return <PulsatingLoader />;
    }

    if (isError) {
        return <div>Error loading data. Please try again later.</div>;
    }

    const { services, calendars } = data || { services: [], calendars: {} };

    return (
        <Routes>
            {services && services.map(service => (
                <Route
                    path={`${service.linkName}`}
                    element={<CalendarView
                        roomCalendarLinks={calendars[service.linkName]}
                    />}
                />
            ))}
        </Routes>
    );
}; 