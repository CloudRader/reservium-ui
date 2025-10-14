import React, { useState } from 'react';
import { useEventsWithPagination } from '../../hooks/useEventsWithPagination';
import { useEvents } from '../../hooks/useEvents';
import EventsTable from './EventsTable';
import PulsatingLoader from '../ui/PulsatingLoader';
import { PAGINATION_LIMIT } from '../../constants';

const EventsList = ({ activeTab, onUpdateTime, onDelete, onApproveTime, onApproveEvent, isManager, userId, managerRoles }) => {
  const [upcomingPage, setUpcomingPage] = useState(1);
  const [pastPage, setPastPage] = useState(1);

  // Use different hooks based on activeTab
  const isPersonalTab = activeTab === 'personal';

  // For personal tab - use pagination for both upcoming and past
  const {
    data: upcomingData,
    isLoading: isUpcomingLoading,
    refetch: refetchUpcoming,
  } = useEventsWithPagination(upcomingPage, PAGINATION_LIMIT, false);

  const {
    data: pastData,
    isLoading: isPastLoading,
    refetch: refetchPast,
  } = useEventsWithPagination(pastPage, PAGINATION_LIMIT, true);

  // For manager tabs - use the old hook
  const {
    data: managerData,
    isLoading: isManagerLoading,
    refetch: refetchManager,
  } = useEvents(userId, activeTab, managerRoles);

  // Transform API response to match EventCard format
  const transformEvent = (apiEvent) => {
    // Check if already transformed (from useEvents)
    if (apiEvent.event && apiEvent.user_name) {
      return apiEvent;
    }

    // Transform from useEventsWithPagination format
    return {
      event: {
        id: apiEvent.id,
        purpose: apiEvent.purpose,
        start_datetime: apiEvent.reservation_start,
        end_datetime: apiEvent.reservation_end,
        guests: apiEvent.guests,
        event_state: apiEvent.event_state,
        additional_services: apiEvent.additional_services || []
      },
      user_name: apiEvent.user?.full_name || apiEvent.user?.username || 'Unknown User',
      reservation_type: apiEvent.calendar?.reservation_type || 'Unknown Type',
      reservation_service_name: apiEvent.calendar?.reservation_service?.name || 'Unknown Service'
    };
  };

  const upcomingEvents = upcomingData?.map(transformEvent) || [];
  const pastEvents = pastData?.map(transformEvent) || [];
  const managerEvents = managerData?.map(transformEvent) || [];

  const hasMoreUpcoming = isPersonalTab && upcomingData?.length === PAGINATION_LIMIT;
  const hasMorePast = isPersonalTab && pastData?.length === PAGINATION_LIMIT;
  const showUpcomingPagination = isPersonalTab && (upcomingEvents.length >= 10 || hasMoreUpcoming || upcomingPage > 1);
  const showPastPagination = isPersonalTab && (pastEvents.length >= 10 || hasMorePast || pastPage > 1);

  // Wrap handlers to include refetch
  const handleDeleteWithRefetch = async (params) => {
    await onDelete(params.eventId, params.note);
    if (isPersonalTab) {
      await refetchUpcoming();
      await refetchPast();
    } else {
      await refetchManager();
    }
  };

  const handleUpdateTimeWithRefetch = async (params) => {
    await onUpdateTime(params.eventId, params.newTime, params.endTime, params.note);
    if (isPersonalTab) {
      await refetchUpcoming();
      await refetchPast();
    } else {
      await refetchManager();
    }
  };

  const handleApproveTimeWithRefetch = async (params, approve) => {
    await onApproveTime(params.eventId, approve, params.note);
    await refetchManager();
  };

  const handleApproveEventWithRefetch = async (params, approve) => {
    await onApproveEvent(params.eventId, approve, params.note);
    await refetchManager();
  };

  // Define action configurations based on context
  const getCancelAction = () => ({
    label: 'Cancel',
    modalType: 'cancel',
    className: 'bg-red-500 text-white hover:bg-red-600',
    shouldShow: (event) => {
      const canModify = event.event_state !== 'deleted' && event.event_state !== 'canceled';
      const isUpcoming = new Date(event.start_datetime) >= new Date();
      return canModify && isUpcoming;
    },
    onConfirm: async (params) => {
      if (window.confirm('Are you sure you want to cancel this event?')) {
        await handleDeleteWithRefetch({ eventId: params.eventId, note: '' });
      }
    },
    modalConfig: null // No modal needed
  });

  const getRequestTimeChangeAction = () => ({
    label: 'Request Time Change',
    modalType: 'requestTimeChange',
    className: 'bg-blue-500 text-white hover:bg-blue-600',
    shouldShow: (event) => {
      const canModify = event.event_state !== 'deleted' && event.event_state !== 'canceled';
      const isUpcoming = new Date(event.start_datetime) >= new Date();
      return canModify && isUpcoming;
    },
    onConfirm: handleUpdateTimeWithRefetch,
    modalConfig: {
      title: 'Request Time Change',
      inputType: 'datetime',
      placeholder: 'Please provide a reason for the time change request...',
      confirmText: 'Request Change',
      required: true
    }
  });

  const getEditAction = () => ({
    label: 'Edit',
    modalType: 'edit',
    className: 'bg-blue-500 text-white hover:bg-blue-600',
    shouldShow: (event) => {
      const canModify = event.event_state !== 'deleted' && event.event_state !== 'canceled';
      const isUpcoming = new Date(event.start_datetime) >= new Date();
      return canModify && isUpcoming;
    },
    onConfirm: handleUpdateTimeWithRefetch,
    modalConfig: {
      title: 'Edit Event Time',
      inputType: 'datetime',
      placeholder: 'Please provide a reason for the time change...',
      confirmText: 'Save Changes',
      required: true
    }
  });

  const getApproveTimeAction = () => ({
    label: 'Approve Time',
    modalType: 'approveTime',
    className: 'bg-green-500 text-white hover:bg-green-600',
    shouldShow: (event) => new Date(event.start_datetime) >= new Date(),
    onConfirm: (params) => handleApproveTimeWithRefetch(params, true),
    modalConfig: {
      title: 'Approve Time Change',
      inputType: 'none',
      confirmMessage: 'Are you sure you want to approve this time change?',
      confirmText: 'Approve'
    }
  });

  const getDeclineTimeAction = () => ({
    label: 'Decline Time',
    modalType: 'declineTime',
    className: 'bg-red-500 text-white hover:bg-red-600',
    shouldShow: (event) => new Date(event.start_datetime) >= new Date(),
    onConfirm: (params) => handleApproveTimeWithRefetch(params, false),
    modalConfig: {
      title: 'Decline Time Change',
      inputType: 'textarea',
      placeholder: 'Please provide reason for declining this time change...',
      confirmText: 'Decline',
      required: true
    }
  });

  const getApproveEventAction = () => ({
    label: 'Approve Event',
    modalType: 'approveEvent',
    className: 'bg-green-500 text-white hover:bg-green-600',
    shouldShow: (event) => new Date(event.start_datetime) >= new Date(),
    onConfirm: (params) => handleApproveEventWithRefetch(params, true),
    modalConfig: {
      title: 'Approve Event',
      inputType: 'none',
      confirmMessage: 'Are you sure you want to approve this event?',
      confirmText: 'Approve'
    }
  });

  const getDeclineEventAction = () => ({
    label: 'Decline Event',
    modalType: 'declineEvent',
    className: 'bg-red-500 text-white hover:bg-red-600',
    shouldShow: (event) => new Date(event.start_datetime) >= new Date(),
    onConfirm: (params) => handleApproveEventWithRefetch(params, false),
    modalConfig: {
      title: 'Decline Event',
      inputType: 'textarea',
      placeholder: 'Please provide reason for declining this event...',
      confirmText: 'Decline',
      required: true
    }
  });

  // Determine actions based on tab and role
  const getActionsForContext = () => {
    if (isPersonalTab) {
      // Personal tab: Request Time Change and Cancel buttons
      return [getRequestTimeChangeAction(), getCancelAction()];
    }

    if (!isManager) {
      // Non-manager: Request Time Change and Cancel buttons
      return [getRequestTimeChangeAction(), getCancelAction()];
    }

    // Manager on "Update Requested" tab
    if (activeTab === 'update_requested') {
      return [
        getApproveTimeAction(),
        getDeclineTimeAction(),
        getEditAction()
      ];
    }

    // Manager on "Not Approved" tab
    if (activeTab === 'not_approved') {
      return [
        getApproveEventAction(),
        getDeclineEventAction(),
        getEditAction()
      ];
    }

    // Manager on "Confirmed" tab
    if (activeTab === 'confirmed') {
      return [
        getEditAction(),
        getCancelAction()
      ];
    }

    // Manager on "Canceled" tab - no actions for canceled events
    if (activeTab === 'canceled') {
      return [];
    }

    // Default: Request Time Change and Cancel
    return [getRequestTimeChangeAction(), getCancelAction()];
  };

  if ((isPersonalTab && isUpcomingLoading && upcomingPage === 1) || (isManagerLoading && !isPersonalTab)) {
    return <PulsatingLoader />;
  }

  // For personal tab - show two tables (upcoming and past)
  if (isPersonalTab) {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Upcoming Events</h2>
          <EventsTable
            title="Upcoming Events"
            events={upcomingEvents}
            actions={getActionsForContext()}
            currentPage={upcomingPage}
            onPageChange={setUpcomingPage}
            hasMore={hasMoreUpcoming}
            isLoading={isUpcomingLoading}
            showPagination={showUpcomingPagination}
            emptyMessage="You don't have any upcoming events."
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Past Events</h2>
          <EventsTable
            title="Past Events"
            events={pastEvents}
            actions={getActionsForContext()}
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

  // For manager tabs - show single table
  return (
    <EventsTable
      events={managerEvents}
      actions={getActionsForContext()}
      showPagination={false}
      emptyMessage="There are no events to manage at the moment."
    />
  );
};

export default EventsList;
