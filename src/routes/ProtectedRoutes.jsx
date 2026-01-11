import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useKeycloak } from '@features/auth/hooks/useKeycloak';
import MainLayout from '@layouts/MainLayout';
import Dashboard from '@features/dashboard/components/Dashboard';
import ProtectedRoute from '@features/auth/components/ProtectedRoute';
import SuccessPage from '@pages/SuccessPage';
import NotFoundPage from '@pages/NotFoundPage';
import { ManagerRoutes } from '@routes/ManagerRoutes';
import { ServiceRoutes } from '@routes/ServiceRoutes';
import { ROUTES } from '@config/routes';

/**
 * ProtectedRoutes Component
 *
 * Renders all authenticated application routes with guaranteed-ready data.
 * This component only renders after auth and data are fully loaded.
 *
 * @param {Object} props
 * @param {Array} props.services - Available reservation services
 * @param {Object} props.calendars - Service calendars by service name
 * @param {Object} props.miniServices - Mini services by service name
 * @returns {React.ReactNode}
 */
export function ProtectedRoutes({ services, calendars, miniServices }) {
  const { isLoggedIn, username, userId, managerRoles } = useKeycloak();

  return (
    <MainLayout
      isLoggedIn={isLoggedIn}
      username={username}
      services={services}
      isManager={managerRoles?.length > 0}
      showFooter={true}
    >
      <Routes>
        {/* Protected routes - require authentication */}
        <Route
          path={ROUTES.EVENTS}
          element={
            <ProtectedRoute>
              <Dashboard
                userId={userId}
                isManager={managerRoles?.length > 0}
                managerRoles={managerRoles}
              />
            </ProtectedRoute>
          }
        />

        {/* Manager Routes - require authentication and manager role */}
        <Route
          path={`${ROUTES.MANAGER.ROOT}/*`}
          element={
            <ManagerRoutes
              services={services}
              calendars={calendars}
              miniServices={miniServices}
            />
          }
        />

        <Route path={ROUTES.SUCCESS} element={<SuccessPage />} />

        {/* Service Routes - require authentication - must be last before 404 */}
        <Route
          path="/*"
          element={<ServiceRoutes services={services} calendars={calendars} />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MainLayout>
  );
}

export default ProtectedRoutes;
