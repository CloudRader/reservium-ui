import React from 'react';
import PropTypes from 'prop-types';
import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronDown, Check } from 'lucide-react';

/**
 * Custom Select component using Radix UI
 */
const Select = ({ name, value, onChange, options, placeholder = 'Select an option', className = '' }) => {
  const handleValueChange = (newValue) => {
    // Create a synthetic event to match the native select onChange signature
    const syntheticEvent = {
      target: {
        name,
        value: newValue,
      },
    };
    onChange(syntheticEvent);
  };

  return (
    <SelectPrimitive.Root value={value} onValueChange={handleValueChange}>
      <SelectPrimitive.Trigger
        className={`w-full p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 flex items-center justify-between ${className}`}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon>
          <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          className="overflow-hidden bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50"
          position="popper"
          sideOffset={5}
        >
          <SelectPrimitive.Viewport className="p-1">
            {options && options.length > 0 ? (
              options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  className="relative flex items-center px-8 py-2 text-sm rounded-sm cursor-pointer select-none outline-none data-[highlighted]:bg-green-100 dark:data-[highlighted]:bg-green-900 data-[highlighted]:text-green-900 dark:data-[highlighted]:text-green-100 data-[disabled]:opacity-50 data-[disabled]:pointer-events-none"
                >
                  <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
                    <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </SelectPrimitive.ItemIndicator>
                  <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))
            ) : (
              <div className="px-8 py-2 text-sm text-gray-500 dark:text-gray-400">
                No options available
              </div>
            )}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

export default Select;
