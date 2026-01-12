import { useMemo } from 'react';
import { APP_SETTINGS } from '@config/appSettings';
import { transformEvent } from '../utils/eventDataTransform';

/**
 * Custom hook for processing events data
 * Handles pagination logic and data transformation
 * @param {Object} props - Hook props
 * @param {Array} props.upcomingData - Raw upcoming events data
 * @param {Array} props.pastData - Raw past events data
 * @param {Array} props.managerData - Raw manager events data
 * @param {boolean} props.isPersonalTab - Is personal tab active
 * @param {number} props.upcomingPage - Current upcoming page
 * @param {number} props.pastPage - Current past page
 * @returns {Object} Processed events data
 */
export const useEventsData = ({
  upcomingData,
  pastData,
  managerData,
  isPersonalTab,
  upcomingPage,
  pastPage,
}) => {
  const processedData = useMemo(() => {
    // Convert to arrays
    const upcomingArray = Array.isArray(upcomingData) ? upcomingData : [];
    const pastArray = Array.isArray(pastData) ? pastData : [];

    // Check if there are more items
    const hasMoreUpcoming = isPersonalTab && upcomingArray.length > APP_SETTINGS.PAGINATION_LIMIT;
    const hasMorePast = isPersonalTab && pastArray.length > APP_SETTINGS.PAGINATION_LIMIT;

    // Transform events (slice to limit and transform)
    const upcomingEvents = upcomingArray
      .slice(0, APP_SETTINGS.PAGINATION_LIMIT)
      .map(transformEvent);
    const pastEvents = pastArray
      .slice(0, APP_SETTINGS.PAGINATION_LIMIT)
      .map(transformEvent);
    const managerEvents = managerData?.map(transformEvent) || [];

    // Pagination visibility logic
    const showUpcomingPagination =
      isPersonalTab &&
      (upcomingEvents.length >= 10 || hasMoreUpcoming || upcomingPage > 1);
    const showPastPagination =
      isPersonalTab && (pastEvents.length >= 10 || hasMorePast || pastPage > 1);

    return {
      upcomingEvents,
      pastEvents,
      managerEvents,
      hasMoreUpcoming,
      hasMorePast,
      showUpcomingPagination,
      showPastPagination,
    };
  }, [upcomingData, pastData, managerData, isPersonalTab, upcomingPage, pastPage]);

  return processedData;
};
