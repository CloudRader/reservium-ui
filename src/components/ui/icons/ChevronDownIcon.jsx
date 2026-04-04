import React from 'react';

export const ChevronDownIcon = ({ className = 'w-4 h-4', isRotated = false }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      transform: isRotated ? 'rotate(180deg)' : 'rotate(0)',
      transition: 'transform 200ms ease-in-out'
    }}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M19 9l-7 7-7-7"
    />
  </svg>
);
