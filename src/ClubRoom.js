import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GoogleCalendar from './GoogleCalendar';
import ReservationForm from './ReservationForm';
import LoginInfo from "./LoginInfo";
import Logout from "./Logout";

const ClubRoom = ({ isLoggedIn, username,onLogout }) => {
    const [options, setOptions] = useState([]);
    const [additionalServices, setAdditionalServices] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const [fetchError, setFetchError] = useState(true);
    const [formFields, setFormFields] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const domenServer = "https://rezervace.buk.cvut.cz:8000" // TODO set domen delete proxy
    // "proxy": "https://rezervace.buk.cvut.cz:8000",

    useEffect(() => {
        axios.get(domenServer + "/calendars/alias/klub")
            .then(response => {
                const data = response.data;
                const newOptions = data.map(name => ({ value: name, label: name }));
                setOptions(newOptions);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const clubRoomCalendarLink = "https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Europe%2FPrague&bgcolor=%23B39DDB&title=Club%20Room&showCalendars=0&showTz=0&showPrint=0&hl=en&src=Y185MGMwNTM1ODNkNGQyYWUxNTY1NTFjNmVjZDMxMWY4N2RhZDYxMGEzMjcyNTQ1YzM2Mzg3OTY0NWY2OTY4Y2VmQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y18xOTU4NmEzZGE1MGNhMDY1NjZlZjYyMDEyZDY4MjllYmY0ZTMwMjYxMDgyMTJlOWY5ZDBjYzJmYzZiYzdjNDRhQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y180ZjNjY2I5YjI1ZTNlMzdiYzFkY2VhODc4NGE4YTExNDQyZDM5ZTcwMDgwOWExMmJlZTIxYmJlZWI2N2FmNzY1QGdyb3VwLmNhbGVuZGFyLmdvb2lsZS5jb20&src=Y184ZmM4YzY3NjBmN2UzMmVkNTc3ODVjZjQ3MzlkYzYzZTQwNmI0YTgwMmFlZWM2NWNhMGIxYTNmNTY2OTYyNjNkQGdyb3VwLmNhbGVuZGFyLmdvb2lsZS5jb20&src=Y19hYzg5MzBiMDAwZTQzODE4NzA3ZDZmZjVlYzRlNDBiN2VmNTI5ZjRkYjc5MDg5Y2Q1YzNlZGFhM2I1OWZiNDFiQGdyb3VwLmNhbGVuZGFyLmdvb2lsZS5jb20&color=%23795548&color=%234285F4&color=%234285F4&color=%239E69AF&color=%239E69AF";

    useEffect(() => {
        if (selectedType) {
            axios.get(`${domenServer}/calendars/type/${selectedType}`)
                .then(response => {
                    const data = response.data;
                    const newAdditionalServices = data.map(service => ({ value: service, label: service }));
                    setAdditionalServices(newAdditionalServices);
                    setFetchError(false); // Reset fetch error if successful response
                })
                .catch(error => {
                    console.error("Error fetching additional services:", error);
                    setAdditionalServices([]); // Set additional services to empty array on error
                    setFetchError(true); // Set fetch error flag
                });
        }
    }, [selectedType]);

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
            {
                name: 'type',
                type: 'select',
                labelText: 'Type of Reservation',
                labelColor: 'text-primary',
                options: options,
                validation: (value) => !!value
            },
            fetchError ? { type: "empty"} : { // Render empty array if there's a fetch error
                name: 'additionalServices',
                type: 'checkbox',
                labelText: 'Additional Services',
                labelColor: 'text-primary',
                options: additionalServices,
            },

        ]);
    }, [options, additionalServices, fetchError, username]);

    const handleSubmit = (formData) => {
        axios.post(domenServer + '/events/post/', formData)
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
                    setErrorMessage(`Error creating reservation, try again later. ${error.response.data.message}`);
                }

            });
    };

    return (
        <div>
            {isLoggedIn ? (
                errorMessage === '401' ?
                (<Logout onLogout={onLogout}/>) :
                    (
                <>
                    <ReservationForm formFields={formFields} username={username} onSubmit={handleSubmit} onTypeChange={handleTypeChange} />
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                </>)
            ) : (
                <LoginInfo />
            )}
            <GoogleCalendar src={clubRoomCalendarLink} />
        </div>
    );
};

export default ClubRoom;
