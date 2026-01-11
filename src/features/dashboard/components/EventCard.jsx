import React from 'react';
import PropTypes from 'prop-types';
import StatusBadge from '@components/ui/feedback/StatusBadge';
import { formatDateForDisplay } from '@utils/dateUtils';
import { SpinnerIcon } from '@components/ui/icons/SpinnerIcon';

const EventCard = ({
  event,
  actions = [],
  showRequestedTime = false,
  loadingEventId = null,
  onActionClick,
}) => {
  const isLoading = loadingEventId === event.event.id;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 space-y-3 hover:shadow-md transition-shadow border border-green-100">
      {/* Purpose & Service */}
      <div>
        <h3 className="text-base font-semibold text-green-800 leading-tight">
          {event.event.purpose}
        </h3>
        <p className="text-xs text-green-600 mt-0.5">
          {event.reservation_service_name}
        </p>
      </div>

      {/* Additional Services */}
      {event.event.additional_services &&
        event.event.additional_services.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {event.event.additional_services.map((service, index) => (
              <span
                key={index}
                className="inline-block px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs"
              >
                {service}
              </span>
            ))}
          </div>
        )}

      {/* Time Information */}
      <div className="space-y-1.5">
        <div>
          <p className="text-xs font-medium text-gray-600 mb-0.5">
            Current Time
          </p>
          <p className="text-xs text-gray-800">
            {formatDateForDisplay(event.event.start_datetime)}
          </p>
          <p className="text-xs text-gray-600">
            to {formatDateForDisplay(event.event.end_datetime)}
          </p>
        </div>

        {showRequestedTime && event.event.requested_reservation_start && (
          <div>
            <p className="text-xs font-medium text-blue-600 mb-0.5">
              Requested Time
            </p>
            <p className="text-xs text-blue-700 font-medium">
              {formatDateForDisplay(event.event.requested_reservation_start)}
            </p>
            <p className="text-xs text-blue-600">
              to {formatDateForDisplay(event.event.requested_reservation_end)}
            </p>
          </div>
        )}
      </div>

      {/* Guests and Status */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-700">
          <span className="font-medium">Guests:</span> {event.event.guests}
        </p>
        <StatusBadge status={event.event.event_state} />
      </div>

      {/* Action buttons - full width on mobile */}
      {actions.length > 0 && (
        <div className="flex flex-col gap-1.5 pt-2 border-t border-green-100">
          {actions.map((action, index) => {
            const shouldShow = action.shouldShow
              ? action.shouldShow(event.event)
              : true;

            if (!shouldShow) return null;

            const isButtonLoading = isLoading;

            return (
              <button
                key={index}
                onClick={() => onActionClick(action, event.event)}
                disabled={isButtonLoading}
                className={`w-full px-3 py-2 text-xs font-medium rounded-md transition-colors ${action.className} ${
                  isButtonLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isButtonLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <SpinnerIcon />
                    Loading...
                  </span>
                ) : (
                  action.label
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    event: PropTypes.shape({
      id: PropTypes.string.isRequired,
      purpose: PropTypes.string.isRequired,
      start_datetime: PropTypes.string.isRequired,
      end_datetime: PropTypes.string.isRequired,
      requested_reservation_start: PropTypes.string,
      requested_reservation_end: PropTypes.string,
      guests: PropTypes.number.isRequired,
      event_state: PropTypes.string.isRequired,
      additional_services: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    reservation_service_name: PropTypes.string.isRequired,
  }).isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      modalType: PropTypes.string.isRequired,
      className: PropTypes.string.isRequired,
      shouldShow: PropTypes.func,
      onConfirm: PropTypes.func.isRequired,
      modalConfig: PropTypes.object,
    })
  ),
  showRequestedTime: PropTypes.bool,
  loadingEventId: PropTypes.string,
  onActionClick: PropTypes.func.isRequired,
};

export default EventCard;
