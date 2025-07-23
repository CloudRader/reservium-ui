import { useCallback, useState } from 'react';

const useFormValidation = (formFields, formData, validateField, setErrorsProp) => {
    const [internalErrors, setInternalErrors] = useState({});
    // Use provided setErrors if available, otherwise use internal state
    const setErrors = setErrorsProp || setInternalErrors;
    const errors = setErrorsProp ? setErrorsProp[0] : internalErrors;

    const validateForm = useCallback(() => {
        const validationErrors = formFields.reduce((acc, field) => {
            const error = validateField(field, formData[field.name]);
            if (error) acc[field.name] = error;
            return acc;
        }, {});
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    }, [formFields, formData, validateField, setErrors]);

    return { errors, validateForm };
};

export default useFormValidation; 