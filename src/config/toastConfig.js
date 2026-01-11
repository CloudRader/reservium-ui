/**
 * Toast notification configuration
 * Using react-hot-toast for consistent notification UX
 * Designed to match the green theme of the application
 */

export const toastConfig = {
  // Global toast options
  position: 'bottom-right',
  duration: 4000,

  // Success toast style - matches green theme
  success: {
    duration: 4000,
    style: {
      background: '#16a34a', // green-600
      color: '#fff',
      padding: '12px 16px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      border: '1px solid #15803d', // green-700
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#16a34a',
    },
  },

  // Error toast style - red with shadow
  error: {
    duration: 5000,
    style: {
      background: '#dc2626', // red-600
      color: '#fff',
      padding: '12px 16px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      border: '1px solid #b91c1c', // red-700
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#dc2626',
    },
  },

  // Loading toast style - blue with shadow
  loading: {
    style: {
      background: '#2563eb', // blue-600
      color: '#fff',
      padding: '12px 16px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      border: '1px solid #1d4ed8', // blue-700
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#2563eb',
    },
  },
};
