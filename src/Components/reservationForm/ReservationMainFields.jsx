import React from "react";
import FormFieldRenderer from "../ui/FormFieldRenderer.jsx";

const ReservationMainFields = ({
  formFields,
  formData,
  errors,
  handleChange,
}) => {
  return (
    <>
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
            handleChange={(e) => handleChange(e, field)}
          />
          {errors[field.name] && (
            <p className="text-red-600 text-sm mt-1">{errors[field.name]}</p>
          )}
        </div>
      ))}
    </>
  );
};

export default ReservationMainFields;
