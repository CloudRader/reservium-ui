import React from "react";

const FormFieldRenderer = ({ field, formData, handleChange }) => {
  const commonProps = {
    name: field.name,
    onChange: handleChange,
    className:
      "w-full p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500",
  };

  const getValue = (name) => {
    const [groupName, fieldName] = name.split(".");
    return groupName && fieldName
      ? formData[groupName]?.[fieldName]
      : formData[name];
  };

  switch (field.type) {
    case "group":
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
    case "color":
      return (
        <div className="flex items-center space-x-2">
          <input
            type="color"
            {...commonProps}
            value={getValue(field.name) || "#000000"}
            className="w-12 h-12 p-1 rounded-md cursor-pointer"
          />
          <input
            type="text"
            {...commonProps}
            value={getValue(field.name) || ""}
            className="flex-grow"
            placeholder="#000000"
          />
        </div>
      );
    case "checkbox":
      // Support both single and multi-checkbox
      if (field.options && field.options.length > 1) {
        // Multi-checkbox
        return (
          <div className="space-y-2">
            {field.options.map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  id={`${field.name}-${option.value}`}
                  name={field.name}
                  value={option.value}
                  checked={(formData[field.name] || []).includes(option.value)}
                  onChange={handleChange}
                  className="mr-2 focus:ring-green-500 h-4 w-4 text-green-600 border-green-300 rounded"
                />
                <label
                  htmlFor={`${field.name}-${option.value}`}
                  className="text-sm text-green-700"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );
      } else {
        // Single checkbox
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              {...commonProps}
              checked={getValue(field.name) || false}
              className="mr-2 focus:ring-green-500 h-4 w-4 text-green-600 border-green-300 rounded"
            />
            <label htmlFor={field.name} className="text-sm text-green-700">
              {field.options && field.options[0]?.label}
            </label>
          </div>
        );
      }
    case "select":
      return (
        <select {...commonProps} value={getValue(field.name) || ""}>
          <option value="">Select an option</option>
          {field.options &&
            field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
        </select>
      );
    case "empty":
      return null;
    default:
      return (
        <input
          type={field.type}
          {...commonProps}
          value={getValue(field.name) || ""}
          min={field.min}
          max={field.max}
        />
      );
  }
};

export default FormFieldRenderer;
