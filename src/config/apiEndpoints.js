/**
 * Centralized API Endpoints Configuration
 *
 * This file contains all backend API endpoints in one place for easy maintenance.
 * Use these endpoint constants instead of hardcoded strings throughout the app.
 *
 * NOTE: These are RELATIVE paths (without API_BASE_URL).
 * The API_BASE_URL is automatically prepended by axios config or useFetch hook.
 *
 * Usage with useFetch:
 *   import { API_ENDPOINTS } from '@config/apiEndpoints';
 *   import { useFetch } from '@features/shared';
 *   const { data } = useFetch(['services'], API_ENDPOINTS.SERVICES.GET_ALL);
 *
 * Usage with axios directly:
 *   import { API_ENDPOINTS } from '@config/apiEndpoints';
 *   import { API_BASE_URL } from '@constants';
 *   axios.get(`${API_BASE_URL}${API_ENDPOINTS.SERVICES.GET_ALL}`);
 */

export const API_ENDPOINTS = {
  // Services (Reservation Services)
  SERVICES: {
    GET_ALL: '/reservation-services/',
    GET_ALL_PUBLIC: '/reservation-services/public',
    GET_ONE: (serviceId) => `/reservation-services/${serviceId}`,
    CREATE: '/reservation-services/',
    UPDATE: (serviceId) => `/reservation-services/${serviceId}`,
    DELETE: (serviceId) => `/reservation-services/${serviceId}`,
    RESTORE: (serviceId) => `/reservation-services/${serviceId}/restore`,
    GET_CALENDARS: (serviceId) => `/reservation-services/${serviceId}/calendars`,
    GET_MINI_SERVICES: (serviceId) => `/reservation-services/${serviceId}/mini-services`,
  },

  // Calendars
  CALENDARS: {
    GET_ALL: (serviceName) => `/${serviceName}/calendars`,
    GET_ONE: (serviceName, calendarId) => `/${serviceName}/calendars/${calendarId}`,
    GET_COLLISIONS: (calendarId) => `/calendars/${calendarId}/collisions`,
    GET_IMPORTABLE: '/calendars/google/importable',
    CREATE: '/calendars/',
    UPDATE: (calendarId) => `/calendars/${calendarId}`,
    DELETE: (calendarId) => `/calendars/${calendarId}`,
    RESTORE: (calendarId) => `/calendars/${calendarId}/restore`,
  },

  // Mini Services
  MINI_SERVICES: {
    GET_ALL: (serviceName) => `/${serviceName}/mini-services`,
    GET_ONE: (miniServiceId) => `/mini-services/${miniServiceId}`,
    CREATE: '/mini-services/',
    UPDATE: (miniServiceId) => `/mini-services/${miniServiceId}`,
    DELETE: (miniServiceId) => `/mini-services/${miniServiceId}`,
    RESTORE: (miniServiceId) => `/mini-services/${miniServiceId}/restore`,
  },

  // Events
  EVENTS: {
    GET_ALL: '/events',
    GET_ONE: (eventId) => `/events/${eventId}`,
    GET_USER_EVENTS: '/users/me/events',
    GET_BY_USER_ROLES: '/events/get-by-user-roles',
    GET_BY_STATUS: (status) => `/events/status/${status}`,
    CREATE: '/events/',
    UPDATE: (eventId) => `/events/${eventId}`,
    DELETE: (eventId) => `/events/${eventId}`,
    APPROVE: (eventId) => `/events/${eventId}/approve`,
    REJECT: (eventId) => `/events/${eventId}/reject`,
    REQUEST_TIME_CHANGE: (eventId) => `/events/${eventId}/request-time-change`,
    APPROVE_TIME_CHANGE: (eventId) => `/events/${eventId}/approve-time-change-request`,
    UPDATE_TIME: (eventId) => `/events/${eventId}/update-time`,
    CANCEL: (eventId) => `/events/${eventId}/cancel`,
  },

  // Reservations
  RESERVATIONS: {
    GET_RESERVATION_DATA: (serviceName) => `/${serviceName}/reservation-data`,
    CREATE: (serviceName) => `/${serviceName}/reservations`,
    CHECK_AVAILABILITY: (serviceName) => `/${serviceName}/check-availability`,
    GET_OCCUPIED_SLOTS: (serviceName, calendarId) => `/${serviceName}/calendars/${calendarId}/occupied-slots`,
  },

  // Emails
  EMAILS: {
    SEND_REGISTRATION_FORM: '/emails/send-registration-form',
    SEND_CONFIRMATION: '/emails/send-confirmation',
    SEND_CANCELLATION: '/emails/send-cancellation',
    SEND_TIME_CHANGE_REQUEST: '/emails/send-time-change-request',
  },

  // View Mode (Public Calendar)
  VIEW: {
    GET_CALENDAR_DATA: (serviceName) => `/view/${serviceName}/calendar-data`,
    GET_EVENTS: (serviceName) => `/view/${serviceName}/events`,
  },

  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh',
    GET_USER: '/auth/user',
    GET_ME: '/users/me',
  },
};

/**
 * Build query string from params object
 * @param {Object} params - Query parameters
 * @returns {string} Query string (e.g., "?page=1&limit=10")
 */
export const buildQueryString = (params) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, value);
    }
  });
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};

/**
 * Build full API URL with query params
 * @param {string} endpoint - Base endpoint URL
 * @param {Object} params - Query parameters
 * @returns {string} Full URL with query string
 */
export const buildApiUrl = (endpoint, params = {}) => {
  const queryString = buildQueryString(params);
  return `${endpoint}${queryString}`;
};
