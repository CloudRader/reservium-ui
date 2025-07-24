import { useState, useCallback } from 'react';
import { preparePayload } from './useReservationFormLogic.utils';
import useFormFields from './useFormFields';
import useAdditionalServices from './useAdditionalServices';
import useInitialFormData from './useInitialFormData';
import useSlotSync from './useSlotSync';
import useFormValidation from './useFormValidation';

const useReservationFormLogic = (calendarIds, reservationTypes, selectedSlot, onSubmit) => {
    const [formData, setFormData] = useState({});
    const { formFields } = useFormFields(reservationTypes);

    useInitialFormData(formFields, setFormData);
    useSlotSync(selectedSlot, setFormData);

    // Use formData.type as the reservation type
    const additionalServices = useAdditionalServices(formData.type, calendarIds);

    const handleChange = useCallback((e, field) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox' && name === 'additionalServices') {
            setFormData(prevData => {
                let updated;
                if (checked) {
                    updated = [...prevData.additionalServices, value];
                } else {
                    updated = prevData.additionalServices.filter(item => item !== value);
                }
                return {
                    ...prevData,
                    additionalServices: updated
                };
            });
            return;
        }

        // Reset additionalServices if reservation type changes
        if (name === 'type') {
            setFormData(prevData => {
                return {
                    ...prevData,
                    [name]: value,
                    additionalServices: []
                };
            });
            return;
        }
        // Validate time fields
        if (type === 'time') {
            const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
            if (!timeRegex.test(value)) {
                return;
            }
        }

        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }, []);

    const { errors, validateForm } = useFormValidation(formFields, formData);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (validateForm()) {
            const payload = preparePayload(formData);
            onSubmit(payload);
        }
    }, [validateForm, preparePayload, onSubmit, formData]);

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
