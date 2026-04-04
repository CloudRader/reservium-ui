import React from 'react';
import StatusBadge from '@components/ui/feedback/StatusBadge';
import { SpinnerIcon } from '@components/ui/icons/SpinnerIcon';
import { formatDateForDisplay } from '@utils/dateUtils';

/**
 * Get table columns configuration for events table
 * @param {Object} options
 * @param {boolean} options.showRequestedTime - Whether to show requested time column
 * @param {Array} options.actions - Actions available for events
 * @param {Function} options.onActionClick - Handler for action button clicks
 * @param {string|null} options.loadingEventId - ID of event currently being processed
 * @returns {Array} Column configuration
 */
export const getEventsTableColumns = ({
  showRequestedTime = false,
  actions = [],
  onActionClick,
  loadingEventId = null,
}) => {
  const columns = [
    {
      key: 'event',
      header: 'Event',
      width: showRequestedTime ? '20%' : '25%',
      render: (eventData) => {
        const { event } = eventData;
        return (
          <div>
            <div className="text-sm font-medium text-green-800">
              {event.purpose}
            </div>
            {event.additional_services && event.additional_services.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {event.additional_services.map((service, index) => (
                  <span
                    key={index}
                    className="inline-block px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs"
                  >
                    {service}
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      },
    },
    {
      key: 'service',
      header: 'Service',
      width: showRequestedTime ? '12%' : '15%',
      render: (eventData) => (
        <div className="text-sm text-green-700">
          {eventData.reservation_service_name}
        </div>
      ),
    },
    {
      key: 'current_time',
      header: 'Current Time',
      width: showRequestedTime ? '16%' : '20%',
      render: (eventData) => {
        const { event } = eventData;
        return (
          <div className="text-sm text-gray-800">
            <div>{formatDateForDisplay(event.start_datetime)}</div>
            <div className="text-xs text-gray-600">
              to {formatDateForDisplay(event.end_datetime)}
            </div>
          </div>
        );
      },
    },
  ];

  // Add requested time column if needed
  if (showRequestedTime) {
    columns.push({
      key: 'requested_time',
      header: 'Requested Time',
      width: '16%',
      render: (eventData) => {
        const { event } = eventData;
        if (event.requested_reservation_start && event.requested_reservation_end) {
          return (
            <div className="text-sm text-blue-600">
              <div>{formatDateForDisplay(event.requested_reservation_start)}</div>
              <div className="text-xs">
                to {formatDateForDisplay(event.requested_reservation_end)}
              </div>
            </div>
          );
        }
        return <span className="text-sm text-gray-400">-</span>;
      },
    });
  }

  // Add remaining columns
  columns.push(
    {
      key: 'guests',
      header: 'Guests',
      width: '8%',
      render: (eventData) => (
        <div className="text-sm text-gray-700">
          {eventData.event.guests || 0}
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      width: '10%',
      render: (eventData) => <StatusBadge status={eventData.event.event_state} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      width: showRequestedTime ? '18%' : '22%',
      render: (eventData) => {
        const { event } = eventData;
        const visibleActions = actions.filter((action) =>
          action.shouldShow ? action.shouldShow(event) : true
        );

        if (visibleActions.length === 0) {
          return null;
        }

        return (
          <div className="flex flex-wrap gap-2">
            {visibleActions.map((action, index) => (
              <button
                key={index}
                onClick={() => onActionClick(action, event)}
                disabled={loadingEventId === event.id}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 ${action.className}`}
              >
                {loadingEventId === event.id ? (
                  <>
                    <SpinnerIcon className="w-4 h-4" />
                    <span>Loading...</span>
                  </>
                ) : (
                  action.label
                )}
              </button>
            ))}
          </div>
        );
      },
    }
  );

  return columns;
};
