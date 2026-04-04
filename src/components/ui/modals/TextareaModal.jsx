import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';

const TextareaModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  placeholder = '',
  required = false,
  isLoading = false,
}) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setValue('');
      setError('');
    }
  }, [isOpen]);

  const handleConfirm = () => {
    if (required && !value.trim()) {
      setError('This field is required');
      return;
    }
    onConfirm({ note: value });
  };

  const isConfirmDisabled = required && !value.trim();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title={title}
      isConfirmDisabled={isConfirmDisabled}
      isLoading={isLoading}
    >
      <div>
        <label
          htmlFor="modal-textarea"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {title}
          {required && <span aria-label="required"> *</span>}
        </label>
        <textarea
          id="modal-textarea"
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError('');
          }}
          placeholder={placeholder}
          rows="3"
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={error ? 'textarea-error' : undefined}
        />
        {error && (
          <p id="textarea-error" role="alert" className="text-red-600 text-sm mt-1">
            {error}
          </p>
        )}
      </div>
    </Modal>
  );
};

TextareaModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default TextareaModal;
