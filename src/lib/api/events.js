import axios from 'axios';
import { API_ENDPOINTS } from '@config/apiEndpoints';
import { API_BASE_URL } from '@constants';

/**
 * Delete an event
 * @param {string} eventId - Event ID
 * @param {object} note - Deletion note
 */
export async function deleteEvent(eventId, note) {
  const response = await axios.delete(`${API_BASE_URL}${API_ENDPOINTS.EVENTS.DELETE(eventId)}`, {
    data: note,
  });
  return response.data;
}

/**
 * Request time change for an event (regular users)
 * @param {string} eventId - Event ID
 * @param {string} newStartTime - New start time (formatted for API)
 * @param {string} newEndTime - New end time (formatted for API)
 * @param {string} reason - Reason for change
 */
export async function requestTimeChange(eventId, newStartTime, newEndTime, reason) {
  const response = await axios.put(
    `${API_BASE_URL}${API_ENDPOINTS.EVENTS.REQUEST_TIME_CHANGE(eventId)}`,
    {
      event_update: {
        requested_reservation_start: newStartTime,
        requested_reservation_end: newEndTime,
      },
      reason: reason,
    }
  );
  return response.data;
}

/**
 * Update event time directly (managers only)
 * @param {string} eventId - Event ID
 * @param {object} eventUpdate - Event update data
 * @param {string} reason - Reason for change
 */
export async function updateEventTime(eventId, eventUpdate, reason) {
  const response = await axios.put(`${API_BASE_URL}${API_ENDPOINTS.EVENTS.UPDATE(eventId)}`, {
    event_update: eventUpdate,
    reason: reason,
  });
  return response.data;
}

/**
 * Approve or decline time change request
 * @param {string} eventId - Event ID
 * @param {boolean} approve - Approve or decline
 * @param {object} managerNotes - Manager notes
 */
export async function approveTimeChange(eventId, approve, managerNotes) {
  const response = await axios.put(
    `${API_BASE_URL}${API_ENDPOINTS.EVENTS.APPROVE_TIME_CHANGE(eventId)}`,
    managerNotes,
    {
      params: { approve }
    }
  );
  return response.data;
}

/**
 * Approve or decline event
 * @param {string} eventId - Event ID
 * @param {boolean} approve - Approve or decline
 * @param {object} managerNotes - Manager notes
 */
export async function approveEvent(eventId, approve, managerNotes) {
  const response = await axios.put(
    `${API_BASE_URL}${API_ENDPOINTS.EVENTS.APPROVE(eventId)}`,
    managerNotes,
    {
      params: { approve }
    }
  );
  return response.data;
}
