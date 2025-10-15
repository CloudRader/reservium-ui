import React, { useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../constants';
import UniversalLayout from '../../layouts/UniversalLayout.jsx';
import useCreateFormLogic from '../../hooks/useCreateFormLogic.js';
import SuccessErrorMessage from '../ui/SuccessErrorMessage.jsx';
import CalendarIdInput from './CalendarIdInput.jsx';
import FormFieldRenderer from '../ui/FormFieldRenderer.jsx';

axios.defaults.withCredentials = true;

const CreateNewCalendar = ({ serviceId, serviceCalendars }) => {
  const [googleCalendars, setGoogleCalendars] = useState([]);
  const [isLoadingCalendars, setIsLoadingCalendars] = useState(false);
  const [calendarIdInputType, setCalendarIdInputType] = useState('manual');

  const initialFields = [
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
    {
      name: 'club_member_rules',
      type: 'group',
      labelText: 'Club Member Rules',
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
    },
    {
      name: 'active_member_rules',
      type: 'group',
      labelText: 'Active Member Rules',
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
    },
    {
      name: 'manager_rules',
      type: 'group',
      labelText: 'Manager Rules',
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
    },
  ];

  const fetchedRef = useRef(false);

  const {
    formFields,
    formData,
    message,
    setFormFields,
    handleSubmit,
    setMessage,
    handleChange,
  } = useCreateFormLogic(initialFields, `${API_BASE_URL}/calendars/`);

  const fetchMiniServices = useCallback(async () => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    try {
      const response = await axios.get(
        `${API_BASE_URL}/reservation-services/${serviceId}/mini-services`
      );
      const updatedFields = formFields.map((field) => {
        if (field.name === 'mini_services') {
          return {
            ...field,
            options: response.data.map((service) => ({
              value: service.id,
              label: service.name,
            })),
          };
        }
        return field;
      });
      setFormFields(updatedFields);
    } catch (error) {
      console.error('Error fetching mini services:', error);
    }
  }, [serviceId, formFields, setFormFields]);

  // Call fetchMiniServices immediately after definition
  fetchMiniServices();

  const preparePayload = useCallback(() => {
    const clubMemberRules = formData.club_member_rules || {};
    const activeMemberRules = formData.active_member_rules || {};
    const managerRules = formData.manager_rules || {};

    return {
      id: calendarIdInputType === 'manual' ? '' : formData.calendar_id,
      collision_ids: formData.collision_ids || [],
      more_than_max_people_with_permission:
        !!formData.more_than_max_people_with_permission,
      mini_services: formData.mini_services || [],
      color: formData.color,
      reservation_service_id: serviceId,
      reservation_type:
        calendarIdInputType === 'manual'
          ? formData.reservation_type
          : googleCalendars.find((cal) => cal.id === formData.calendar_id)
              ?.summary || '',
      max_people: Number(formData.max_people) || 0,
      collision_with_itself: !!formData.collision_with_itself,

      club_member_rules: {
        night_time: !!clubMemberRules.club_night_time,
        reservation_without_permission:
          !!clubMemberRules.reservation_without_permission,
        max_reservation_hours:
          Number(clubMemberRules.max_reservation_hours) || 0,
        in_advance_hours: Number(clubMemberRules.in_advance_hours) || 0,
        in_advance_minutes: Number(clubMemberRules.in_advance_minutes) || 0,
        in_prior_days: Number(clubMemberRules.in_prior_days) || 0,
      },
      active_member_rules: {
        night_time: !!activeMemberRules.club_night_time,
        reservation_without_permission:
          !!activeMemberRules.reservation_without_permission,
        max_reservation_hours:
          Number(activeMemberRules.max_reservation_hours) || 0,
        in_advance_hours: Number(activeMemberRules.in_advance_hours) || 0,
        in_advance_minutes: Number(activeMemberRules.in_advance_minutes) || 0,
        in_prior_days: Number(activeMemberRules.in_prior_days) || 0,
      },
      manager_rules: {
        night_time: !!managerRules.club_night_time,
        reservation_without_permission:
          !!managerRules.reservation_without_permission,
        max_reservation_hours: Number(managerRules.max_reservation_hours) || 0,
        in_advance_hours: Number(managerRules.in_advance_hours) || 0,
        in_advance_minutes: Number(managerRules.in_advance_minutes) || 0,
        in_prior_days: Number(managerRules.in_prior_days) || 0,
      },
    };
  }, [formData, calendarIdInputType, googleCalendars, serviceId]);

  const makeSubmit = (e) => {
    e.preventDefault();
    try {
      const payload = preparePayload();
      handleSubmit(payload);
    } catch (err) {
      console.error('Prepare payload error:', err);
      setMessage({ type: 'error', text: err?.message || 'Invalid form data' });
    }
  };

  const fetchGoogleCalendars = useCallback(async () => {
    setIsLoadingCalendars(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/calendars/google/importable`
      );
      setGoogleCalendars(response.data);
      setCalendarIdInputType('select');
    } catch (error) {
      console.error('Error fetching Google Calendars:', error);
      setMessage({ type: 'error', text: 'Failed to fetch Google Calendars' });
    } finally {
      setIsLoadingCalendars(false);
    }
  }, [setMessage]);

  return (
    <UniversalLayout
      centerContent
      whiteBackGreenContentBackground
      headerTittle={'Create New Calendar'}
    >
      <div className="bg-white p-4 rounded-lg shadow">
        <form onSubmit={makeSubmit} className="space-y-5">
          <CalendarIdInput
            calendarIdInputType={calendarIdInputType}
            setCalendarIdInputType={setCalendarIdInputType}
            isLoadingCalendars={isLoadingCalendars}
            fetchGoogleCalendars={fetchGoogleCalendars}
            googleCalendars={googleCalendars}
            formData={formData}
            handleChange={handleChange}
          />
          {formFields.map(
            (field) =>
              field.name !== 'calendar_id' && (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-green-700 mb-1"
                  >
                    {field.labelText}
                  </label>
                  <FormFieldRenderer
                    field={field}
                    formData={formData}
                    handleChange={handleChange}
                  />
                </div>
              )
          )}
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Create Calendar
          </button>
        </form>

        {message && <SuccessErrorMessage message={message} />}
      </div>
    </UniversalLayout>
  );
};

export default CreateNewCalendar;
