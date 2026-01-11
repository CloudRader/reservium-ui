/**
 * Breadcrumb Configuration for Manager Panel
 *
 * Defines breadcrumb labels and hierarchy for Manager Panel routes only.
 * This configuration is used to generate breadcrumb navigation trails.
 */

export const MANAGER_BREADCRUMB_CONFIG = {
  // Manager Panel Root
  '/manager': {
    label: 'Manager Panel',
  },

  // Services Management
  '/manager/manager-panel': {
    label: 'Services',
    parent: '/manager',
  },
  '/manager/add-service': {
    label: 'Add Service',
    parent: '/manager/manager-panel',
  },
  '/manager/edit-service': {
    label: 'Edit Service',
    parent: '/manager/manager-panel',
    dynamic: true,
  },
  '/manager/view-service': {
    label: 'View Service',
    parent: '/manager/manager-panel',
    dynamic: true,
  },

  // Calendars Management
  '/manager/edit-calendars': {
    label: 'Calendars',
    dynamic: true, // serviceName in path
  },
  '/manager/add-calendar': {
    label: 'Add Calendar',
    dynamic: true,
  },
  '/manager/edit-calendar': {
    label: 'Edit Calendar',
    dynamic: true,
  },
  '/manager/view-calendar': {
    label: 'View Calendar',
    dynamic: true,
  },

  // Mini Services Management
  '/manager/edit-mini-services': {
    label: 'Mini Services',
    dynamic: true,
  },
  '/manager/add-mini-service': {
    label: 'Add Mini Service',
    dynamic: true,
  },
  '/manager/edit-mini-service': {
    label: 'Edit Mini Service',
    dynamic: true,
  },
  '/manager/view-mini-service': {
    label: 'View Mini Service',
    dynamic: true,
  },
};

/**
 * Get breadcrumb configuration for a route pattern
 * @param {string} pattern - Route pattern (e.g., '/manager/edit-service')
 * @returns {object|null} Breadcrumb configuration or null
 */
export const getBreadcrumbConfig = (pattern) => {
  return MANAGER_BREADCRUMB_CONFIG[pattern] || null;
};
