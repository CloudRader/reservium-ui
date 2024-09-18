import { useState, useEffect, useMemo, useCallback } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from "../Config";

axios.defaults.withCredentials = true;
export const useReservationLogic = (isLoggedIn, onLogout, roomCalendarLinks, service) => {
    const [reservationTypes, setReservationTypes] = useState([]);
    const [additionalServices, setAdditionalServices] = useState([]);
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

    useEffect(() => {
        if (reservationType && service) {
            const calendarId = service.calendarIds[reservationType];
            axios.get(`${config.serverURL}/calendars/mini_services/${calendarId}`)
                .then(response => {
                    setAdditionalServices(response.data.map(service => ({ value: service, label: service })));
                })
                .catch(error => {
                    console.error('Error fetching additional services:', error);
                    setAdditionalServices([]);
                });
        } else {
            setAdditionalServices([]);
        }
    }, [reservationType, service]);

    const getTomorrowDate = useCallback(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    }, []);

    const formFields = useMemo(() => [
        // ... (same as in the original component)
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