import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import './config/axiosConfig';
import { queryClient } from './config/queryClient';
import { KeycloakProvider } from '@features/auth/context/KeycloakContext';
import { AuthenticatedRoutes } from '@routes/AuthenticatedRoutes';
import { ViewCalendarRoutes } from '@routes/ViewCalendarRoutes';
import { LoginToKeycloak } from '@features/auth';
import { toastConfig } from '@config/toastConfig';
import { ROUTES } from '@config/routes';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <KeycloakProvider>
        <Toaster
          position={toastConfig.position}
          toastOptions={{
            duration: toastConfig.duration,
            success: toastConfig.success,
            error: toastConfig.error,
            loading: toastConfig.loading,
          }}
        />
        <Routes>
          <Route path={ROUTES.LOGIN} element={<LoginToKeycloak />} />
          <Route
            path={`${ROUTES.VIEW.ROOT}/*`}
            element={<ViewCalendarRoutes />}
          />
          {/* All routes - wrapped in KeycloakProvider */}
          <Route path="/*" element={<AuthenticatedRoutes />} />
        </Routes>
      </KeycloakProvider>
    </QueryClientProvider>
  );
}

export default App;
