import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { KeycloakProvider } from '../contexts/KeycloakContext';
import { useKeycloak } from '../hooks/useKeycloak';
import { useReservationData } from '../hooks/useReservationData';
import PulsatingLoader from '../Components/ui/PulsatingLoader';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../Components/dashboard/Dashboard';
import ProtectedRoute from '../Components/auth/ProtectedRoute';
import SuccessPage from '../pages/SuccessPage';
import { ManagerRoutes } from './ManagerRoutes';
import { ServiceRoutes } from './ServiceRoutes';
import { LoginToBackend } from '../Components/auth/LoginToBackend';
import Logout from '../Components/auth/Logout';
import NotFoundPage from '../pages/NotFoundPage';

function AuthenticatedContent() {
  const { isInitialized, isLoggedIn, username, managerRoles, userId, login } =
    useKeycloak();

  const location = useLocation();
  const isViewCalendarRoute = location.pathname.startsWith('/view');
  const isAuthCallbackRoute = ['/logined', '/logout'].includes(
    location.pathname
  );

  const { data, isLoading, isError } = useReservationData();

  // Wait for Keycloak to initialize
  if (!isInitialized) {
    return <PulsatingLoader />;
  }

  // For auth callback routes, render immediately without waiting for data
  if (isAuthCallbackRoute) {
    return (
      <Routes>
        <Route path="/logined" element={<LoginToBackend login={login} />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    );
  }

  // Wait for reservation data
  if (isLoading) {
    return <PulsatingLoader />;
  }

  if (isError) {
    return <div>Error loading data. Please try again later.</div>;
  }

  const { services, calendars, miniServices } = data || {
    services: [],
    calendars: {},
    miniServices: {},
  };

  return (
    <MainLayout
      isLoggedIn={isLoggedIn}
      username={username}
      services={services}
      isManager={managerRoles?.length > 0}
      showFooter={!isViewCalendarRoute}
    >
      <Routes>
        {/* Protected routes - require authentication */}
        <Route
          path="/events"
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
          path="/manager/*"
          element={
            <ManagerRoutes
              services={services}
              calendars={calendars}
              miniServices={miniServices}
            />
          }
        />

        {/* Service Routes - require authentication */}
        <Route
          path="/*"
          element={<ServiceRoutes services={services} calendars={calendars} />}
        />

        <Route path="/success" element={<SuccessPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MainLayout>
  );
}

export const AuthenticatedRoutes = () => {
  return (
    <KeycloakProvider>
      <AuthenticatedContent />
    </KeycloakProvider>
  );
};
