import React, { useCallback } from "react";
import useReservationFormLogic from "../hooks/useReservationFormLogic";
import FormFieldRenderer from "./FormFieldRenderer";

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

  const renderField = useCallback(
    (field) => {
      const commonProps = {
        name: field.name,
        value: formData[field.name] || "",
        onChange: (e) => handleChange(e, field),
        className:
          "w-full p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500",
      };

      switch (field.type) {
        case "select":
          return (
            <select {...commonProps}>
              <option value="">Select an option</option>
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          );
        case "checkbox":
          return (
            <div className="space-y-2">
              {field.options.map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    {...commonProps}
                    value={option.value}
                    id={`${field.name}-${option.value}`}
                    checked={(formData[field.name] || []).includes(
                      option.value
                    )}
                    className="mr-2 focus:ring-green-500 h-4 w-4 text-green-600 border-green-300 rounded"
                  />
                  <label
                    htmlFor={`${field.name}-${option.value}`}
                    className="text-sm text-green-700"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          );
        case "empty":
          return null;
        default:
          return (
            <input
              type={field.type}
              {...commonProps}
              min={field.min}
              max={field.max}
            />
          );
      }
    },
    [formData, handleChange]
  );

  const renderAdditionalServices = useCallback(() => {
    if (additionalServices.length === 0) return null;

    const additionalServicesField = {
      name: "additionalServices",
      type: "checkbox",
      labelText: "Additionals",
      labelColor: "text-green-700",
      options: additionalServices,
    };

    return (
      <div>
        <label className="block text-sm font-medium text-green-700 mb-1">
          {additionalServicesField.labelText}
        </label>
        <FormFieldRenderer
          field={additionalServicesField}
          formData={formData}
          handleChange={handleChange}
        />
      </div>
    );
  }, [additionalServices, renderField]);

  return (
    <div className="max-w-1xl bg-gradient-to-r from-green-50 to-green-100 shadow-md p-6">
      <h2 className="text-2xl font-bold text-green-800 mb-6">
        Reservation Form
      </h2>
      <form onSubmit={(e) => handleSubmit(e)} className="space-y-5">
        {formFields.map((field) => (
          <div key={field.name}>
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-green-700 mb-1"
            >
              {field.labelText}
            </label>
            <FormFieldRenderer
              field={field}
              formData={formData}
              handleChange={handleChange}
            />
            {errors[field.name] && (
              <p className="text-red-600 text-sm mt-1">{errors[field.name]}</p>
            )}
          </div>
        ))}
        {renderAdditionalServices()}
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
      </form>
    </div>
  );
};

export default ReservationForm;
