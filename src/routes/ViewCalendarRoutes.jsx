import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import CalendarView from '../pages/ViewCalendarPage';
import { useViewCalendarData } from '../hooks/useViewCalendarData';
import NotFoundPage from '../pages/NotFoundPage';
import PulsatingLoader from '../Components/ui/PulsatingLoader';

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
        <>
            <Routes>
                {/* Default route that redirects to the first calendar if available */}
                <Route
                    path="/"
                    element={
                        services && services.length > 0 ? (
                            <Navigate to={`/view/${services[0].linkName}`} replace />
                        ) : (
                            <div>No calendars available</div>
                        )
                    }
                />

                {/* Routes for each service */}
                {services && services.map(service => (
                    <Route
                        key={service.linkName}
                        path={`${service.linkName}`}
                        element={<CalendarView
                            googleCalendars={calendars[service.linkName]}
                        />}
                    />
                ))}
                {/* 404 route */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    );
}; 