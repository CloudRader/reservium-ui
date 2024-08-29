import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import GoogleCalendar from './GoogleCalendar';
import ReservationForm from './ReservationForm';
import LoginInfo from "./LoginInfo";
import Logout from "./Logout";
import config from "./Config";

axios.defaults.withCredentials = true;

const ReservationComponent = ({ isLoggedIn, onLogout, roomCalendarLinks, service }) => {
    const [reservationTypes, setReservationTypes] = useState([]);
    const [additionalServices, setAdditionalServices] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const [errFetchingAdditionalServices, setErrFetchingAdditionalServices] = useState(false);
    const [errFetchingTypeOfReservations, setErrFetchingTypeOfReservations] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (service) {
            setReservationTypes(service.reservation_types.map(name => ({ value: name, label: name })));
            setErrFetchingTypeOfReservations(false);

            if (service.mini_services) {
                setAdditionalServices(service.mini_services.map(name => ({ value: name, label: name })));
                setErrFetchingAdditionalServices(false);
            }
        }
    }, [service]);

    const handleTypeChange = useCallback((selectedOption) => {
        setSelectedType(selectedOption.value);
    }, []);

    const formFields = useMemo(() => [
        {
            name: 'startDate',
            type: 'date',
            labelText: 'Start Date',
            labelColor: 'text-success',
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
            validation: (value) => !!value,
        },
        {
            name: 'endDate',
            type: 'date',
            labelText: 'End Date',
            labelColor: 'text-success',
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
            validation: (value) => !!value,
        },
        {
            name: 'purpose',
            type: 'text',
            labelText: 'Purpose',
            labelColor: 'text-success',
            validation: (value) => !!value,
        },
        {
            name: 'guests',
            type: 'number',
            labelText: 'Number of Guests',
            labelColor: 'text-success',
            validation: (value) => value < 40,
        },
        {
            name: 'email',
            type: 'email',
            labelText: 'Email',
            labelColor: 'text-primary',
            validation: (value) => !!value
        },
        errFetchingTypeOfReservations ? { type: "empty" } : {
            name: 'type',
            type: 'select',
            labelText: 'Type of Reservation',
            labelColor: 'text-primary',
            options: reservationTypes,
            validation: (value) => !!value
        },
        errFetchingAdditionalServices ? { type: "empty" } : {
            name: 'additionalServices',
            type: 'checkbox',
            labelText: 'Additional Services',
            labelColor: 'text-primary',
            options: additionalServices,
        },
    ], [reservationTypes, additionalServices, errFetchingAdditionalServices, errFetchingTypeOfReservations]);

    const handleSubmit = useCallback((formData) => {
        axios.post(`${config.domenServer}/events/create_event`, formData)
            .then(response => {
                if (response.status === 201) {
                    setSuccessMessage('Reservation created successfully!');
                    setErrorMessage('');
                } else {
                    setSuccessMessage('');
                    setErrorMessage(`Error creating reservation. ${response.data.message}`);
                }
            })
            .catch(error => {
                setSuccessMessage('');
                setErrorMessage(error.response?.status === 401 ? '401' : 'Error creating reservation, try again later.');
            });
    }, []);

    if (!isLoggedIn) {
        return <LoginInfo />;
    }

    if (errorMessage === '401') {
        return <Logout onLogout={onLogout} />;
    }

    return (
        <div>
            <ReservationForm
                formFields={formFields}
                onSubmit={handleSubmit}
                onTypeChange={handleTypeChange}
            />
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <GoogleCalendar googleCalendars={roomCalendarLinks} />
        </div>
    );
};

export default ReservationComponent;