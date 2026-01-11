import React from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable tab button component
 * Used for tab navigation with active state styling
 */
const TabButton = ({ isActive, onClick, children }) => (
  <button
    className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-t-lg transition-colors ${
      isActive
        ? 'bg-green-100 text-green-700 border-b-2 border-green-600'
        : 'text-gray-600 hover:bg-green-50 hover:text-green-700'
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

TabButton.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default TabButton;
