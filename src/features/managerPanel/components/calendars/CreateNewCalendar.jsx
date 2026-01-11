import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '@constants';
import UniversalLayout from '@layouts/UniversalLayout.jsx';
import useCreateFormLogic from '../../hooks/useCreateFormLogic.js';
import SuccessErrorMessage from '@components/ui/feedback/SuccessErrorMessage.jsx';
import CalendarIdInput from './CalendarIdInput.jsx';
import FormFieldRenderer from '@components/ui/forms/FormFieldRenderer.jsx';
import { getCalendarFormFields } from '../../config/calendarFormConfig.js';
import { prepareCalendarPayload } from '../../utils/calendarPayloadUtils.js';
import { useCalendarData } from '../../hooks/useCalendarData.js';

const CreateNewCalendar = ({ serviceId, serviceCalendars }) => {
  const [calendarIdInputType, setCalendarIdInputType] = useState('manual');

  // Use custom hook for calendar data fetching
  const {
    googleCalendars,
    isLoadingCalendars,
    fetchMiniServices,
    fetchGoogleCalendars: fetchGoogleCals,
  } = useCalendarData(serviceId);

  // Get initial form fields from config
  const initialFields = getCalendarFormFields(serviceCalendars);

  const {
    formFields,
    formData,
    message,
    setFormFields,
    handleSubmit,
    setMessage,
    handleChange,
  } = useCreateFormLogic(initialFields, `${API_BASE_URL}/calendars/`);

  // Fetch mini services on mount
  useEffect(() => {
    fetchMiniServices(formFields, setFormFields);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle Google calendars fetching
  const handleFetchGoogleCalendars = async () => {
    try {
      await fetchGoogleCals();
      setCalendarIdInputType('select');
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to fetch Google Calendars' });
    }
  };

  // Handle form submission
  const makeSubmit = (e) => {
    e.preventDefault();
    try {
      const payload = prepareCalendarPayload(
        formData,
        calendarIdInputType,
        googleCalendars,
        serviceId
      );
      handleSubmit(payload);
    } catch (err) {
      console.error('Prepare payload error:', err);
      setMessage({ type: 'error', text: err?.message || 'Invalid form data' });
    }
  };

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
            fetchGoogleCalendars={handleFetchGoogleCalendars}
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
