import React, {useState, useEffect, useMemo, useCallback} from 'react';
import axios from 'axios';
import GoogleCalendar from './GoogleCalendar';
import ReservationForm from './ReservationForm';
import LoginInfo from "./LoginInfo";
import Logout from "./Logout";
import config from "./Config";

axios.defaults.withCredentials = true;

const ReservationComponent = ({isLoggedIn, onLogout, roomCalendarLinks, service}) => {
    const [reservationTypes, setReservationTypes] = useState([]);
    const [additionalServices, setAdditionalServices] = useState([]);
    const [errorMessages, setErrorMessages] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (service) {
            setReservationTypes(service.reservation_types?.map(name => ({value: name, label: name})) || []);
            setAdditionalServices(service.mini_services?.map(name => ({value: name, label: name})) || []);
        }
    }, [service]);

    const getTomorrowDate = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    };

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
            validation: (value) => !!value,
        },
        {
            name: 'guests',
            type: 'number',
            labelText: 'Number of Guests',
            labelColor: 'text-success',
            validation: (value) => value > 0 && value < 40,
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
        additionalServices.length === 0 ?
            {type: 'empty' } : {
                name: 'additionalServices',
                type: 'checkbox',
                labelText: 'Additional Services',
                labelColor: 'text-primary',
                options: additionalServices,
            },
    ], [reservationTypes, additionalServices]);

    const handleSubmit = useCallback((formData) => {
        axios.post(`${config.domenServer}/events/create_event`, formData)
            .then(response => {
                if (response.status === 201) {
                    setSuccessMessage('Reservation created successfully!');
                    setErrorMessages({});
                } else {
                    setSuccessMessage('');
                    setErrorMessages({general: `Error creating reservation. ${response.data.message}`});
                }
            })
            .catch(error => {
                setSuccessMessage('');
                setErrorMessages(error.response?.status === 401
                    ? {auth: 'Authentication failed. Please log in again.'}
                    : {general: 'Error creating reservation, try again later.'});
            });
    }, []);

    if (!isLoggedIn) {
        return <LoginInfo/>;
    }

    if (errorMessages.auth) {
        return <Logout onLogout={onLogout}/>;
    }

    return (
        <div>
            <ReservationForm
                formFields={formFields}
                onSubmit={handleSubmit}
            />
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessages.general && <div className="alert alert-danger">{errorMessages.general}</div>}
            <GoogleCalendar googleCalendars={roomCalendarLinks}/>
        </div>
    );
};

export default ReservationComponent;