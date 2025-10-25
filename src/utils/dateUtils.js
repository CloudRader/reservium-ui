// Format date for display (e.g., "14 Oct 2025, 16:30")
export const formatDateForDisplay = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};

// Format datetime for API (naive datetime without timezone, e.g., "2025-10-14 16:30:00")
export const formatDateTimeForAPI = (date) => {
  return date
    .toLocaleString('sv', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    .replace('T', ' ');
};

// Format datetime-local input value for API (YYYY-MM-DD HH:MM:SS)
export const formatDateTimeLocalForAPI = (datetimeLocalValue) => {
  // datetime-local format is already "YYYY-MM-DDTHH:MM"
  // Add seconds if not present
  if (datetimeLocalValue.length === 16) {
    return datetimeLocalValue.replace('T', ' ') + ':00';
  }
  return datetimeLocalValue.replace('T', ' ');
};
