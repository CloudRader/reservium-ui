import { useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '@constants';

/**
 * Custom hook for managing calendar-related data fetching
 * Handles both mini-services and Google calendars
 */
export const useCalendarData = (serviceId) => {
  const [googleCalendars, setGoogleCalendars] = useState([]);
  const [isLoadingCalendars, setIsLoadingCalendars] = useState(false);
  const fetchedRef = useRef(false);

  /**
   * Fetch mini services for the current service
   * Uses ref to prevent duplicate fetches
   */
  const fetchMiniServices = useCallback(
    async (formFields, setFormFields) => {
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
        throw error;
      }
    },
    [serviceId]
  );

  /**
   * Fetch Google calendars for calendar selection
   */
  const fetchGoogleCalendars = useCallback(async () => {
    setIsLoadingCalendars(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/calendars/google/importable`
      );
      setGoogleCalendars(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching Google Calendars:', error);
      throw error;
    } finally {
      setIsLoadingCalendars(false);
    }
  }, []);

  return {
    googleCalendars,
    isLoadingCalendars,
    fetchMiniServices,
    fetchGoogleCalendars,
  };
};
