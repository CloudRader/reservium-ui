import React, { useState } from 'react';
import { useEvents } from '../hooks/useEvents';
import { useEventHandlers } from '../hooks/useEventHandlers';
import { useEventsData } from '../hooks/useEventsData';
import EventsTable from './EventsTable';
import PulsatingLoader from '@components/ui/feedback/PulsatingLoader';
import { APP_SETTINGS } from '@config/appSettings';
import { getActionsForContext } from '../config/eventActions';

const EventsList = ({
  activeTab,
  onRequestTimeChange,
  onUpdateTime,
  onDelete,
  onApproveTime,
  onApproveEvent,
  isManager,
  userId,
  managerRoles,
}) => {
  const [upcomingPage, setUpcomingPage] = useState(1);
  const [pastPage, setPastPage] = useState(1);

  const isPersonalTab = activeTab === 'personal';
  const personalLimit = APP_SETTINGS.PAGINATION_LIMIT + 1; // Overfetch by 1 to detect next page

  // Fetch upcoming events (personal tab only) - using unified hook
  const {
    data: upcomingData,
    isLoading: isUpcomingLoading,
    refetch: refetchUpcoming,
  } = useEvents({
    userId,
    activeTab: 'personal',
    page: upcomingPage,
    limit: personalLimit,
    past: false,
  });

  // Fetch past events (personal tab only) - using unified hook
  const {
    data: pastData,
    isLoading: isPastLoading,
    refetch: refetchPast,
  } = useEvents({
    userId,
    activeTab: 'personal',
    page: pastPage,
    limit: personalLimit,
    past: true,
  });

  // Fetch manager events (manager tabs only) - using unified hook
  const {
    data: managerData,
    isLoading: isManagerLoading,
    refetch: refetchManager,
  } = useEvents({
    userId,
    activeTab,
    managerRoles,
  });

  // Wrap handlers with refetch logic
  const handlers = useEventHandlers({
    onDelete,
    onRequestTimeChange,
    onUpdateTime,
    onApproveTime,
    onApproveEvent,
    refetchUpcoming,
    refetchPast,
    refetchManager,
    isPersonalTab,
  });

  // Process events data
  const {
    upcomingEvents,
    pastEvents,
    managerEvents,
    hasMoreUpcoming,
    hasMorePast,
    showUpcomingPagination,
    showPastPagination,
  } = useEventsData({
    upcomingData,
    pastData,
    managerData,
    isPersonalTab,
    upcomingPage,
    pastPage,
  });

  // Get actions based on context
  const actions = getActionsForContext(activeTab, isPersonalTab, isManager, handlers);

  // Loading state
  if (
    (isPersonalTab && isUpcomingLoading && upcomingPage === 1) ||
    (isManagerLoading && !isPersonalTab)
  ) {
    return <PulsatingLoader />;
  }

  // Personal tab - show two tables (upcoming and past)
  if (isPersonalTab) {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Upcoming Events
          </h2>
          <EventsTable
            title="Upcoming Events"
            events={upcomingEvents}
            actions={actions}
            currentPage={upcomingPage}
            onPageChange={setUpcomingPage}
            hasMore={hasMoreUpcoming}
            isLoading={isUpcomingLoading}
            showPagination={showUpcomingPagination}
            emptyMessage="You don't have any upcoming events."
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Past Events
          </h2>
          <EventsTable
            title="Past Events"
            events={pastEvents}
            actions={actions}
            currentPage={pastPage}
            onPageChange={setPastPage}
            hasMore={hasMorePast}
            isLoading={isPastLoading}
            showPagination={showPastPagination}
            emptyMessage="You don't have any past events."
          />
        </div>
      </div>
    );
  }

  // Manager tabs - show single table
  return (
    <EventsTable
      events={managerEvents}
      actions={actions}
      showPagination={false}
      showRequestedTime={activeTab === 'update_requested'}
      emptyMessage="There are no events to manage at the moment."
    />
  );
};

export default EventsList;
