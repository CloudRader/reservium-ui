import { useCallback } from 'react';
import toast from 'react-hot-toast';
import {
  deleteEvent,
  requestTimeChange,
  updateEventTime,
  approveTimeChange,
  approveEvent,
} from '@lib/api/events';
import { formatDateTimeLocalForAPI } from '@utils/dateUtils';
import { getErrorMessage } from '@utils/errorUtils';

/**
 * Custom hook for handling all event actions in Dashboard
 * Provides unified interface for event operations with error handling
 */
export const useEventActions = () => {
  const handleDelete = useCallback(async (eventId, note) => {
    try {
      await deleteEvent(eventId, note);
      toast.success('Event cancelled successfully!');
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error(getErrorMessage(error, 'Failed to cancel event. Please try again.'));
    }
  }, []);

  const handleRequestTimeChange = useCallback(
    async (eventId, newStartTime, newEndTime, reason) => {
      try {
        if (!reason) return;

        await requestTimeChange(
          eventId,
          formatDateTimeLocalForAPI(newStartTime),
          formatDateTimeLocalForAPI(newEndTime),
          reason
        );
        toast.success('Time change request sent successfully!');
      } catch (error) {
        console.error('Error requesting time change:', error);
        toast.error(getErrorMessage(error, 'Failed to send time change request. Please try again.'));
      }
    },
    []
  );

  const handleUpdateTime = useCallback(
    async (eventId, newStartTime, newEndTime, reason, purpose, guests) => {
      try {
        if (!reason) return;

        const eventUpdate = {
          reservation_start: formatDateTimeLocalForAPI(newStartTime),
          reservation_end: formatDateTimeLocalForAPI(newEndTime),
        };

        // Add purpose and guests if provided
        if (purpose) {
          eventUpdate.purpose = purpose;
        }
        if (guests !== undefined && guests !== null) {
          eventUpdate.guests = guests;
        }

        await updateEventTime(eventId, eventUpdate, reason);
        toast.success('Event updated successfully!');
      } catch (error) {
        console.error('Error updating event:', error);
        toast.error(getErrorMessage(error, 'Failed to update event. Please try again.'));
      }
    },
    []
  );

  const handleApproveTime = useCallback(async (eventId, approve, managerNotes) => {
    try {
      await approveTimeChange(eventId, approve, managerNotes);
      toast.success(`Time change ${approve ? 'approved' : 'declined'} successfully!`);
    } catch (error) {
      console.error('Error approving/declining time change:', error);
      const fallbackMessage = `Failed to ${approve ? 'approve' : 'decline'} time change. Please try again.`;
      toast.error(getErrorMessage(error, fallbackMessage));
    }
  }, []);

  const handleApproveEvent = useCallback(async (eventId, approve, managerNotes) => {
    try {
      await approveEvent(eventId, approve, managerNotes);
      toast.success(`Event ${approve ? 'approved' : 'declined'} successfully!`);
    } catch (error) {
      console.error('Error approving/declining event:', error);
      const fallbackMessage = `Failed to ${approve ? 'approve' : 'decline'} event. Please try again.`;
      toast.error(getErrorMessage(error, fallbackMessage));
    }
  }, []);

  return {
    handleDelete,
    handleRequestTimeChange,
    handleUpdateTime,
    handleApproveTime,
    handleApproveEvent,
  };
};
