/**
 * Utility functions for transforming calendar form data into API payload
 */

/**
 * Transform rules group data into API format
 * @param {Object} rulesData - Raw rules data from form
 * @returns {Object} Transformed rules object
 */
const transformRulesGroup = (rulesData = {}) => ({
  night_time: !!rulesData.club_night_time,
  reservation_without_permission: !!rulesData.reservation_without_permission,
  max_reservation_hours: Number(rulesData.max_reservation_hours) || 0,
  in_advance_hours: Number(rulesData.in_advance_hours) || 0,
  in_advance_minutes: Number(rulesData.in_advance_minutes) || 0,
  in_prior_days: Number(rulesData.in_prior_days) || 0,
});

/**
 * Prepare calendar payload for API submission
 * @param {Object} formData - Form data object
 * @param {string} calendarIdInputType - Type of calendar ID input ('manual' or 'select')
 * @param {Array} googleCalendars - List of Google calendars (for select mode)
 * @param {string} serviceId - ID of the reservation service
 * @returns {Object} API-ready payload
 */
export const prepareCalendarPayload = (
  formData,
  calendarIdInputType,
  googleCalendars,
  serviceId
) => {
  // Determine calendar ID and reservation type based on input type
  const calendarId = calendarIdInputType === 'manual' ? '' : formData.calendar_id;
  const reservationType =
    calendarIdInputType === 'manual'
      ? formData.reservation_type
      : googleCalendars.find((cal) => cal.id === formData.calendar_id)?.summary || '';

  return {
    id: calendarId,
    collision_ids: formData.collision_ids || [],
    more_than_max_people_with_permission:
      !!formData.more_than_max_people_with_permission,
    mini_services: formData.mini_services || [],
    color: formData.color,
    reservation_service_id: serviceId,
    reservation_type: reservationType,
    max_people: Number(formData.max_people) || 0,
    collision_with_itself: !!formData.collision_with_itself,
    club_member_rules: transformRulesGroup(formData.club_member_rules),
    active_member_rules: transformRulesGroup(formData.active_member_rules),
    manager_rules: transformRulesGroup(formData.manager_rules),
  };
};
