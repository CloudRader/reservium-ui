import React from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable form input component
 * Reduces repetitive input field code
 */
const FormInput = ({
  id,
  name,
  type = 'text',
  label,
  required = false,
  readOnly = false,
  defaultValue,
  value,
  onChange,
  className = '',
}) => {
  const baseInputClass =
    'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500';
  const readOnlyClass = readOnly ? 'bg-gray-100' : '';
  const inputClass = `${baseInputClass} ${readOnlyClass} ${className}`;

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        readOnly={readOnly}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        className={inputClass}
      />
    </div>
  );
};

FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  className: PropTypes.string,
};

export default FormInput;
