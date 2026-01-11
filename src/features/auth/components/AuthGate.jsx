import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useKeycloak } from '../hooks/useKeycloak';
import { LoginToBackend } from './LoginToBackend';
import Logout from './Logout';
import PulsatingLoader from '@components/ui/feedback/PulsatingLoader';
import { ROUTES } from '@config/routes';

/**
 * AuthGate Component
 *
 * Ensures Keycloak is fully initialized and user info is loaded before rendering children.
 * Handles special authentication callback routes (/logined, /logout) immediately.
 * Shows a single continuous loader during all initialization phases.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to render after auth is ready
 * @param {React.ReactNode} props.fallback - Loader to show during initialization
 * @returns {React.ReactNode}
 */
const AuthGate = ({ children, fallback = <PulsatingLoader /> }) => {
  const { isInitialized, isLoading, initError, keycloak, login } =
    useKeycloak();

  const location = useLocation();

  // PRIORITY 1: Handle auth callback routes FIRST
  // These must bypass ALL loading checks to function properly
  const isAuthCallbackRoute = [ROUTES.LOGINED, ROUTES.LOGOUT].includes(
    location.pathname
  );

  if (isAuthCallbackRoute) {
    return (
      <Routes>
        <Route
          path={ROUTES.LOGINED}
          element={<LoginToBackend login={login} />}
        />
        <Route path={ROUTES.LOGOUT} element={<Logout />} />
      </Routes>
    );
  }

  // PRIORITY 2: Wait for Keycloak initialization
  if (!isInitialized) {
    return fallback;
  }

  // PRIORITY 3: Handle initialization errors
  if (initError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Authentication Failed
          </h2>
          <p className="text-gray-600 mb-4">
            Unable to initialize authentication service.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  // PRIORITY 4: If authenticated, wait for user info to load
  // This ensures isLoggedIn, username, userId, etc. are all available
  if (keycloak.authenticated && isLoading) {
    return fallback;
  }

  // PRIORITY 5: Auth is fully ready - render children
  return children;
};

export default AuthGate;
