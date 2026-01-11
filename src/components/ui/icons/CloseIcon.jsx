import React from 'react';

export const CloseIcon = ({ className = 'h-6 w-6' }) => (
  <svg
    className={className}
    stroke="currentColor"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);
