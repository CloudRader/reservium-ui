import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Pagination from '../ui/Pagination';
import StatusBadge from '../ui/StatusBadge';
import { formatDateForDisplay } from '../../utils/dateUtils';

const EventsTable = ({
  title,
  events,
  actions = [],
  currentPage = 1,
  onPageChange,
  hasMore = false,
  isLoading = false,
  showPagination = false,
  emptyMessage = 'No events to display.',
  showRequestedTime = false,
  totalPages,
}) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null,
    note: '',
    newTime: '',
    endTime: '',
    eventId: null,
    purpose: '',
    guests: 0,
  });

  const [loadingEventId, setLoadingEventId] = useState(null);
  const [isModalLoading, setIsModalLoading] = useState(false);

  const openModal = (type, eventId, eventData = {}) => {
    setModalState({
      isOpen: true,
      type,
      note: '',
      newTime: '',
      endTime: '',
      eventId,
      purpose: eventData.purpose || '',
      guests: eventData.guests || 0,
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      type: null,
      note: '',
      newTime: '',
      endTime: '',
      eventId: null,
      purpose: '',
      guests: 0,
    });
  };

  const handleConfirm = async () => {
    // Find the action configuration that matches the modal type
    const action = actions.find((a) => a.modalType === modalState.type);
    if (action && action.onConfirm) {
      setIsModalLoading(true);
      setLoadingEventId(modalState.eventId);
      try {
        // Call the action's onConfirm handler with the modal state
        await action.onConfirm({
          eventId: modalState.eventId,
          note: modalState.note,
          newTime: modalState.newTime,
          endTime: modalState.endTime,
          purpose: modalState.purpose,
          guests: modalState.guests,
        });
        // Close modal after successful action
        closeModal();
      } catch (error) {
        console.error('Action failed:', error);
      } finally {
        setLoadingEventId(null);
        setIsModalLoading(false);
      }
    }
  };

  const getModalContent = () => {
    const action = actions.find((a) => a.modalType === modalState.type);
    if (!action) {
      return {
        title: '',
        children: null,
        confirmText: 'Confirm',
        isConfirmDisabled: false,
      };
    }

    // Use the modal configuration from the action
    if (action.modalConfig) {
      const config = action.modalConfig;
      let children = <div />;
      let isConfirmDisabled = false;

      // Determine modal content based on input type
      if (config.inputType === 'textarea') {
        children = (
          <textarea
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={modalState.note}
            onChange={(e) =>
              setModalState((prev) => ({ ...prev, note: e.target.value }))
            }
            placeholder={config.placeholder || ''}
            rows="3"
          />
        );
        isConfirmDisabled = config.required && !modalState.note.trim();
      } else if (config.inputType === 'edit-event') {
        children = (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Start Time
              </label>
              <input
                type="datetime-local"
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={modalState.newTime}
                onChange={(e) =>
                  setModalState((prev) => ({
                    ...prev,
                    newTime: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                End Time
              </label>
              <input
                type="datetime-local"
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={modalState.endTime}
                onChange={(e) =>
                  setModalState((prev) => ({
                    ...prev,
                    endTime: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Purpose
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={modalState.purpose}
                onChange={(e) =>
                  setModalState((prev) => ({
                    ...prev,
                    purpose: e.target.value,
                  }))
                }
                placeholder="Event purpose"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Guests
              </label>
              <input
                type="number"
                min="0"
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={modalState.guests}
                onChange={(e) =>
                  setModalState((prev) => ({
                    ...prev,
                    guests: parseInt(e.target.value, 10) || 0,
                  }))
                }
                placeholder="Number of guests"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Reason for Change
              </label>
              <textarea
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={modalState.note}
                onChange={(e) =>
                  setModalState((prev) => ({ ...prev, note: e.target.value }))
                }
                placeholder={config.placeholder || ''}
                rows="3"
              />
            </div>
          </div>
        );
        isConfirmDisabled =
          !modalState.newTime ||
          !modalState.endTime ||
          !modalState.purpose.trim() ||
          !modalState.note.trim();
      } else if (config.inputType === 'datetime') {
        children = (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Start Time
              </label>
              <input
                type="datetime-local"
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={modalState.newTime}
                onChange={(e) =>
                  setModalState((prev) => ({
                    ...prev,
                    newTime: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                End Time
              </label>
              <input
                type="datetime-local"
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={modalState.endTime}
                onChange={(e) =>
                  setModalState((prev) => ({
                    ...prev,
                    endTime: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Reason for Change
              </label>
              <textarea
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={modalState.note}
                onChange={(e) =>
                  setModalState((prev) => ({ ...prev, note: e.target.value }))
                }
                placeholder={config.placeholder || ''}
                rows="3"
              />
            </div>
          </div>
        );
        isConfirmDisabled =
          !modalState.newTime || !modalState.endTime || !modalState.note.trim();
      } else if (config.inputType === 'none') {
        children = (
          <p className="text-gray-600 dark:text-gray-300">
            {config.confirmMessage || 'Are you sure?'}
          </p>
        );
        isConfirmDisabled = false;
      }

      return {
        title: config.title,
        children,
        confirmText: config.confirmText || 'Confirm',
        isConfirmDisabled,
      };
    }

    return {
      title: '',
      children: <div />,
      confirmText: 'Confirm',
      isConfirmDisabled: false,
    };
  };

  const modalContent = getModalContent();

  if (!events || events.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow p-6">
        <p className="text-gray-600 dark:text-gray-300 text-center py-8">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <>
      <Modal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        onConfirm={handleConfirm}
        isLoading={isModalLoading}
        {...modalContent}
      />
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <colgroup>
              <col style={{ width: showRequestedTime ? '20%' : '25%' }} />
              <col style={{ width: showRequestedTime ? '12%' : '15%' }} />
              <col style={{ width: showRequestedTime ? '16%' : '20%' }} />
              {showRequestedTime && <col style={{ width: '16%' }} />}
              <col style={{ width: '8%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: showRequestedTime ? '18%' : '22%' }} />
            </colgroup>
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Current Time
                </th>
                {showRequestedTime && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Requested Time
                  </th>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Guests
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {events.map((eventData) => {
                const { event, reservation_service_name } = eventData;

                return (
                  <tr
                    key={event.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {event.purpose}
                        </div>
                        {event.additional_services &&
                          event.additional_services.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {event.additional_services.map(
                                (service, index) => (
                                  <span
                                    key={index}
                                    className="inline-block px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded text-xs"
                                  >
                                    {service}
                                  </span>
                                )
                              )}
                            </div>
                          )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {reservation_service_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        <div>{formatDateForDisplay(event.start_datetime)}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          to {formatDateForDisplay(event.end_datetime)}
                        </div>
                      </div>
                    </td>
                    {showRequestedTime && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                          {event.requested_reservation_start ? (
                            <>
                              <div>
                                {formatDateForDisplay(
                                  event.requested_reservation_start
                                )}
                              </div>
                              <div className="text-xs text-blue-500 dark:text-blue-300">
                                to{' '}
                                {formatDateForDisplay(
                                  event.requested_reservation_end
                                )}
                              </div>
                            </>
                          ) : (
                            <span className="text-gray-400 dark:text-gray-500">
                              -
                            </span>
                          )}
                        </div>
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {event.guests}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={event.event_state} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-2">
                        {actions.map((action, index) => {
                          // Check if action should be visible based on event state
                          const shouldShow = action.shouldShow
                            ? action.shouldShow(event)
                            : true;

                          if (!shouldShow) return null;

                          const isButtonLoading = loadingEventId === event.id;

                          // If no modalConfig, call onConfirm directly
                          const handleClick = async () => {
                            if (!action.modalConfig) {
                              setLoadingEventId(event.id);
                              try {
                                await action.onConfirm({ eventId: event.id });
                              } finally {
                                setLoadingEventId(null);
                              }
                            } else {
                              openModal(action.modalType, event.id, event);
                            }
                          };

                          return (
                            <button
                              key={index}
                              onClick={handleClick}
                              disabled={isButtonLoading}
                              className={`px-3 py-1.5 text-sm rounded transition-colors ${action.className} ${
                                isButtonLoading
                                  ? 'opacity-50 cursor-not-allowed'
                                  : ''
                              }`}
                            >
                              {isButtonLoading ? (
                                <span className="flex items-center gap-2">
                                  <svg
                                    className="animate-spin h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    ></circle>
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                  </svg>
                                  Loading...
                                </span>
                              ) : (
                                action.label
                              )}
                            </button>
                          );
                        })}
                        {actions.length === 0 && (
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            -
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showPagination && onPageChange && (
        <Pagination
          currentPage={currentPage}
          onPageChange={onPageChange}
          hasMore={hasMore}
          isLoading={isLoading}
          totalPages={totalPages}
        />
      )}
    </>
  );
};

export default EventsTable;
