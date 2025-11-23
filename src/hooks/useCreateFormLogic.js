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

            const isOneCheckbox = field?.sybType === "oneCheckbox";
            const hasOptions = Array.isArray(field?.options) && field.options.length > 0;

            if (!isOneCheckbox && hasOptions) {
              // Handle multi-checkbox list
              const current = Array.isArray(prevData[name]) ? prevData[name] : [];
              const updatedValues = new Set(current.map(String));
              const asString = String(value);
              if (checked) {
                updatedValues.add(asString);
              } else {
                updatedValues.delete(asString);
              }
              return { ...prevData, [name]: Array.from(updatedValues) };
            }

            // Single checkbox (boolean)
            return { ...prevData, [name]: !!checked };
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
      // Apply customHandler transformations before sending
      const transformedData = { ...requestData };
      formFields.forEach((field) => {
        if (field.customHandler && transformedData[field.name] !== undefined) {
          transformedData[field.name] = field.customHandler(transformedData[field.name]);
        }
      });

      axios
        .post(submitUrl, transformedData)
        .then(() => {
          setMessage({
            type: "success",
            text: "Operation completed successfully!",
          });
          setFormData({});
        })
        .catch((error) => {
          console.error("Error:", error);
          let text = "An error occurred. Please try again.";
          const data = error?.response?.data;

          // FastAPI-style: { detail: [{ msg, loc, type }, ...] } or string
          if (Array.isArray(data?.detail) && data.detail.length > 0) {
            const formatLoc = (loc) => {
              if (!Array.isArray(loc) || loc.length === 0) return undefined;
              // If FastAPI puts 'body' first, use the immediate field at index 1
              if (loc[0] === "body" && loc.length >= 2) return String(loc[1]);
              // Otherwise, prefer the last segment as the field name
              return String(loc[loc.length - 1]);
            };
            text = data.detail
              .map((d) => {
                const loc = formatLoc(d?.loc);
                const msg = d?.msg || d?.message || String(d);
                return loc ? `${loc}: ${msg}` : msg;
              })
              .join("; ");
          } else if (typeof data?.detail === "string") {
            text = data.detail;
          } else if (data?.message) {
            text = data.message;
          } else if (typeof data === "string") {
            text = data;
          } else if (error?.message) {
            text = error.message;
          }

          setMessage({ type: "error", text });
        });
    },
    [submitUrl, formFields]
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
