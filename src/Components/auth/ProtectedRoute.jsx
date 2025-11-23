import React from 'react';
import { Navigate } from 'react-router-dom';
import { useKeycloak } from '../../hooks/useKeycloak';
import PulsatingLoader from '../ui/PulsatingLoader';
import LoginInfoPage from '../../pages/LoginInfoPage';

const ProtectedRoute = ({ children, requireManager = false }) => {
  const { isInitialized, isLoggedIn, managerRoles, authState } = useKeycloak();

  // Wait for Keycloak to initialize
  if (!isInitialized) {
    return <PulsatingLoader />;
  }

  // Wait for auth state to be determined
  if (authState === 'loading') {
    return <PulsatingLoader />;
  }

  // Check if user is logged in
  if (!isLoggedIn) {
    return <LoginInfoPage />;
  }

  // Check if manager role is required
  if (requireManager && (!managerRoles || managerRoles.length === 0)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

