import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';

const DateTimeRangeModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  placeholder = '',
  initialStartTime = '',
  initialEndTime = '',
  isLoading = false,
}) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (isOpen) {
      setStartTime(initialStartTime);
      setEndTime(initialEndTime);
    } else {
      setStartTime('');
      setEndTime('');
      setNote('');
    }
  }, [isOpen, initialStartTime, initialEndTime]);

  const handleConfirm = () => {
    onConfirm({ newTime: startTime, endTime, note });
  };

  const isConfirmDisabled = !startTime || !endTime || !note.trim();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title={title}
      isConfirmDisabled={isConfirmDisabled}
      isLoading={isLoading}
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="start-time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Start Time
          </label>
          <input
            id="start-time"
            type="datetime-local"
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="end-time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            End Time
          </label>
          <input
            id="end-time"
            type="datetime-local"
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="change-reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Reason for Change
          </label>
          <textarea
            id="change-reason"
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={placeholder}
            rows="3"
          />
        </div>
      </div>
    </Modal>
  );
};

DateTimeRangeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  initialStartTime: PropTypes.string,
  initialEndTime: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default DateTimeRangeModal;
