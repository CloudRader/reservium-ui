import { useState, useEffect, useCallback, useMemo } from 'react';
import { getTomorrowDate, validateField, preparePayload } from './useReservationFormLogic.utils';
import useFormFields from './useFormFields';
import useAdditionalServices from './useAdditionalServices';
import useInitialFormData from './useInitialFormData';
import useSlotSync from './useSlotSync';
import useFormValidation from './useFormValidation';

const useReservationFormLogic = (calendarIds, reservationTypes, selectedSlot, onSubmit) => {
    const [formData, setFormData] = useState({});
    const [reservationType, setReservationType] = useState('');

    const { formFields } = useFormFields(reservationTypes);

    useInitialFormData(formFields, setFormData);

    const additionalServices = useAdditionalServices(reservationType, calendarIds);

    useSlotSync(selectedSlot, setFormData);

    // useEffect(() => {
    //     setFormData(prevData => ({
    //         ...prevData,
    //         additionalServices: []
    //     }));
    // }, [reservationType]);

    const handleChange = useCallback((e, field) => {
        const { name, value, type, checked } = e.target;

        // Special handling for additionalServices checkboxes
        if (type === 'checkbox' && name === 'additionalServices') {
            setFormData(prevData => {
                const prev = prevData.additionalServices || [];
                let updated;
                if (checked) {
                    // Only add if not already present
                    updated = prev.includes(value) ? prev : [...prev, value];
                } else {
                    updated = prev.filter(item => item !== value);
                }
                console.log('Checkbox changed:', value, checked, updated);
                return {
                    ...prevData,
                    additionalServices: updated
                };
            });


            return;
        }

        // For all other field types
        let updatedValue = value;

        if (type === 'time') {
            const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
            if (!timeRegex.test(value)) {
                return;
            }
        }
        if (type === 'date' || type === 'time') {
            const error = validateField(field, value);
            if (error) return;
        }

        if (name === 'type') {
            setReservationType(value);
        }

        setFormData(prevData => ({
            ...prevData,
            [name]: updatedValue
        }));
    }, [validateField]);

    const { errors, validateForm } = useFormValidation(formFields, formData, validateField);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        if (validateForm()) {
            const payload = preparePayload();
            onSubmit(payload);
        }
    }, [validateForm, preparePayload, onSubmit]);

    return {
        formFields,
        additionalServices,
        formData,
        errors,
        handleChange,
        handleSubmit,
    };
};

export default useReservationFormLogic;
