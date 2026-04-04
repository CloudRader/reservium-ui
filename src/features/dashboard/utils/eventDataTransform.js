/**
 * Utility functions for transforming and sanitizing event data
 */

/**
 * Sanitize event data to remove sensitive fields like user_id, calendar_id, email
 * @param {Object} rawEvent - Raw event data from API
 * @returns {Object} Sanitized event data
 */
export const sanitizeEventData = (rawEvent) => {
  return {
    id: rawEvent.id,
    purpose: rawEvent.purpose,
    guests: rawEvent.guests,
    start_datetime: rawEvent.start_datetime || rawEvent.reservation_start,
    end_datetime: rawEvent.end_datetime || rawEvent.reservation_end,
    requested_reservation_start: rawEvent.requested_reservation_start,
    requested_reservation_end: rawEvent.requested_reservation_end,
    event_state: rawEvent.event_state,
    additional_services: rawEvent.additional_services || [],
  };
};

/**
 * Transform API event response to match EventCard format
 * Handles both manager endpoint format and personal endpoint format
 * @param {Object} apiEvent - Raw event from API
 * @returns {Object} Transformed event data
 */
export const transformEvent = (apiEvent) => {
  // Manager endpoint format: { event: {...}, user_name: "...", reservation_service_name: "..." }
  if (apiEvent.event && apiEvent.user_name) {
    return {
      event: sanitizeEventData(apiEvent.event),
      user_name: apiEvent.user_name,
      reservation_service_name: apiEvent.reservation_service_name,
    };
  }

  // Personal endpoint format: direct event object
  return {
    event: sanitizeEventData({
      id: apiEvent.id,
      purpose: apiEvent.purpose,
      reservation_start: apiEvent.reservation_start,
      reservation_end: apiEvent.reservation_end,
      requested_reservation_start: apiEvent.requested_reservation_start,
      requested_reservation_end: apiEvent.requested_reservation_end,
      guests: apiEvent.guests,
      event_state: apiEvent.event_state,
      additional_services: apiEvent.additional_services || [],
    }),
    user_name:
      apiEvent.user?.full_name || apiEvent.user?.username || 'Unknown User',
    reservation_type: apiEvent.calendar?.reservation_type || 'Unknown Type',
    reservation_service_name:
      apiEvent.calendar?.reservation_service?.name || 'Unknown Service',
  };
};
