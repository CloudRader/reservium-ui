import React from 'react';

export const HamburgerIcon = ({ className = 'h-6 w-6' }) => (
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
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);
