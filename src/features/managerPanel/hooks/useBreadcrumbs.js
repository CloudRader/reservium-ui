import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { generateManagerBreadcrumbs } from '../utils/breadcrumbUtils';

/**
 * TODO implement proper ui for it
 * Custom hook for generating breadcrumb navigation
 * Currently supports Manager Panel routes only
 *
 * @param {Array} services - Array of service objects for resolving names
 * @returns {Array} Array of breadcrumb items
 */
export const useBreadcrumbs = (services = []) => {
  const location = useLocation();

  const breadcrumbs = useMemo(() => {
    const pathname = location.pathname;

    // Only generate breadcrumbs for Manager Panel routes
    if (!pathname.startsWith('/manager')) {
      return [];
    }

    return generateManagerBreadcrumbs(pathname, services);
  }, [location.pathname, services]);

  return breadcrumbs;
};
