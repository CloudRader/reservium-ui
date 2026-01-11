import React from 'react';
import { useKeycloak } from '@features/auth/hooks/useKeycloak';
import { useReservationData } from '../hooks/useReservationData';
import PulsatingLoader from '@components/ui/feedback/PulsatingLoader';

/**
 * DataLoader Component
 *
 * Loads reservation data after authentication is ready.
 * Uses a render prop pattern to pass data to children.
 * Shows a single loader during data fetching.
 *
 * @param {Object} props
 * @param {Function} props.children - Render prop function receiving { services, calendars, miniServices }
 * @param {React.ReactNode} props.fallback - Loader to show during data loading
 * @returns {React.ReactNode}
 */
const DataLoader = ({ children, fallback = <PulsatingLoader /> }) => {
  const { keycloak, isInitialized } = useKeycloak();

  // Always call the hook unconditionally
  // Enable only when auth is fully ready (prevents race conditions)
  const { data, isLoading, isError, error } = useReservationData({
    enabled: isInitialized && keycloak.authenticated,
  });

  // Show loader while data is loading
  if (isLoading) {
    return fallback;
  }

  // Handle data loading errors
  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Data
          </h2>
          <p className="text-gray-600 mb-4">
            {error?.message || 'Failed to fetch reservation data.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Normalize data structure
  const { services = [], calendars = {}, miniServices = {} } = data || {};

  // Additional validation: if authenticated, ensure services are loaded
  // This prevents rendering routes before data is truly ready
  if (keycloak.authenticated && services.length === 0) {
    return fallback;
  }

  // Pass data to children via render prop
  // This ensures data is always available when routes render
  return children({ services, calendars, miniServices });
};

export default DataLoader;
