import React, { useEffect } from "react";
import constants from "../constants/Constants";
import UniversalLayout from "../layouts/UniversalLayout";
import SuccessErrorMessage from "./ui/SuccessErrorMessage";
import useCreateFormLogic from "../hooks/useCreateFormLogic";

const CreateNewMiniService = ({ serviceId }) => {
  const {
    formFields,
    formData,
    message,
    setFormFields,
    handleSubmit,
    renderField,
    setFormData,
  } = useCreateFormLogic(
    [],
    `${constants.serverURL}/mini_services/create_mini_service`
  );

  useEffect(() => {
    setFormFields([
      {
        name: "name",
        type: "text",
        labelText: "Mini Service Name",
        labelColor: "text-success",
        validation: (value) => !!value,
      },
      {
        name: "lockers_id",
        type: "text",
        labelText: "Lockers IDs (comma-separated)",
        labelColor: "text-success",
        customHandler: (value) => {
          return value
            ? value
                .split(",")
                .map((id) => parseInt(id.trim()))
                .filter((id) => !isNaN(id))
            : [];
        },
      },
      {
        name: "access_group",
        type: "text",
        labelText: "Access Group",
        labelColor: "text-success",
      },
      {
        name: "room_id",
        type: "number",
        labelText: "Room ID",
        labelColor: "text-success",
      },
    ]);
  }, [setFormFields]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      reservation_service_id: serviceId,
    }));
  }, [setFormData, serviceId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  return (
    <UniversalLayout
      centerContent
      whiteBackGreenContentBackground
      headerTittle={"Create New Mini Service"}
    >
      <div className="bg-white p-4 rounded-lg shadow">
        <form onSubmit={handleFormSubmit} className="space-y-5">
          {formFields.map((field) => (
            <div key={field.name}>
              {field.type !== "hidden" && (
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-green-700 mb-1"
                >
                  {field.labelText}
                </label>
              )}
              {renderField(field)}
            </div>
          ))}
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Create Mini Service
          </button>
        </form>

        {message && <SuccessErrorMessage message={message} />}
      </div>
    </UniversalLayout>
  );
};

export default CreateNewMiniService;
