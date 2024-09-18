import { useState, useEffect, useMemo, useCallback } from 'react';
import {useMutation, useQuery} from 'react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from "../Config";

axios.defaults.withCredentials = true;
export const useReservationLogic = (isLoggedIn, onLogout, roomCalendarLinks, service) => {
    const [reservationTypes, setReservationTypes] = useState([]);
    const [errorMessages, setErrorMessages] = useState({});
    const [reservationType, setReservationType] = useState('');
    const [contactMail, setContactMail] = useState(config.contactMail);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (service) {
            setReservationTypes(service.reservation_types?.map(name => ({ value: name, label: name })) || []);
            setContactMail(service?.contact_mail);
            setErrorMessages({});
            if (isMobile) setIsModalOpen(false);
        }
    }, [service, isMobile]);

    // Fetch additional services using useQuery
    const fetchAdditionalServices = async (calendarId) => {
        const response = await axios.get(`${config.serverURL}/calendars/mini_services/${calendarId}`);
        return response.data.map(service => ({ value: service, label: service }));
    };

    let calendarId;
    if (reservationType && service)
        calendarId = service?.calendarIds?.[reservationType];

    const { data: additionalServices = [], error: additionalServicesError, isLoading } = useQuery(
        ['additionalServices', calendarId],
        () => fetchAdditionalServices(calendarId),
        {
            enabled: !!calendarId, // Only fetch if calendarId is truthy
            onError: (error) => {
                console.error('Error fetching additional services:', error);
            }
        }
    );

    const getTomorrowDate = useCallback(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    }, []);

    const formFields = useMemo(() => [
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


    const mutation = useMutation(
        (formData) => axios.post(`${config.serverURL}/events/create_event`, formData),
        {
            onSuccess: (response) => {
                if (response.status === 201) {
                    navigate('/success', {
                        state: {
                            ...response.data,
                            contactMail: service.contact_mail,
                            wikiLink: service.wikiLink
                        }
                    });
                    setErrorMessages({});
                } else {
                    handleError({ general: `Cannot create a reservation. ${response.data.message}` });
                }
            },
            onError: (error) => {
                const errorMessage = error.response?.status === 401
                    ? { auth: 'Authentication failed. Please log out and log in again.' }
                    : { general: 'Cannot create a reservation, try again later.' };
                handleError(errorMessage);
            }
        }
    );

    const handleError = useCallback((errorMessage) => {
        setErrorMessages(errorMessage);
        if (isMobile && errorMessage.general) setIsModalOpen(true);
    }, [isMobile]);

    const handleSubmit = useCallback((formData) => {
        mutation.mutate(formData);
    }, [mutation]);

    const handleReservationTypeChange = useCallback((value) => {
        setReservationType(value);
    }, []);

    return {
        reservationTypes,
        additionalServices,
        errorMessages,
        contactMail,
        isMobile,
        isModalOpen,
        formFields,
        mutation,
        handleSubmit,
        handleReservationTypeChange,
        setIsModalOpen
    };
};