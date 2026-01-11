/**
 * Centralized Routes Configuration
 *
 * This file contains all application routes in one place for easy maintenance.
 * Use these route constants instead of hardcoded strings throughout the app.
 *
 * Usage:
 *   import { ROUTES } from '@config/routes';
 *   <Link to={ROUTES.EVENTS}>My Events</Link>
 *   navigate(ROUTES.MANAGER.EDIT_SERVICE('club'));
 */

export const ROUTES = {
  // Root
  HOME: '/',

  // Authentication
  LOGIN: '/login',
  LOGOUT: '/logout',
  LOGINED: '/logined', // Callback after login

  // Events Dashboard
  EVENTS: '/events',

  // Success Page
  SUCCESS: '/success',

  // Manager Panel Routes
  MANAGER: {
    // Root
    ROOT: '/manager',

    // Services Management
    SERVICES: '/manager/manager-panel',
    ADD_SERVICE: '/manager/add-service',
    EDIT_SERVICE: (serviceName) => `/manager/edit-service/${serviceName}`,
    VIEW_SERVICE: (serviceName) => `/manager/view-service/${serviceName}`,

    // Calendars Management
    EDIT_CALENDARS: (serviceName) => `/manager/${serviceName}/edit-calendars`,
    ADD_CALENDAR: (serviceName) => `/manager/${serviceName}/add-calendar`,
    EDIT_CALENDAR: (serviceName, calendarName) => `/manager/edit-calendar/${serviceName}/${calendarName}`,
    VIEW_CALENDAR: (serviceName, calendarName) => `/manager/${serviceName}/view-calendar/${serviceName}/${calendarName}`,

    // Mini Services Management
    EDIT_MINI_SERVICES: (serviceName) => `/manager/${serviceName}/edit-mini-services`,
    ADD_MINI_SERVICE: (serviceName) => `/manager/${serviceName}/add-mini-service`,
    EDIT_MINI_SERVICE: (serviceName, miniServiceName) => `/manager/${serviceName}/edit-mini-service/${serviceName}/${miniServiceName}`,
    VIEW_MINI_SERVICE: (serviceName, miniServiceName) => `/manager/${serviceName}/view-mini-service/${serviceName}/${miniServiceName}`,
  },

  // Service Reservation Pages (Dynamic)
  SERVICE: (serviceName) => `/${serviceName}`,

  // View Mode (Public Calendar)
  VIEW: {
    ROOT: '/view',
    SERVICE: (serviceName) => `/view/${serviceName}`,
  },

  // Test Routes
  TEST: {
    MANAGER_TABLE: '/test-manager-table',
    EDIT_SERVICE: '/test-edit-service',
  },
};

/**
 * Route Patterns for React Router
 * Use these in route definitions with react-router-dom
 */
export const ROUTE_PATTERNS = {
  // Manager Panel Patterns
  MANAGER_SERVICES: '/manager/manager-panel',
  MANAGER_ADD_SERVICE: '/manager/add-service',
  MANAGER_EDIT_SERVICE: '/manager/edit-service/:serviceName',
  MANAGER_VIEW_SERVICE: '/manager/view-service/:serviceName',
  MANAGER_EDIT_CALENDARS: '/manager/edit-calendars/:serviceName',
  MANAGER_ADD_CALENDAR: '/manager/add-calendar/:serviceName',
  MANAGER_EDIT_CALENDAR: '/manager/edit-calendar/:serviceName/:calendarName',
  MANAGER_VIEW_CALENDAR: '/manager/view-calendar/:serviceName/:calendarName',
  MANAGER_EDIT_MINI_SERVICES: '/manager/edit-mini-services/:serviceName',
  MANAGER_ADD_MINI_SERVICE: '/manager/add-mini-service/:serviceName',
  MANAGER_EDIT_MINI_SERVICE: '/manager/edit-mini-service/:serviceName/:miniServiceName',
  MANAGER_VIEW_MINI_SERVICE: '/manager/view-mini-service/:serviceName/:miniServiceName',

  // Service Patterns
  SERVICE: '/:service',
  VIEW_SERVICE: '/view/:service',
};

/**
 * Route path segments for building dynamic routes
 * Use these constants when constructing route paths in route configuration files
 */
export const ROUTE_SEGMENTS = {
  MANAGER: {
    SERVICES: 'manager-panel',
    ADD_SERVICE: 'add-service',
    EDIT_SERVICE: 'edit-service',
    VIEW_SERVICE: 'view-service',
    EDIT_CALENDARS: 'edit-calendars',
    ADD_CALENDAR: 'add-calendar',
    EDIT_CALENDAR: 'edit-calendar',
    VIEW_CALENDAR: 'view-calendar',
    EDIT_MINI_SERVICES: 'edit-mini-services',
    ADD_MINI_SERVICE: 'add-mini-service',
    EDIT_MINI_SERVICE: 'edit-mini-service',
    VIEW_MINI_SERVICE: 'view-mini-service',
  },
  TEST: {
    MANAGER_TABLE: 'test-manager-table',
    EDIT_SERVICE: 'test-edit-service',
  },
};

/**
 * Check if current path is in Manager Panel
 * @param {string} pathname - Current location pathname
 * @returns {boolean} True if in manager panel
 */
export const isManagerRoute = (pathname) => {
  return pathname.startsWith('/manager');
};

/**
 * Check if current path is in View Mode
 * @param {string} pathname - Current location pathname
 * @returns {boolean} True if in view mode
 */
export const isViewMode = (pathname) => {
  return pathname.startsWith('/view');
};

/**
 * Get the base service name from a path
 * @param {string} pathname - Current location pathname
 * @returns {string|null} Service name or null
 */
export const getServiceFromPath = (pathname) => {
  // Remove leading slash and get first segment
  const segments = pathname.split('/').filter(Boolean);

  // Skip if manager or view route
  if (segments[0] === 'manager' || segments[0] === 'view') {
    return segments[1] || null;
  }

  // First segment is the service
  return segments[0] || null;
};
