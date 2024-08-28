import React, {useState, useEffect} from 'react';
import axios from 'axios';
import GoogleCalendar from './GoogleCalendar';
import ReservationForm from './ReservationForm';
import LoginInfo from "./LoginInfo";
import Logout from "./Logout";
import config from "./Config";

const ReservationComponent = ({isLoggedIn, username, onLogout, roomCalendarLink, services}) => {
    const [options, setOptions] = useState([]);
    const [additionalServices, setAdditionalServices] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const [errFetchingAdditionalServices, seterrFetchingAdditionalServices] = useState(true);
    const [errFetchingTypeOfReservations, seterrFetchingTypeOfReservations] = useState(true);
    const [formFields, setFormFields] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        const newOptions = services.reservation_types.map(name => ({value: name, label: name}));
        setOptions(newOptions);
        seterrFetchingTypeOfReservations(false); // Reset fetch error if successful response

    }, [services]);

    useEffect(() => {
        if (services.mini_services) {
            const newAdditionalServices = services.mini_services.map(name => ({value: name, label: name}));
            setAdditionalServices(newAdditionalServices);
            seterrFetchingAdditionalServices(false); // Reset fetch error if successful response

        }
    }, [services]);

    const handleTypeChange = (selectedOption) => {
        setSelectedType(selectedOption.value);
    };

    useEffect(() => {
        setFormFields([
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
            errFetchingTypeOfReservations ? {type: "empty"} : { // Render empty array if there's a fetch error
                name: 'type',
                type: 'select',
                labelText: 'Type of Reservation',
                labelColor: 'text-primary',
                options: options,
                validation: (value) => !!value
            },
            errFetchingAdditionalServices ? {type: "empty"} : { // Render empty array if there's a fetch error
                name: 'additionalServices',
                type: 'checkbox',
                labelText: 'Additional Services',
                labelColor: 'text-primary',
                options: additionalServices,
            },
        ]);
    }, [options, additionalServices, errFetchingAdditionalServices, errFetchingTypeOfReservations, service]);

    const handleSubmit = (formData) => {
        axios.post(config.domenServer + '/events/post/', formData)
            .then(response => {
                if (response.status === 201) {
                    console.log('Reservation successful', response);
                    setSuccessMessage('Reservation created successfully!');
                    setErrorMessage('');
                } else {
                    console.error('', response);
                    setSuccessMessage('');
                    setErrorMessage(`Error creating reservation. ${response.data.message}`);
                }
            })
            .catch(error => {
                if (error.response.status === 401) {
                    console.error('Error making reservation:', error);
                    setSuccessMessage('');
                    setErrorMessage(`401`);
                } else {
                    console.error('Error making reservation:', error);
                    setSuccessMessage('');
                    setErrorMessage(`Error creating reservation, try again later.`);
                }
            });
    };

    return (
        <div>
            {isLoggedIn ? (
                errorMessage === '401' ?
                    (<Logout onLogout={onLogout}/>) :
                    (<>
                        <ReservationForm formFields={formFields} username={username} onSubmit={handleSubmit}
                                         onTypeChange={handleTypeChange}/>
                        {successMessage && <div className="alert alert-success">{successMessage}</div>}
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    </>)
            ) : (
                <LoginInfo/>
            )}
            <GoogleCalendar src={roomCalendarLink}/>
        </div>
    );
};

export default ReservationComponent
