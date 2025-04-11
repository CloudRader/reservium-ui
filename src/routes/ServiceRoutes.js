import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ReservationPage from '../pages/ReservationPage';
import NotFoundPage from '../pages/NotFoundPage'

export const ServiceRoutes = ({ services, calendars, isLoading, isLoggedIn, logout }) => {
    // Create an array of all service link names
    const allServiceLinkNames = services ? services.map(service => service.linkName) : [];

    return (
        <Routes>
            {services && (
                <>
                    <Route
                        path=""
                        element={
                            <ReservationPage
                                isLoading={isLoading}
                                isLoggedIn={isLoggedIn}
                                onLogout={logout}
                                roomCalendarLinks={calendars[allServiceLinkNames[0]]}
                                service={services[0]}
                                allService={allServiceLinkNames}
                            />
                        }
                    />
                    {services.map(service => (
                        <Route
                            key={service.linkName}
                            path={service.linkName}
                            element={<ReservationPage
                                isLoading={isLoading}
                                isLoggedIn={isLoggedIn}
                                onLogout={logout}
                                roomCalendarLinks={calendars[service.linkName]}
                                service={service}
                                allService={allServiceLinkNames}
                            />}
                        />
                    ))}
                </>
            )}

            {/* 404 route */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}; 