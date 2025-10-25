import React from "react";

const ReservationSubmitButton = ({ isSubmitting }) => (
  <button
    type="submit"
    disabled={isSubmitting}
    className={`w-100 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
      isSubmitting
        ? "bg-green-400 cursor-not-allowed"
        : "bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
    }`}
  >
    {isSubmitting ? "Submitting..." : "Submit Reservation"}
  </button>
);

export default ReservationSubmitButton;
