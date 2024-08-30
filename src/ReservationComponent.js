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
        axios.post(`${config.serverURL}/events/create_event`, formData)
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
                        <ReservationForm
                            formFields={formFields}
                            onSubmit={handleSubmit}
                        />
                        {successMessage && <div className="alert alert-success mt-4">{successMessage}</div>}
                        {errorMessages.general &&
                            <div className="alert alert-danger mt-4">{errorMessages.general}</div>}
                </div>
                <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6">
                        <GoogleCalendar googleCalendars={roomCalendarLinks}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReservationComponent;