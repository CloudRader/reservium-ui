import { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import constants from '../constants/Constants';
import moment from "moment/moment";

const fetchAdditionalServices = async (calendarId) => {
    const { data } = await axios.get(`${constants.serverURL}/calendars/mini_services/${calendarId}`);
    return data.map(service => ({ value: service, label: service }));
};

const useReservationFormLogic = (calendarIds, reservationTypes, selectedSlot, onSubmit) => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [reservationType, setReservationType] = useState('');

    const getTomorrowDate = useCallback(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    }, []);

    // Moving the initialFormFields definition before useState usage
    const mainFormFields = useMemo(() => [
        {
            name: 'startDate',
            type: 'date',
            labelText: 'Start Date',
            labelColor: 'text-success',
            defaultValue: getTomorrowDate(),
            validation: (value) => {
                const year = new Date(value).getFullYear();
                return year > 2023 && year < 3000;
            }
        },
        {
            name: 'startTime',
            type: 'time',
            labelText: 'Start Time',
            labelColor: 'text-success',
            defaultValue: '17:00',
            validation: (value) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(value),
        },
        {
            name: 'endDate',
            type: 'date',
            labelText: 'End Date',
            labelColor: 'text-success',
            defaultValue: getTomorrowDate(),
            validation: (value) => {
                const year = new Date(value).getFullYear();
                return year > 2023 && year < 3000;
            }
        },
        {
            name: 'endTime',
            type: 'time',
            labelText: 'End Time',
            labelColor: 'text-success',
            defaultValue: '20:00',
            validation: (value) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(value),
        },
        {
            name: 'purpose',
            type: 'text',
            labelText: 'Purpose',
            labelColor: 'text-success',
            validation: (value) => !!value && value.length < 41,
        },
        {
            name: 'guests',
            type: 'number',
            labelText: 'Number of Guests',
            labelColor: 'text-success',
            validation: (value) => value > 0 && value < 101,
        },
        {
            name: 'email',
            type: 'email',
            labelText: 'Email',
            labelColor: 'text-primary',
            validation: (value) => /\S+@\S+\.\S+/.test(value),
        },
    ], [getTomorrowDate]);

    const reservationTypeFormField = useMemo(() => ({
        name: 'type',
        type: 'select',
        labelText: 'Type of Reservation',
        labelColor: 'text-primary',
        options: reservationTypes,
        validation: (value) => !!value
    }), [reservationTypes]);

    const formFields = useMemo(() => [...mainFormFields, reservationTypeFormField], [mainFormFields, reservationTypeFormField]);

    // Initialize form data based on default values
    useEffect(() => {
        const initialData = formFields.reduce((acc, field) => {
            if (field.defaultValue !== undefined && acc[field.name] === undefined) {
                acc[field.name] = field.defaultValue;
            }
            return acc;
        }, {});
        setFormData(initialData);
    }, [formFields]);

    let { data: additionalServices = [] } = useQuery(
        ['additionalServices', reservationType, calendarIds[reservationType]],
        () => reservationType && calendarIds[reservationType] ? fetchAdditionalServices(calendarIds[reservationType]) : [],
        {
            enabled: !!reservationType && !!calendarIds[reservationType],
            keepPreviousData: true,
        }
    );

    // useEffect(() => {
    //     setFormData(prevData => ({
    //         ...prevData,
    //         additionalServices: []
    //     }));
    // }, [reservationType]);

    const validateField = useCallback((field, value) => {
        if (field.validation && !field.validation(value)) {
            return `Invalid value for ${field.labelText}`;
        }
        return null;
    }, []);

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
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: error
            }));
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

    useEffect(() => {
        if (selectedSlot) {
            const start = moment(selectedSlot.start);
            const end = moment(selectedSlot.end);
            setFormData(prev => ({
                ...prev,
                startDate: start.format('YYYY-MM-DD'),
                startTime: start.format('HH:mm'),
                endDate: end.format('YYYY-MM-DD'),
                endTime: end.format('HH:mm'),
            }));
        }
    }, [selectedSlot]);

    const validateForm = useCallback(() => {
        const validationErrors = formFields.reduce((acc, field) => {
            const error = validateField(field, formData[field.name]);
            if (error) acc[field.name] = error;
            return acc;
        }, {});

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    }, [formFields, formData, validateField]);

    const preparePayload = useCallback(() => {
        return {
            start_datetime: `${formData.startDate}T${formData.startTime}`,
            end_datetime: `${formData.endDate}T${formData.endTime}`,
            purpose: formData.purpose,
            guests: parseInt(formData.guests, 10),
            reservation_type: formData.type,
            email: formData.email,
            additional_services: formData.additionalServices || [],
        };
    }, [formData]);

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
