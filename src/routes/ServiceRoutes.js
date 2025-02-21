import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ReservationPage from '../pages/ReservationPage';
import NotFoundPage from '../pages/NotFoundPage'

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
        ))}
        {/* 404 route */}
        <Route path="*" element={<NotFoundPage />} />
    </Routes>
); 