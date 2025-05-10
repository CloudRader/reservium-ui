import React, { useState } from 'react';
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

const Modal = ({ isOpen, onClose, title, children, onConfirm, confirmText = 'Confirm', cancelText = 'Cancel', isConfirmDisabled = false }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">{title}</h3>
                {children}
                <div className="flex justify-end space-x-3 mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isConfirmDisabled}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

const EventCard = ({ event, onUpdateTime, onDelete, onApproveTime, onApproveEvent, isManager = false, isMobile = false }) => {
    const [modalState, setModalState] = useState({
        isOpen: false,
        type: null,
        note: '',
        newTime: ''
    });

    const openModal = (type) => {
        setModalState({
            isOpen: true,
            type,
            note: '',
            newTime: ''
        });
    };

    const closeModal = () => {
        setModalState({
            isOpen: false,
            type: null,
            note: '',
            newTime: ''
        });
    };

    const handleConfirm = () => {
        switch (modalState.type) {
            case 'delete':
                if (isManager) {
                    onDelete(event.id, modalState.note);
                }
                break;
            case 'updateTime':
                onUpdateTime(event.id, modalState.newTime);
                break;
            case 'approveTime':
                onApproveTime(event.id, true, modalState.note);
                break;
            case 'declineTime':
                onApproveTime(event.id, false, modalState.note);
                break;
            case 'approveEvent':
                onApproveEvent(event.id, true, modalState.note);
                break;
            case 'declineEvent':
                onApproveEvent(event.id, false, modalState.note);
                break;
            default:
                console.warn('Unknown modal type:', modalState.type);
                break;
        }
        closeModal();
    };

    const getModalContent = () => {
        switch (modalState.type) {
            case 'delete':
                return {
                    title: 'Delete Event',
                    children: (
                        <textarea
                            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={modalState.note}
                            onChange={(e) => setModalState(prev => ({ ...prev, note: e.target.value }))}
                            placeholder="Please provide a reason for deletion..."
                            rows="3"
                        />
                    ),
                    confirmText: 'Delete',
                    isConfirmDisabled: !modalState.note.trim()
                };
            case 'updateTime':
                return {
                    title: 'Request Time Change',
                    children: (
                        <div>
                            <p className="text-gray-600 dark:text-gray-300 mb-2">Enter new start time (YYYY-MM-DD HH:mm):</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Note: The event duration will remain the same.</p>
                            <input
                                type="datetime-local"
                                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={modalState.newTime}
                                onChange={(e) => setModalState(prev => ({ ...prev, newTime: e.target.value }))}
                            />
                        </div>
                    ),
                    confirmText: 'Request Change',
                    isConfirmDisabled: !modalState.newTime
                };
            case 'approveTime':
                return {
                    title: 'Approve Time Change',
                    children: (
                        <textarea
                            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={modalState.note}
                            onChange={(e) => setModalState(prev => ({ ...prev, note: e.target.value }))}
                            placeholder="Please provide notes for approving this time change..."
                            rows="3"
                        />
                    ),
                    confirmText: 'Approve',
                    isConfirmDisabled: !modalState.note.trim()
                };
            case 'declineTime':
                return {
                    title: 'Decline Time Change',
                    children: (
                        <textarea
                            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={modalState.note}
                            onChange={(e) => setModalState(prev => ({ ...prev, note: e.target.value }))}
                            placeholder="Please provide reason for declining this time change..."
                            rows="3"
                        />
                    ),
                    confirmText: 'Decline',
                    isConfirmDisabled: !modalState.note.trim()
                };
            case 'approveEvent':
                return {
                    title: 'Approve Event',
                    children: (
                        <textarea
                            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={modalState.note}
                            onChange={(e) => setModalState(prev => ({ ...prev, note: e.target.value }))}
                            placeholder="Please provide notes for approving this event..."
                            rows="3"
                        />
                    ),
                    confirmText: 'Approve',
                    isConfirmDisabled: !modalState.note.trim()
                };
            case 'declineEvent':
                return {
                    title: 'Decline Event',
                    children: (
                        <textarea
                            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={modalState.note}
                            onChange={(e) => setModalState(prev => ({ ...prev, note: e.target.value }))}
                            placeholder="Please provide reason for declining this event..."
                            rows="3"
                        />
                    ),
                    confirmText: 'Decline',
                    isConfirmDisabled: !modalState.note.trim()
                };
            default:
                return {
                    title: '',
                    children: null,
                    confirmText: 'Confirm',
                    isConfirmDisabled: false
                };
        }
    };

    const modalContent = getModalContent();

    const cardContent = (
        <>
            <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                    {event.purpose}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    Start: {formatDate(event.start_datetime)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    End: {formatDate(event.end_datetime)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    Guests: {event.guests}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    Purpose: {event.purpose}
                </p>
                {/* <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    Service: {event.calendar_id}
                </p> */}
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
                                    onClick={() => openModal('approveTime')}
                                    className="px-3 py-1.5 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                                >
                                    Approve Time Change
                                </button>
                                <button
                                    onClick={() => openModal('declineTime')}
                                    className="px-3 py-1.5 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                >
                                    Decline Time Change
                                </button>
                            </>
                        ) : event.event_state === 'not_approved' ? (
                            <>
                                <button
                                    onClick={() => openModal('approveEvent')}
                                    className="px-3 py-1.5 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                                >
                                    Approve Event
                                </button>
                                <button
                                    onClick={() => openModal('declineEvent')}
                                    className="px-3 py-1.5 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                >
                                    Decline Event
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => openModal('delete')}
                                className="px-3 py-1.5 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                            >
                                Delete
                            </button>
                        )}
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => openModal('updateTime')}
                            className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                            Request Time Change
                        </button>
                        <button
                            onClick={() => onDelete(event.id, '')}
                            className="px-3 py-1.5 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>
        </>
    );

    return (
        <>
            <Modal
                isOpen={modalState.isOpen}
                onClose={closeModal}
                onConfirm={handleConfirm}
                {...modalContent}
            />
            {isMobile ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:shadow-md transition-shadow">
                    {cardContent}
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                        {cardContent}
                    </div>
                </div>
            )}
        </>
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