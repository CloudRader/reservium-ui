import React from "react";
import FormFieldRenderer from "../ui/FormFieldRenderer.jsx";

const AdditionalServicesSection = ({
  additionalServices,
  formData,
  handleChange,
}) => {
  if (!additionalServices || additionalServices.length === 0) return null;

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
        handleChange={(e) => handleChange(e, additionalServicesField)}
      />
    </div>
  );
};

export default AdditionalServicesSection;
