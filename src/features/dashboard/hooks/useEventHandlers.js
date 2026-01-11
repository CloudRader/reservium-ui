import { useCallback } from 'react';

/**
 * Custom hook for wrapping event handlers with refetch logic
 * @param {Object} props - Hook props
 * @param {Function} props.onDelete - Delete handler
 * @param {Function} props.onRequestTimeChange - Request time change handler
 * @param {Function} props.onUpdateTime - Update time handler
 * @param {Function} props.onApproveTime - Approve time handler
 * @param {Function} props.onApproveEvent - Approve event handler
 * @param {Function} props.refetchUpcoming - Refetch upcoming events
 * @param {Function} props.refetchPast - Refetch past events
 * @param {Function} props.refetchManager - Refetch manager events
 * @param {boolean} props.isPersonalTab - Is personal tab active
 * @returns {Object} Wrapped handlers
 */
export const useEventHandlers = ({
  onDelete,
  onRequestTimeChange,
  onUpdateTime,
  onApproveTime,
  onApproveEvent,
  refetchUpcoming,
  refetchPast,
  refetchManager,
  isPersonalTab,
}) => {
  const handleDeleteWithRefetch = useCallback(
    async (params) => {
      await onDelete(params.eventId, params.note);
      if (isPersonalTab) {
        await refetchUpcoming();
        await refetchPast();
      } else {
        await refetchManager();
      }
    },
    [onDelete, isPersonalTab, refetchUpcoming, refetchPast, refetchManager]
  );

  const handleRequestTimeChangeWithRefetch = useCallback(
    async (params) => {
      await onRequestTimeChange(
        params.eventId,
        params.newTime,
        params.endTime,
        params.note
      );
      if (isPersonalTab) {
        await refetchUpcoming();
        await refetchPast();
      }
    },
    [onRequestTimeChange, isPersonalTab, refetchUpcoming, refetchPast]
  );

  const handleUpdateTimeWithRefetch = useCallback(
    async (params) => {
      await onUpdateTime(
        params.eventId,
        params.newTime,
        params.endTime,
        params.note,
        params.purpose,
        params.guests
      );
      await refetchManager();
    },
    [onUpdateTime, refetchManager]
  );

  const handleApproveTimeWithRefetch = useCallback(
    async (params, approve) => {
      await onApproveTime(params.eventId, approve, params.note);
      await refetchManager();
    },
    [onApproveTime, refetchManager]
  );

  const handleApproveEventWithRefetch = useCallback(
    async (params, approve) => {
      await onApproveEvent(params.eventId, approve, params.note);
      await refetchManager();
    },
    [onApproveEvent, refetchManager]
  );

  return {
    handleDelete: handleDeleteWithRefetch,
    handleRequestTimeChange: handleRequestTimeChangeWithRefetch,
    handleUpdateTime: handleUpdateTimeWithRefetch,
    handleApproveTime: handleApproveTimeWithRefetch,
    handleApproveEvent: handleApproveEventWithRefetch,
  };
};
