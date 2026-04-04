import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '@features/auth';
import ReservationPage from '@pages/ReservationPage';
import NotFoundPage from '@pages/NotFoundPage';

export const ServiceRoutes = ({ services, calendars }) => {
  const allServiceLinkNames = services.map((service) => service.serviceName);

  return (
    <ProtectedRoute>
      <Routes>
        <Route
          path=""
          element={
            <ReservationPage
              roomCalendarLinks={calendars[Object.keys(calendars)[0]]}
              service={services[0]}
              allService={allServiceLinkNames}
            />
          }
        />
        {services.map((service) => (
          <Route
            key={service.linkName}
            path={service.linkName}
            element={
              <ReservationPage
                roomCalendarLinks={calendars[service.linkName]}
                service={service}
                allService={allServiceLinkNames}
              />
            }
          />
        ))}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ProtectedRoute>
  );
};

export default ServiceRoutes;
