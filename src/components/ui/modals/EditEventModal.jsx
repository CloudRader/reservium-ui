import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import { formatForDateTimeLocal } from '@utils/dateUtils';

const EditEventModal = ({
  isOpen,
  onClose,
  onConfirm,
  eventData,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    startTime: '',
    endTime: '',
    purpose: '',
    guests: 0,
    note: '',
  });

  useEffect(() => {
    if (isOpen && eventData) {
      setFormData({
        startTime: formatForDateTimeLocal(eventData.start_datetime),
        endTime: formatForDateTimeLocal(eventData.end_datetime),
        purpose: eventData.purpose || '',
        guests: eventData.guests || 0,
        note: '',
      });
    } else if (!isOpen) {
      setFormData({
        startTime: '',
        endTime: '',
        purpose: '',
        guests: 0,
        note: '',
      });
    }
  }, [isOpen, eventData]);

  const handleConfirm = () => {
    onConfirm({
      newTime: formData.startTime,
      endTime: formData.endTime,
      purpose: formData.purpose,
      guests: formData.guests,
      note: formData.note,
    });
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isConfirmDisabled =
    !formData.startTime ||
    !formData.endTime ||
    !formData.purpose.trim() ||
    !formData.note.trim();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Edit Event"
      confirmText="Save Changes"
      isConfirmDisabled={isConfirmDisabled}
      isLoading={isLoading}
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="edit-start-time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Start Time
          </label>
          <input
            id="edit-start-time"
            type="datetime-local"
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={formData.startTime}
            onChange={(e) => updateField('startTime', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="edit-end-time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            End Time
          </label>
          <input
            id="edit-end-time"
            type="datetime-local"
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={formData.endTime}
            onChange={(e) => updateField('endTime', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="edit-purpose" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Purpose
          </label>
          <input
            id="edit-purpose"
            type="text"
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={formData.purpose}
            onChange={(e) => updateField('purpose', e.target.value)}
            placeholder="Event purpose"
          />
        </div>
        <div>
          <label htmlFor="edit-guests" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Guests
          </label>
          <input
            id="edit-guests"
            type="number"
            min="0"
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={formData.guests}
            onChange={(e) => updateField('guests', parseInt(e.target.value, 10) || 0)}
            placeholder="Number of guests"
          />
        </div>
        <div>
          <label htmlFor="edit-change-reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Reason for Change
          </label>
          <textarea
            id="edit-change-reason"
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={formData.note}
            onChange={(e) => updateField('note', e.target.value)}
            placeholder="Please provide a reason for the changes..."
            rows="3"
          />
        </div>
      </div>
    </Modal>
  );
};

EditEventModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  eventData: PropTypes.shape({
    start_datetime: PropTypes.string,
    end_datetime: PropTypes.string,
    purpose: PropTypes.string,
    guests: PropTypes.number,
  }),
  isLoading: PropTypes.bool,
};

export default EditEventModal;
