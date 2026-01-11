import React from 'react';
import AuthGate from '@features/auth/components/AuthGate';
import { DataLoader } from '@features/reservations';
import ProtectedRoutes from './ProtectedRoutes';

/**
 * AuthenticatedRoutes Component
 *
 * Top-level authenticated routes wrapper that handles:
 * 1. Authentication gate (AuthGate)
 * 2. Data loading (DataLoader)
 * 3. Routes rendering (ProtectedRoutes)
 *
 * @returns {React.ReactNode}
 */
export const AuthenticatedRoutes = () => {
  return (
    <AuthGate>
      <DataLoader>
        {({ services, calendars, miniServices }) => (
          <ProtectedRoutes
            services={services}
            calendars={calendars}
            miniServices={miniServices}
          />
        )}
      </DataLoader>
    </AuthGate>
  );
};

export default AuthenticatedRoutes;
