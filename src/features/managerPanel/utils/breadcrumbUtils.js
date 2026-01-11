/**
 * Breadcrumb Utility Functions
 *
 * Helper functions for generating and formatting breadcrumb navigation
 */

import { MANAGER_BREADCRUMB_CONFIG } from '../config/breadcrumbConfig';

/**
 * Format a URL parameter into a human-readable label
 * Examples:
 *   'club' → 'Club'
 *   'sauna-room' → 'Sauna Room'
 *   'main-hall-calendar' → 'Main Hall Calendar'
 *   'Club%20Room' → 'Club Room'
 *
 * @param {string} param - URL parameter value
 * @returns {string} Formatted label
 */
export const formatParamLabel = (param) => {
  if (!param) return '';

  // Decode URL encoding first
  const decoded = decodeURIComponent(param);

  return decoded
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Resolve service name from URL param using services array
 * Falls back to formatted param if service not found
 *
 * @param {string} serviceParam - Service URL parameter (e.g., 'club')
 * @param {Array} services - Array of service objects with linkName and serviceName
 * @returns {string} Service display name
 */
export const resolveServiceName = (serviceParam, services = []) => {
  if (!serviceParam) return '';

  // Decode URL encoding first
  const decoded = decodeURIComponent(serviceParam);

  // Try to find service in array (compare both linkName and serviceName with decoded value)
  const service = services.find(s =>
    s.linkName === decoded ||
    s.linkName === serviceParam ||
    s.serviceName === decoded ||
    s.serviceName === serviceParam
  );

  // Return service name if found, otherwise format the param
  return service ? service.serviceName : formatParamLabel(decoded);
};

/**
 * Generate breadcrumb trail for Manager Panel routes
 *
 * @param {string} pathname - Current URL pathname
 * @param {Array} services - Array of service objects
 * @returns {Array} Array of breadcrumb items: [{ label, href, isActive }]
 */
export const generateManagerBreadcrumbs = (pathname, services = []) => {
  const breadcrumbs = [];
  const segments = pathname.split('/').filter(Boolean);

  // Must start with 'manager'
  if (segments[0] !== 'manager') return [];

  // Always start with Manager Panel root
  breadcrumbs.push({
    label: 'Manager Panel',
    href: '/manager/manager-panel',
    isActive: false,
  });

  // If we're at root, mark it as active and return
  if (pathname === '/manager' || pathname === '/manager/manager-panel') {
    breadcrumbs[0].isActive = true;
    return breadcrumbs;
  }

  // Parse the route to build breadcrumbs
  const action = segments[1]; // e.g., 'add-service', 'edit-service', 'view-mini-service'

  // Add "Services" breadcrumb for most routes
  if (action && action !== 'manager-panel') {
    breadcrumbs.push({
      label: 'Services',
      href: '/manager/manager-panel',
      isActive: false,
    });
  }

  // Handle different route patterns
  if (action === 'add-service') {
    // /manager/add-service
    breadcrumbs.push({
      label: 'Add Service',
      href: pathname,
      isActive: true,
    });
  } else if (action === 'edit-service' || action === 'view-service') {
    // /manager/edit-service/:serviceName or /manager/view-service/:serviceName
    const serviceName = segments[2];
    if (serviceName) {
      const serviceLabel = resolveServiceName(serviceName, services);
      breadcrumbs.push({
        label: serviceLabel,
        href: pathname,
        isActive: false,
      });
      breadcrumbs.push({
        label: action === 'edit-service' ? 'Edit Service' : 'View Service',
        href: pathname,
        isActive: true,
      });
    }
  } else if (action === 'edit-calendars') {
    // /manager/edit-calendars/:linkName (uses linkName)
    const linkName = segments[2];
    if (linkName) {
      const serviceLabel = resolveServiceName(linkName, services);
      // Find serviceName from services array for the view-service link
      const decoded = decodeURIComponent(linkName);
      const service = services.find(s => s.linkName === decoded || s.linkName === linkName);
      const serviceName = service ? service.serviceName : decoded;

      breadcrumbs.push({
        label: serviceLabel,
        href: `/manager/view-service/${serviceName}`,
        isActive: false,
      });
      breadcrumbs.push({
        label: 'Calendars',
        href: pathname,
        isActive: true,
      });
    }
  } else if (action === 'add-calendar') {
    // /manager/add-calendar/:linkName (uses linkName)
    const linkName = segments[2];
    if (linkName) {
      const serviceLabel = resolveServiceName(linkName, services);
      // Find serviceName from services array for the view-service link
      const decoded = decodeURIComponent(linkName);
      const service = services.find(s => s.linkName === decoded || s.linkName === linkName);
      const serviceName = service ? service.serviceName : decoded;

      breadcrumbs.push({
        label: serviceLabel,
        href: `/manager/view-service/${serviceName}`,
        isActive: false,
      });
      breadcrumbs.push({
        label: 'Calendars',
        href: `/manager/edit-calendars/${linkName}`,
        isActive: false,
      });
      breadcrumbs.push({
        label: 'Add Calendar',
        href: pathname,
        isActive: true,
      });
    }
  } else if (action === 'edit-calendar' || action === 'view-calendar') {
    // /manager/edit-calendar/:linkName/:calendarName or /manager/view-calendar/:linkName/:calendarName
    const linkName = segments[2];
    const calendarName = segments[3];
    if (linkName) {
      const serviceLabel = resolveServiceName(linkName, services);
      // Find serviceName from services array for the view-service link
      const decoded = decodeURIComponent(linkName);
      const service = services.find(s => s.linkName === decoded || s.linkName === linkName);
      const serviceName = service ? service.serviceName : decoded;

      breadcrumbs.push({
        label: serviceLabel,
        href: `/manager/view-service/${serviceName}`,
        isActive: false,
      });
      breadcrumbs.push({
        label: 'Calendars',
        href: `/manager/edit-calendars/${linkName}`,
        isActive: false,
      });
      if (calendarName) {
        breadcrumbs.push({
          label: formatParamLabel(calendarName),
          href: pathname,
          isActive: false,
        });
        breadcrumbs.push({
          label: action === 'edit-calendar' ? 'Edit Calendar' : 'View Calendar',
          href: pathname,
          isActive: true,
        });
      }
    }
  } else if (action === 'edit-mini-services') {
    // /manager/edit-mini-services/:linkName (uses linkName)
    const linkName = segments[2];
    if (linkName) {
      const serviceLabel = resolveServiceName(linkName, services);
      // Find serviceName from services array for the view-service link
      const decoded = decodeURIComponent(linkName);
      const service = services.find(s => s.linkName === decoded || s.linkName === linkName);
      const serviceName = service ? service.serviceName : decoded;

      breadcrumbs.push({
        label: serviceLabel,
        href: `/manager/view-service/${serviceName}`,
        isActive: false,
      });
      breadcrumbs.push({
        label: 'Mini Services',
        href: pathname,
        isActive: true,
      });
    }
  } else if (action === 'add-mini-service') {
    // /manager/add-mini-service/:linkName (uses linkName)
    const linkName = segments[2];
    if (linkName) {
      const serviceLabel = resolveServiceName(linkName, services);
      // Find serviceName from services array for the view-service link
      const decoded = decodeURIComponent(linkName);
      const service = services.find(s => s.linkName === decoded || s.linkName === linkName);
      const serviceName = service ? service.serviceName : decoded;

      breadcrumbs.push({
        label: serviceLabel,
        href: `/manager/view-service/${serviceName}`,
        isActive: false,
      });
      breadcrumbs.push({
        label: 'Mini Services',
        href: `/manager/edit-mini-services/${linkName}`,
        isActive: false,
      });
      breadcrumbs.push({
        label: 'Add Mini Service',
        href: pathname,
        isActive: true,
      });
    }
  } else if (action === 'edit-mini-service' || action === 'view-mini-service') {
    // /manager/edit-mini-service/:linkName/:miniServiceName or /manager/view-mini-service/:linkName/:miniServiceName
    const linkName = segments[2];
    const miniServiceName = segments[3];
    if (linkName) {
      const serviceLabel = resolveServiceName(linkName, services);
      // Find serviceName from services array for the view-service link
      const decoded = decodeURIComponent(linkName);
      const service = services.find(s => s.linkName === decoded || s.linkName === linkName);
      const serviceName = service ? service.serviceName : decoded;

      breadcrumbs.push({
        label: serviceLabel,
        href: `/manager/view-service/${serviceName}`,
        isActive: false,
      });
      breadcrumbs.push({
        label: 'Mini Services',
        href: `/manager/edit-mini-services/${linkName}`,
        isActive: false,
      });
      if (miniServiceName) {
        breadcrumbs.push({
          label: formatParamLabel(miniServiceName),
          href: pathname,
          isActive: false,
        });
        breadcrumbs.push({
          label: action === 'edit-mini-service' ? 'Edit Mini Service' : 'View Mini Service',
          href: pathname,
          isActive: true,
        });
      }
    }
  }

  return breadcrumbs;
};

/**
 * Truncate breadcrumbs for mobile display
 * Shows first item, ellipsis, and last 2 items
 *
 * @param {Array} breadcrumbs - Full breadcrumb array
 * @param {number} maxItems - Maximum items to show (default: 3 for mobile)
 * @returns {Array} Truncated breadcrumb array
 */
export const truncateBreadcrumbs = (breadcrumbs, maxItems = 3) => {
  if (breadcrumbs.length <= maxItems) {
    return breadcrumbs;
  }

  // Show first item, ellipsis, and last 2 items
  const truncated = [
    breadcrumbs[0],
    { label: '...', href: null, isActive: false, isEllipsis: true },
    ...breadcrumbs.slice(-2),
  ];

  return truncated;
};
