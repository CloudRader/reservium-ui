import React from 'react';
import PropTypes from 'prop-types';
import { Check, Clock, AlertCircle, X, Trash } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const statusConfig = {
    confirmed: {
      color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      icon: Check,
      label: 'Confirmed'
    },
    not_approved: {
      color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      icon: Clock,
      label: 'Pending Approval'
    },
    update_requested: {
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      icon: AlertCircle,
      label: 'Update Requested'
    },
    canceled: {
      color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      icon: X,
      label: 'Canceled'
    },
    deleted: {
      color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
      icon: Trash,
      label: 'Deleted'
    }
  };

  const config = statusConfig[status] || statusConfig.not_approved;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${config.color}`}>
      <Icon className="w-3 h-3" aria-hidden="true" />
      <span>{config.label}</span>
    </span>
  );
};

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired
};

export default StatusBadge;
