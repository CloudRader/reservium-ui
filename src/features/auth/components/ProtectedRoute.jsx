import React from 'react';
import { Navigate } from 'react-router-dom';
import { useKeycloak } from '../hooks/useKeycloak';
import LoginInfoPage from '@pages/LoginInfoPage';

/**
 * ProtectedRoute Component
 *
 * Authorization-only guard for routes.
 * This component only checks authorization (not authentication state).
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to render if authorized
 * @param {boolean} props.requireManager - Whether manager role is required
 * @returns {React.ReactNode}
 */
const ProtectedRoute = ({ children, requireManager = false }) => {
  const { isLoggedIn, managerRoles } = useKeycloak();

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

