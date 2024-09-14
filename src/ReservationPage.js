import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import ReservationForm from './ReservationForm';
import LoginInfoPage from "./LoginInfoPage";
import Logout from "./Logout";
import config from "./Config";
import AdaptiveCalendar from "./AdaptiveCalendar";
import {useNavigate} from "react-router-dom";
import { useMutation, useQuery } from 'react-query';
import WarningMessage from "./WarningMessage";
import {ErrorMobileModal} from "./ErrorMobileModal";
import PulsatingLoader from "./Components/PulsatingLoader";
axios.defaults.withCredentials = true;

const ReservationPage = ({ isLoggedIn, onLogout, roomCalendarLinks, service }) => {
    const [reservationTypes, setReservationTypes] = useState([]);
    const [additionalServices, setAdditionalServices] = useState([]);
    const [errorMessages, setErrorMessages] = useState({});
    const [reservationType, setReservationType] = useState('');
    const [contactMail, setContactMail] = useState(config.contactMail);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate()

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

    const { data: additionalServicesData } = useQuery(
        ['additionalServices', reservationType, service],
        async () => {
            if (!reservationType || !service) return [];
            const calendarId = service.calendarIds[reservationType];
            const response = await axios.get(`${config.serverURL}/calendars/mini_services/${calendarId}`);
            return response.data.map(service => ({ value: service, label: service }));
        },
        {
            enabled: !!reservationType && !!service,
            onError: (error) => {
                console.error('Error fetching additional services:', error);
                return [];
            }
        }
    );

    useEffect(() => {
        if (additionalServicesData) {
            setAdditionalServices(additionalServicesData);
        }
    }, [additionalServicesData]);

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

    if (!isLoggedIn) {
        return <LoginInfoPage />;
    }

    if (errorMessages.auth) {
        return <Logout onLogout={onLogout} />;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <WarningMessage contactMail={contactMail} wikiLink={service.wikiLink} />
            <div className="flex flex-col lg:flex-row gap-8">
                <ReservationForm
                    formFields={formFields}
                    additionalServices={additionalServices}
                    onSubmit={handleSubmit}
                    onReservationTypeChange={handleReservationTypeChange}
                    isSubmitting={mutation.isLoading}
                />
                <div className="w-full bg-white shadow-md overflow-hidden p-6 no-underline">
                    <AdaptiveCalendar googleCalendars={roomCalendarLinks}/>
                    {!isMobile && errorMessages.general &&
                        <div className="alert alert-danger mt-5">{errorMessages.general}</div>
                    }
                </div>
            </div>
            {mutation.isLoading && <PulsatingLoader />}
            <ErrorMobileModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                message={errorMessages.general}
            />
        </div>
    );
};

export default ReservationPage;