import React from 'react';
import PropTypes from 'prop-types';

const StatusBadge = ({ status }) => {
  const statusColors = {
    confirmed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    not_approved: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    update_requested: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    canceled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    deleted: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  };

  return (
    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${statusColors[status] || statusColors.not_approved}`}>
      {status}
    </span>
  );
};

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired
};

export default StatusBadge;
