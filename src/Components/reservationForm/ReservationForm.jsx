import React from 'react';
import useReservationFormLogic from '../../hooks/useReservationFormLogic.js';
import AdditionalServicesSection from './AdditionalServicesSection.jsx';
import ReservationMainFields from './ReservationMainFields.jsx';
import SubmitButton from '../ui/SubmitButton.jsx';

const ReservationForm = ({
  onSubmit,
  isSubmitting,
  calendarIds,
  reservationTypes,
  selectedSlot,
  calendars,
}) => {
  const {
    formFields,
    miniServices: filteredMiniServices,
    formData,
    errors,
    handleChange,
    handleSubmit,
  } = useReservationFormLogic(
    calendarIds,
    reservationTypes,
    selectedSlot,
    onSubmit,
    calendars
  );

  return (
    <div className="max-w-1xl bg-gradient-to-r from-green-50 to-green-100 shadow-md p-6">
      <h2 className="text-2xl font-bold text-green-800 mb-6">
        Reservation Form
      </h2>
      <form onSubmit={(e) => handleSubmit(e)} className="space-y-5">
        <ReservationMainFields
          formFields={formFields}
          formData={formData}
          errors={errors}
          handleChange={handleChange}
        />
        {filteredMiniServices?.length > 0 && (
          <AdditionalServicesSection
            additionalServices={filteredMiniServices}
            formData={formData}
            handleChange={handleChange}
          />
        )}
        <SubmitButton isSubmitting={isSubmitting} />
      </form>
    </div>
  );
};

export default ReservationForm;
