import React from 'react';
import PropTypes from 'prop-types';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const EventCard = ({ event, onUpdateTime, onDelete, onApproveTime, onApproveEvent, isManager = false, isMobile = false }) => {
    const cardContent = (
        <>
            <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                    {event.purpose}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    Service: {event.calendar_id}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    Start: {formatDate(event.start_datetime)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    End: {formatDate(event.end_datetime)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    Guests: {event.guests}
                </p>
                <span className={`inline-block px-2 py-0.5 rounded text-xs ${event.event_state === 'confirmed'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                    {event.event_state}
                </span>
            </div>
            <div className={`flex space-x-2 ${isMobile ? 'mt-4' : ''}`}>
                {isManager ? (
                    <>
                        {event.event_state === 'update_requested' ? (
                            <>
                                <button
                                    onClick={() => {
                                        const notes = prompt('Please provide notes for approving this time change:');
                                        if (notes) {
                                            onApproveTime(event.id, true, notes);
                                        }
                                    }}
                                    className="px-3 py-1.5 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                                >
                                    Approve Time Change
                                </button>
                                <button
                                    onClick={() => {
                                        const notes = prompt('Please provide reason for declining this time change:');
                                        if (notes) {
                                            onApproveTime(event.id, false, notes);
                                        }
                                    }}
                                    className="px-3 py-1.5 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                >
                                    Decline Time Change
                                </button>
                            </>
                        ) : event.event_state === 'not_approved' ? (
                            <>
                                <button
                                    onClick={() => {
                                        const notes = prompt('Please provide notes for approving this event:');
                                        if (notes) {
                                            onApproveEvent(event.id, true, notes);
                                        }
                                    }}
                                    className="px-3 py-1.5 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                                >
                                    Approve Event
                                </button>
                                <button
                                    onClick={() => {
                                        const notes = prompt('Please provide reason for declining this event:');
                                        if (notes) {
                                            onApproveEvent(event.id, false, notes);
                                        }
                                    }}
                                    className="px-3 py-1.5 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                >
                                    Decline Event
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => {
                                    const note = prompt('Please provide a reason for deletion:');
                                    if (note) {
                                        onDelete(event.id, note);
                                    }
                                }}
                                className="px-3 py-1.5 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                            >
                                Delete
                            </button>
                        )}
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => {
                                const newTime = prompt(
                                    'Enter new start time (YYYY-MM-DD HH:mm):\n' +
                                    'Note: The event duration will remain the same.'
                                );
                                if (newTime) {
                                    onUpdateTime(event.id, newTime);
                                }
                            }}
                            className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                            Request Time Change
                        </button>
                        <button
                            onClick={() => {
                                const note = prompt('Please provide a reason for deletion:');
                                if (note) {
                                    onDelete(event.id, note);
                                }
                            }}
                            className="px-3 py-1.5 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>
        </>
    );

    if (isMobile) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:shadow-md transition-shadow">
                {cardContent}
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                {cardContent}
            </div>
        </div>
    );
};

EventCard.propTypes = {
    event: PropTypes.shape({
        id: PropTypes.string.isRequired,
        purpose: PropTypes.string.isRequired,
        calendar_id: PropTypes.string.isRequired,
        start_datetime: PropTypes.string.isRequired,
        end_datetime: PropTypes.string.isRequired,
        guests: PropTypes.number.isRequired,
        event_state: PropTypes.string.isRequired,
    }).isRequired,
    onUpdateTime: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onApproveTime: PropTypes.func,
    onApproveEvent: PropTypes.func,
    isManager: PropTypes.bool,
    isMobile: PropTypes.bool,
};

export default EventCard; 