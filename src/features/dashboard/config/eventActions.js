/**
 * Event actions configuration
 * Defines all possible actions for events based on context
 */

/**
 * Check if event can be modified (not deleted or canceled)
 */
const canModifyEvent = (event) => {
  return event.event_state !== 'deleted' && event.event_state !== 'canceled';
};

/**
 * Check if event is upcoming
 */
const isUpcomingEvent = (event) => {
  return new Date(event.start_datetime) >= new Date();
};

/**
 * Get cancel action configuration
 */
export const getCancelAction = (handleDelete) => ({
  label: 'Cancel',
  modalType: 'cancel',
  className: 'bg-red-500 text-white hover:bg-red-600',
  shouldShow: (event) => canModifyEvent(event) && isUpcomingEvent(event),
  onConfirm: async (params) => {
    if (window.confirm('Are you sure you want to cancel this event?')) {
      await handleDelete({ eventId: params.eventId, note: '' });
    }
  },
  modalConfig: null,
});

/**
 * Get request time change action configuration
 */
export const getRequestTimeChangeAction = (handleRequestTimeChange) => ({
  label: 'Request Time Change',
  modalType: 'requestTimeChange',
  className: 'bg-blue-500 text-white hover:bg-blue-600',
  shouldShow: (event) => canModifyEvent(event) && isUpcomingEvent(event),
  onConfirm: handleRequestTimeChange,
  modalConfig: {
    title: 'Request Time Change',
    inputType: 'datetime',
    placeholder: 'Please provide a reason for the time change request...',
    confirmText: 'Request Change',
    required: true,
  },
});

/**
 * Get edit action configuration
 */
export const getEditAction = (handleUpdateTime) => ({
  label: 'Edit',
  modalType: 'edit',
  className: 'bg-blue-500 text-white hover:bg-blue-600',
  shouldShow: (event) => canModifyEvent(event) && isUpcomingEvent(event),
  onConfirm: handleUpdateTime,
  modalConfig: {
    title: 'Edit Event',
    inputType: 'edit-event',
    placeholder: 'Please provide a reason for the changes...',
    confirmText: 'Save Changes',
    required: true,
  },
});

/**
 * Get approve time action configuration
 */
export const getApproveTimeAction = (handleApproveTime) => ({
  label: 'Approve Time',
  modalType: 'approveTime',
  className: 'bg-green-500 text-white hover:bg-green-600',
  shouldShow: (event) => isUpcomingEvent(event),
  onConfirm: (params) => handleApproveTime(params, true),
  modalConfig: {
    title: 'Approve Time Change',
    inputType: 'none',
    confirmMessage: 'Are you sure you want to approve this time change?',
    confirmText: 'Approve',
  },
});

/**
 * Get decline time action configuration
 */
export const getDeclineTimeAction = (handleApproveTime) => ({
  label: 'Decline Time',
  modalType: 'declineTime',
  className: 'bg-red-500 text-white hover:bg-red-600',
  shouldShow: (event) => isUpcomingEvent(event),
  onConfirm: (params) => handleApproveTime(params, false),
  modalConfig: {
    title: 'Decline Time Change',
    inputType: 'textarea',
    placeholder: 'Please provide reason for declining this time change...',
    confirmText: 'Decline',
    required: true,
  },
});

/**
 * Get approve event action configuration
 */
export const getApproveEventAction = (handleApproveEvent) => ({
  label: 'Approve Event',
  modalType: 'approveEvent',
  className: 'bg-green-500 text-white hover:bg-green-600',
  shouldShow: (event) => isUpcomingEvent(event),
  onConfirm: (params) => handleApproveEvent(params, true),
  modalConfig: {
    title: 'Approve Event',
    inputType: 'none',
    confirmMessage: 'Are you sure you want to approve this event?',
    confirmText: 'Approve',
  },
});

/**
 * Get decline event action configuration
 */
export const getDeclineEventAction = (handleApproveEvent) => ({
  label: 'Decline Event',
  modalType: 'declineEvent',
  className: 'bg-red-500 text-white hover:bg-red-600',
  shouldShow: (event) => isUpcomingEvent(event),
  onConfirm: (params) => handleApproveEvent(params, false),
  modalConfig: {
    title: 'Decline Event',
    inputType: 'textarea',
    placeholder: 'Please provide reason for declining this event...',
    confirmText: 'Decline',
    required: true,
  },
});

/**
 * Get actions for specific context (tab + role)
 * @param {string} activeTab - Current active tab
 * @param {boolean} isPersonalTab - Is personal tab
 * @param {boolean} isManager - Is user a manager
 * @param {Object} handlers - Event handler functions
 * @returns {Array} Array of action configurations
 */
export const getActionsForContext = (
  activeTab,
  isPersonalTab,
  isManager,
  handlers
) => {
  const {
    handleDelete,
    handleRequestTimeChange,
    handleUpdateTime,
    handleApproveTime,
    handleApproveEvent,
  } = handlers;

  // Personal tab: Request Time Change and Cancel buttons
  if (isPersonalTab) {
    return [
      getRequestTimeChangeAction(handleRequestTimeChange),
      getCancelAction(handleDelete),
    ];
  }

  // Non-manager: Request Time Change and Cancel buttons
  if (!isManager) {
    return [
      getRequestTimeChangeAction(handleRequestTimeChange),
      getCancelAction(handleDelete),
    ];
  }

  // Manager on "Update Requested" tab
  if (activeTab === 'update_requested') {
    return [
      getApproveTimeAction(handleApproveTime),
      getDeclineTimeAction(handleApproveTime),
    ];
  }

  // Manager on "Not Approved" tab
  if (activeTab === 'not_approved') {
    return [
      getApproveEventAction(handleApproveEvent),
      getDeclineEventAction(handleApproveEvent),
    ];
  }

  // Manager on "Confirmed" tab
  if (activeTab === 'confirmed') {
    return [getEditAction(handleUpdateTime), getCancelAction(handleDelete)];
  }

  // Manager on "Canceled" tab - no actions for canceled events
  if (activeTab === 'canceled') {
    return [];
  }

  // Default: Request Time Change and Cancel
  return [
    getRequestTimeChangeAction(handleRequestTimeChange),
    getCancelAction(handleDelete),
  ];
};
