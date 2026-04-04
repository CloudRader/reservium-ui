import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon } from '@components/ui/icons';

const Breadcrumbs = ({ items = [], className = '' }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className={`flex items-center space-x-2 text-sm mb-6 ${className}`}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {/* Breadcrumb Item */}
          {item.isEllipsis ? (
            <span className="text-gray-500 dark:text-gray-400">
              {item.label}
            </span>
          ) : item.isActive ? (
            <span className="text-gray-900 dark:text-white font-medium" aria-current="page">
              {item.label}
            </span>
          ) : (
            <Link
              to={item.href}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition-colors"
            >
              {item.label}
            </Link>
          )}

          {/* Separator */}
          {index < items.length - 1 && (
            <ChevronDownIcon className="w-4 h-4 text-gray-400 dark:text-gray-500 transform -rotate-90" />
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
