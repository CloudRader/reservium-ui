import { useState, useCallback, useMemo } from 'react';
import { preparePayload } from './useReservationFormLogic.utils';
import useFormFields from './useFormFields';
import useInitialFormData from './useInitialFormData';
import useSlotSync from './useSlotSync';
import useFormValidation from './useFormValidation';

const useReservationFormLogic = (calendarIds, reservationTypes, selectedSlot, onSubmit, calendars = []) => {
    const [formData, setFormData] = useState({});
    const { formFields } = useFormFields(reservationTypes);

    useInitialFormData(formFields, setFormData, formData);
    useSlotSync(selectedSlot, setFormData);

    // Filter and format mini services for the selected reservation type from the matching calendar
    const filteredMiniServices = useMemo(() => {
        if (!formData.type || !calendars || calendars.length === 0) {
            return [];
        }

        // Find the calendar that matches the selected reservation type
        const selectedCalendar = calendars.find(
            calendar => calendar.reservation_type === formData.type
        );

        if (!selectedCalendar || !selectedCalendar.mini_services) {
            return [];
        }

        return selectedCalendar.mini_services.map(service => ({
            value: service.name,
            label: service.name
        }));
    }, [formData.type, calendars]);

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
            const payload = preparePayload(formData, calendarIds);
            onSubmit(payload);
        }
    }, [validateForm, preparePayload, onSubmit, formData]);

    return {
        formFields,
        miniServices: filteredMiniServices,
        formData,
        errors,
        handleChange,
        handleSubmit,
    };
};

export default useReservationFormLogic;
