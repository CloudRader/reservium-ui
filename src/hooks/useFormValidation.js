import { useCallback, useState } from 'react';
import { validateField } from './useReservationFormLogic.utils';

// Use provided setErrors if available, otherwise use internal state
const useFormValidation = (formFields, formData, setErrorsProp) => {
    const [internalErrors, setInternalErrors] = useState({});
    const setErrors = setErrorsProp || setInternalErrors;

    const validateForm = useCallback(() => {
        const validationErrors = formFields.reduce((acc, field) => {
            const error = validateField(field, formData[field.name]);
            if (error) acc[field.name] = error;
            return acc;
        }, {});
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    }, [formFields, formData, validateField, setErrors]);

    return {  validateForm };
};

export default useFormValidation; 