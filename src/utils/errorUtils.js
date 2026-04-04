/**
 * Utility functions for error handling
 */

/**
 * Extract error message from API error response
 * @param {Error} error - Error object from API call
 * @param {string} fallbackMessage - Default message if extraction fails
 * @returns {string} Error message
 */
export const getErrorMessage = (error, fallbackMessage = 'An error occurred. Please try again.') => {
  // Check if error response has a message
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  // Check for detail field (common in FastAPI)
  if (error?.response?.data?.detail) {
    return error.response.data.detail;
  }

  // Check for error field
  if (error?.response?.data?.error) {
    return error.response.data.error;
  }

  // Check for errors array (validation errors)
  if (error?.response?.data?.errors && Array.isArray(error.response.data.errors)) {
    return error.response.data.errors.map(err => err.message || err.msg).join(', ');
  }

  // Check for statusText
  if (error?.response?.statusText) {
    return error.response.statusText;
  }

  // Check for error message
  if (error?.message) {
    return error.message;
  }

  // Return fallback message
  return fallbackMessage;
};
