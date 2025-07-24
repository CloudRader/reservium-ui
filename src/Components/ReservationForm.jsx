import React from "react";
import useReservationFormLogic from "../hooks/useReservationFormLogic";
import AdditionalServicesSection from "./AdditionalServicesSection";
import ReservationMainFields from "./ReservationMainFields";
import SubmitButton from "./ui/SubmitButton";

const ReservationForm = ({
  onSubmit,
  isSubmitting,
  calendarIds,
  reservationTypes,
  selectedSlot,
}) => {
  const {
    formFields,
    additionalServices,
    formData,
    errors,
    handleChange,
    handleSubmit,
  } = useReservationFormLogic(
    calendarIds,
    reservationTypes,
    selectedSlot,
    onSubmit
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
        {additionalServices && (
          <AdditionalServicesSection
            additionalServices={additionalServices}
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
