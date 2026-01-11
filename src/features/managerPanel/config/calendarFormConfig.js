/**
 * Form field configuration for calendar creation
 * Extracted from CreateNewCalendar component for better maintainability
 */

/**
 * Creates common rules field structure to avoid duplication
 * @param {string} groupName - Name of the rules group (club_member_rules, active_member_rules, manager_rules)
 * @param {string} labelText - Display label for the group
 * @returns {Object} Field configuration object
 */
const createRulesGroup = (groupName, labelText) => ({
  name: groupName,
  type: 'group',
  labelText,
  fields: [
    {
      name: 'club_night_time',
      type: 'checkbox',
      sybType: 'oneCheckbox',
      labelText: 'Night Time',
      labelColor: 'text-success',
      options: [{ value: 'true', label: 'True' }],
    },
    {
      name: 'reservation_without_permission',
      type: 'checkbox',
      sybType: 'oneCheckbox',
      labelText: 'Reservation Without Permission',
      labelColor: 'text-success',
      options: [{ value: 'true', label: 'True' }],
    },
    {
      name: 'max_reservation_hours',
      type: 'number',
      labelText: 'Max Reservation Hours',
      labelColor: 'text-success',
    },
    {
      name: 'in_advance_hours',
      type: 'number',
      labelText: 'In Advance Hours',
      labelColor: 'text-success',
    },
    {
      name: 'in_advance_minutes',
      type: 'number',
      labelText: 'In Advance Minutes',
      labelColor: 'text-success',
    },
    {
      name: 'in_prior_days',
      type: 'number',
      labelText: 'In Prior Day',
      labelColor: 'text-success',
    },
  ],
});

/**
 * Get initial calendar form fields configuration
 * @param {Array} serviceCalendars - List of service calendars for collision options
 * @returns {Array} Form fields configuration
 */
export const getCalendarFormFields = (serviceCalendars) => [
  {
    name: 'calendar_id',
    labelText: 'Select Calendar Source',
    labelColor: 'text-success',
  },
  {
    name: 'more_than_max_people_with_permission',
    type: 'checkbox',
    sybType: 'oneCheckbox',
    labelText: 'Allow More Than Max People With Permission',
    labelColor: 'text-success',
    options: [{ value: 'true', label: 'True' }],
  },
  {
    name: 'color',
    type: 'color',
    labelText: 'Calendar Color',
    labelColor: 'text-success',
  },
  {
    name: 'collision_ids',
    type: 'checkbox',
    labelText: 'Collision With Calendars',
    labelColor: 'text-success',
    options: serviceCalendars.map((calendar) => ({
      value: calendar.googleCalendarId,
      label: calendar.className,
    })),
  },
  {
    name: 'mini_services',
    type: 'checkbox',
    labelText: 'Mini Services',
    labelColor: 'text-success',
    options: [], // Will be populated after fetching
  },
  {
    name: 'max_people',
    type: 'number',
    labelText: 'Max People',
    labelColor: 'text-success',
    validation: (value) => value >= 0,
  },
  {
    name: 'collision_with_itself',
    type: 'checkbox',
    sybType: 'oneCheckbox',
    labelText: 'Collision With Itself',
    labelColor: 'text-success',
    options: [{ value: 'true', label: 'True' }],
    validation: (value) => value,
  },
  createRulesGroup('club_member_rules', 'Club Member Rules'),
  createRulesGroup('active_member_rules', 'Active Member Rules'),
  createRulesGroup('manager_rules', 'Manager Rules'),
];
