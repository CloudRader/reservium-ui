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

// Format datetime for datetime-local input (YYYY-MM-DDTHH:mm)
export const formatForDateTimeLocal = (datetime) => {
  if (!datetime) return '';
  const date = new Date(datetime);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
