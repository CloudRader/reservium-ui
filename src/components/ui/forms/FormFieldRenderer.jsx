import React from 'react';
import Select from './Select';

const FormFieldRenderer = ({ field, formData, handleChange }) => {
  const commonProps = {
    id: field.id || field.name,
    name: field.name,
    onChange: handleChange,
    className:
      'w-full p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500',
  };

  const getValue = (name) => {
    const [groupName, fieldName] = name.split('.');
    return groupName && fieldName
      ? formData[groupName]?.[fieldName]
      : formData[name];
  };

  const getArrayValue = (name) => {
    const value = getValue(name);
    if (Array.isArray(value)) return value;
    if (value === undefined || value === null) return [];
    // Coerce primitive to array of string for comparison
    if (typeof value === 'string') return [value];
    if (typeof value === 'number' || typeof value === 'boolean')
      return [String(value)];
    try {
      // Attempt to coerce iterable-like values
      return Array.from(value);
    } catch (_) {
      return [];
    }
  };

  switch (field.type) {
    case 'group':
      return (
        <div key={field.name} className="space-y-4">
          {field.fields.map((subField) => (
            <div key={`${field.name}.${subField.name}`}>
              <label
                htmlFor={`${field.name}.${subField.name}`}
                className="block text-xl font-medium text-green-700 mb-1"
              >
                {subField.labelText}
              </label>
              <FormFieldRenderer
                field={{ ...subField, name: `${field.name}.${subField.name}` }}
                formData={formData}
                handleChange={handleChange}
              />
            </div>
          ))}
        </div>
      );
    case 'color':
      return (
        <div className="flex items-center space-x-2">
          <input
            type="color"
            {...commonProps}
            value={getValue(field.name) || '#000000'}
            className="w-12 h-12 p-1 rounded-md cursor-pointer"
            aria-label="Color picker"
          />
          <input
            id={`${commonProps.id}-text`}
            type="text"
            name={commonProps.name}
            value={getValue(field.name) || ''}
            onChange={commonProps.onChange}
            className="flex-grow"
            placeholder="#000000"
            aria-label="Color hex value"
          />
        </div>
      );
    case 'checkbox':
      // Prefer explicit single-checkbox flag
      if (field.sybType === 'oneCheckbox') {
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              {...commonProps}
              checked={!!getValue(field.name)}
              className="mr-2 h-4 w-4 accent-green-600 border-green-300 rounded"
            />
            <label htmlFor={commonProps.id} className="text-sm text-green-700">
              {field.labelText}
            </label>
          </div>
        );
      }

      // Multi-checkbox when there are options
      if (Array.isArray(field.options) && field.options.length > 0) {
        return (
          <div className="space-y-2">
            {(() => {
              const selectedSet = new Set(
                getArrayValue(field.name).map((v) => String(v))
              );
              return field.options.map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`${field.name}-${option.value}`}
                    name={field.name}
                    value={option.value}
                    checked={selectedSet.has(String(option.value))}
                    onChange={handleChange}
                    className="mr-2 h-4 w-4 accent-green-600 border-green-300 rounded"
                  />
                  <label
                    htmlFor={`${field.name}-${option.value}`}
                    className="text-sm text-green-700"
                  >
                    {option.label}
                  </label>
                </div>
              ));
            })()}
          </div>
        );
      }

      // No options to choose from -> show disabled hint
      return <div className="text-sm text-slate-500">No options available</div>;
    case 'select':
      return (
        <Select
          name={field.name}
          value={getValue(field.name) || ''}
          onChange={handleChange}
          options={field.options || []}
          placeholder="Select an option"
        />
      );
    case 'empty':
      return null;
    default:
      return (
        <input
          type={field.type}
          {...commonProps}
          value={getValue(field.name) || ''}
          min={field.min}
          max={field.max}
        />
      );
  }
};

export default FormFieldRenderer;
