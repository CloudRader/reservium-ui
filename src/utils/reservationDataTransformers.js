/**
 * Utility functions for transforming reservation service data
 */

/**
 * Creates calendarIds map from calendars array
 * @param {Array} calendars - Array of calendar objects
 * @returns {Object} Map of reservation_type -> calendar.id
 */
export const transformCalendarIds = (calendars) => {
    return (calendars || []).reduce((acc, calendar) => {
        acc[calendar.reservation_type] = calendar.id;
        return acc;
    }, {});
};

/**
 * Transforms a calendar object to the format used by calendar components
 * @param {Object} calendar - Calendar object from API
 * @param {Object} options - Transformation options
 * @param {boolean} options.includeDeletedAt - Whether to include deleted_at field
 * @returns {Object} Transformed calendar object
 */
export const transformCalendar = (calendar, options = {}) => {
    const transformed = {
        googleCalendarId: calendar.id,
        className: calendar.reservation_type,
        backgroundColor: calendar.color,
        borderColor: calendar.color,
    };

    if (options.includeDeletedAt) {
        transformed.deleted_at = calendar.deleted_at;
    }

    return transformed;
};

/**
 * Transforms an array of calendars
 * @param {Array} calendars - Array of calendar objects
 * @param {Object} options - Transformation options
 * @returns {Array} Array of transformed calendar objects
 */
export const transformCalendars = (calendars, options = {}) => {
    return (calendars || []).map((cal) => transformCalendar(cal, options));
};

/**
 * Transforms a service object to the base format
 * @param {Object} serviceInfo - Service object from API
 * @param {Array} calendars - Array of calendar objects (used for reservation_types and calendarIds)
 * @param {Object} options - Transformation options
 * @param {boolean} options.includeLockersId - Whether to include lockers_id field
 * @param {boolean} options.includeAllFields - Whether to spread all original fields
 * @returns {Object} Transformed service object
 */
export const transformService = (serviceInfo, calendars, options = {}) => {
    const service = {
        wikiLink: serviceInfo.web,
        linkName: serviceInfo.alias,
        serviceName: serviceInfo.name,
        contact_mail: serviceInfo.contact_mail,
        public: serviceInfo.public,
        id: serviceInfo.id,
        reservation_types: (calendars || []).map((cal) => cal.reservation_type),
        calendarIds: transformCalendarIds(calendars),
    };

    if (options.includeDeletedAt) {
        service.deleted_at = serviceInfo.deleted_at;
    }

    if (options.includeLockersId) {
        service.lockers_id =
            (serviceInfo.lockers_id || []).join(',') || '';
    }

    if (options.includeAllFields) {
        return { ...service, ...serviceInfo };
    }

    return service;
};

/**
 * Filters out deleted calendars
 * @param {Array} calendars - Array of calendar objects
 * @returns {Array} Array of non-deleted calendars
 */
export const getActiveCalendars = (calendars) => {
    return (calendars || []).filter((cal) => !cal.deleted_at);
};

/**
 * Checks if a service is valid (public and not deleted)
 * @param {Object} service - Service object
 * @returns {boolean} True if service is valid
 */
export const isServiceValid = (service) => {
    return !service.deleted_at && service.public;
};

