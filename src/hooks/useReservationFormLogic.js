import { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import config from '../Config';

// axios.defaults.withCredentials = true;
const fetchAdditionalServices = async (calendarId) => {
    const response = await axios.get(`${config.serverURL}/calendars/mini_services/${calendarId}`);
    return response.data.map(service => ({ value: service, label: service }));
};

const useReservationFormLogic = (calendarIds, reservationTypes) => {
    // State management
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [reservationType, setReservationType] = useState('');

    const getTomorrowDate = useCallback(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    }, []);

    // Moving the initialFormFields definition before useState usage
    const formFields  = useMemo(() => [
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
            validation: (value) => !!value && value.length < 150,
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
        {
            name: 'type',
            type: 'select',
            labelText: 'Type of Reservation',
            labelColor: 'text-primary',
            options: reservationTypes,
            validation: (value) => !!value
        },
    ], [getTomorrowDate, reservationTypes]);


    // Initialize form data based on default values
    useEffect(() => {
        const initialData = formFields.reduce((acc, field) => {
            if (field.defaultValue !== undefined) {
                acc[field.name] = field.defaultValue;
            }
            return acc;
        }, {});
        setFormData(initialData);
    }, [formFields]);

    useEffect(() => {
        setFormData(prevData => ({
            ...prevData,
            additionalServices: []
        }));
    }, [reservationType, reservationTypes]);


    const { data: additionalServices = [] } = useQuery(
        ['additionalServices', reservationType, calendarIds[reservationType]],
        () => reservationType && calendarIds[reservationType] ? fetchAdditionalServices(calendarIds[reservationType]) : [],
        {
            enabled: !!reservationType && !!calendarIds[reservationType],
            keepPreviousData: true,
            onError: (error) => {
                console.error('Error fetching additional services:', error);
            }
        }
    );

    const validateField = useCallback((field, value) => {
        if (field.validation && !field.validation(value)) {
            return `Invalid value for ${field.labelText}`;
        }
        return null;
    }, []);

    const handleChange = useCallback((e, field) => {
        const { name, value, type, checked } = e.target;
        let updatedValue = value;

        if (field.type === 'time') {
            const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
            if (!timeRegex.test(value)) {
                return;
            }
        }
        if (field.type === 'date' || field.type === 'time') {
            const error = validateField(field, value);
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: error
            }));
            if (error) return;
        }

        if (field.name === 'type') {
            setReservationType(value);

        }

        if (type === 'checkbox' && name === 'additionalServices') {
            updatedValue = formData.additionalServices || [];
            if (checked) {
                updatedValue = [...updatedValue, value];
            } else {
                updatedValue = updatedValue.filter(item => item !== value);
            }
        }

        setFormData(prevData => ({
            ...prevData,
            [name]: updatedValue
        }));
    }, [formData, validateField]);

    const handleSubmit = useCallback((e, onSubmit) => {
        e.preventDefault();

        const validationErrors = formFields.reduce((acc, field) => {
            const error = validateField(field, formData[field.name]);
            if (error) acc[field.name] = error;
            return acc;
        }, {});

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            const payload = {
                start_datetime: `${formData.startDate}T${formData.startTime}`,
                end_datetime: `${formData.endDate}T${formData.endTime}`,
                purpose: formData.purpose,
                guests: parseInt(formData.guests, 10),
                reservation_type: formData.type,
                email: formData.email,
                additional_services: formData.additionalServices || [],
            };
            onSubmit(payload);
        }
    }, [formData, formFields, validateField]);

    return {
        formFields,
        additionalServices,
        formData,
        errors,
        handleChange,
        handleSubmit
    };
};

export default useReservationFormLogic;
