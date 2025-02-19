import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ReservationPage from '../pages/ReservationPage';
import CalendarView from '../pages/ViewCalendarPage';

export const ServiceRoutes = ({ services, calendars, isLoading, isLoggedIn, logout }) => (
    <Routes>
        {/* Default route */}
        <Route
            path=""
            element={
                <ReservationPage
                    isLoading={isLoading}
                    isLoggedIn={isLoggedIn}
                    onLogout={logout}
                    roomCalendarLinks={calendars["club"]}
                    service={services[0]}
                />
            }
        />

        {services && services.map(service => (
            <React.Fragment key={service.linkName}>
                <Route
                    path={service.linkName}
                    element={<ReservationPage
                        isLoading={isLoading}
                        isLoggedIn={isLoggedIn}
                        onLogout={logout}
                        roomCalendarLinks={calendars[service.linkName]}
                        service={service}
                    />}
                />
                <Route
                    path={`view/${service.linkName}`}
                    element={<CalendarView
                        roomCalendarLinks={calendars[service.linkName]}
                    />}
                />
            </React.Fragment>
        ))}
    </Routes>
); 