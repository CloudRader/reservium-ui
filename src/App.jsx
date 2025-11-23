import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import './config/axiosConfig';
import { queryClient } from './config/queryClient';
import LoginToKeycloak from './Components/auth/LoginToKeycloak';
import { ViewCalendarRoutes } from './routes/ViewCalendarRoutes';
import { AuthenticatedRoutes } from './routes/AuthenticatedRoutes';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {/* Public routes - no auth provider needed */}
        <Route path="/login" element={<LoginToKeycloak />} />
        <Route path="/view/*" element={<ViewCalendarRoutes />} />

        {/* All other routes - wrapped in KeycloakProvider */}
        <Route path="/*" element={<AuthenticatedRoutes />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
