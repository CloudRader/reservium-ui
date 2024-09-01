import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import GoogleCalendar from './GoogleCalendar';
import ReservationForm from './ReservationForm';
import LoginInfo from "./LoginInfo";
import Logout from "./Logout";
import config from "./Config";
import ServicesSection from "./ServicesSection";

axios.defaults.withCredentials = true;

const ReservationComponent = ({ isLoggedIn, onLogout, roomCalendarLinks, service }) => {
    const [reservationTypes, setReservationTypes] = useState([]);
    const [additionalServices, setAdditionalServices] = useState([]);
    const [errorMessages, setErrorMessages] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [reservationType, setReservationType] = useState('');

    useEffect(() => {
        if (service) {
            setReservationTypes(service.reservation_types?.map(name => ({ value: name, label: name })) || []);
        }
    }, [service]);

    useEffect(() => {
        if (reservationType && service) {
            const selectedType = service.reservation_types.find(type => type === reservationType);
            if (selectedType) {
                const calendarId = service.calendar_id;
                axios.get(`${config.serverURL}/calendars/mini_services/${calendarId}`)
                    .then(response => {
                        setAdditionalServices(response.data.map(service => ({ value: service, label: service })));
                    })
                    .catch(error => {
                        console.error('Error fetching additional services:', error);
                        setAdditionalServices([]);
                    });
            }
        }
    }, [reservationType, service]);

    const getTomorrowDate = useCallback(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    }, []);

    const formFields = useMemo(() => {
        const baseFields = [
            // ... (previous fields remain unchanged)
        ];

        if (additionalServices.length > 0) {
            baseFields.push({
                name: 'additionalServices',
                type: 'checkbox',
                labelText: 'Additionals',
                labelColor: 'text-primary',
                options: additionalServices,
            });
        }

        return baseFields;
    }, [getTomorrowDate, reservationTypes, additionalServices]);

    const handleSubmit = useCallback((formData) => {
        axios.post(`${config.serverURL}/events/create_event`, formData)
            .then(response => {
                if (response.status === 201) {
                    setSuccessMessage('Reservation created successfully!');
                    setErrorMessages({});
                } else {
                    setSuccessMessage('');
                    setErrorMessages({ general: `Error creating reservation. ${response.data.message}` });
                }
            })
            .catch(error => {
                setSuccessMessage('');
                setErrorMessages(error.response?.status === 401
                    ? { auth: 'Authentication failed. Please log in again.' }
                    : { general: 'Error creating reservation, try again later.' });
            });
    }, []);

    const handleReservationTypeChange = useCallback((value) => {
        setReservationType(value);
    }, []);

    if (!isLoggedIn) {
        return <LoginInfo />;
    }

    if (errorMessages.auth) {
        return <Logout onLogout={onLogout} />;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                <ReservationForm
                    formFields={formFields}
                    onSubmit={handleSubmit}
                    onReservationTypeChange={handleReservationTypeChange}
                />
                {successMessage &&
                    <div className="alert alert-success mt-4">{successMessage}</div>}
                {errorMessages.general &&
                    <div className="alert alert-danger mt-4">{errorMessages.general}</div>
                }
                <div className="w-full bg-white shadow-md overflow-hidden p-6 no-underline">
                    <GoogleCalendar googleCalendars={roomCalendarLinks}/>
                </div>
            </div>
        </div>
    );
};

export default ReservationComponent;