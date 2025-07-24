import { useState, useCallback } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

const useCreateFormLogic = (initialFields, submitUrl) => {
  const [formFields, setFormFields] = useState(initialFields);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState(null);

  const handleChange = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target;
      setFormData((prevData) => {
        const updateNestedField = (obj, path, val) => {
          const [head, ...rest] = path;
          if (rest.length === 0) {
            return { ...obj, [head]: val };
          }
          return {
            ...obj,
            [head]: updateNestedField(obj[head] || {}, rest, val),
          };
        };

        const [groupName, fieldName] = name.split(".");
        if (groupName && fieldName) {
          // Handle nested fields
          return updateNestedField(
            prevData,
            [groupName, fieldName],
            type === "checkbox" ? checked : value
          );
        } else {
          // Handle top-level fields
          if (type === "checkbox") {
            const field =
              formFields.find((f) => f.name === name) ||
              formFields
                .flatMap((f) => f.fields || [])
                .find((f) => f.name === name);

            if (field && field.options.length > 1) {
              // Handle multiCheckbox
              const updatedValues = prevData[name] ? [...prevData[name]] : [];
              if (checked) {
                updatedValues.push(value);
              } else {
                const index = updatedValues.indexOf(value);
                if (index > -1) {
                  updatedValues.splice(index, 1);
                }
              }
              return { ...prevData, [name]: updatedValues };
            } else {
              // Handle regular checkbox
              return { ...prevData, [name]: checked };
            }
          } else {
            return { ...prevData, [name]: value };
          }
        }
      });
    },
    [formFields]
  );

  const handleSubmit = useCallback(
    (requestData) => {
      axios
        .post(submitUrl, requestData)
        .then(() => {
          setMessage({
            type: "success",
            text: "Operation completed successfully!",
          });
          setFormData({});
        })
        .catch((error) => {
          console.error("Error:", error);
          setMessage({
            type: "error",
            text: "An error occurred. Please try again.",
          });
        });
    },
    [submitUrl]
  );

  return {
    formFields,
    formData,
    message,
    setFormFields,
    handleSubmit,
    setMessage,
    setFormData,
    handleChange,
  };
};

export default useCreateFormLogic;
