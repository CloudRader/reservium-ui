import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import constants from '../Constants';
import UniversalLayout from "../UniversalLayout";
axios.defaults.withCredentials = true;
const CreateNewCalendar = ({ serviceId }) => {
    const [formFields, setFormFields] = useState([]);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [selectedType, setSelectedType] = useState(null);
    const [additionalServices, setAdditionalServices] = useState([]);
    const [collisionWithCalendarOptions, setCollisionWithCalendarOptions] = useState([]);
    const [errFetchingAdditionalServices, setErrFetchingAdditionalServices] = useState(true);
    const [errFetchingTypeOfReservations, setErrFetchingTypeOfReservations] = useState(true);
    const [googleCalendars, setGoogleCalendars] = useState([]);
    const [isLoadingCalendars, setIsLoadingCalendars] = useState(false);
    const [calendarIdInputType, setCalendarIdInputType] = useState('manual');
    const [manualCalendarId, setManualCalendarId] = useState('');

    const fetchGoogleCalendars = async () => {
        setIsLoadingCalendars(true);
        try {
            const response = await axios.get(`${constants.serverURL}/calendars/google_calendars/`);
            setGoogleCalendars(response.data);
            setIsLoadingCalendars(false);
            setCalendarIdInputType('select');
        } catch (error) {
            console.error('Error fetching Google Calendars:', error);
            setErrorMessage('Failed to fetch Google Calendars');
            setIsLoadingCalendars(false);
        }
    };

    useEffect(() => {
        setFormFields(prevFields => prevFields.map(field =>
            field.name === 'calendar_id'
                ? {
                    ...field,
                    type: calendarIdInputType === 'select' ? 'select' : 'text',
                    options: calendarIdInputType === 'select' ? googleCalendars.map(calendar => ({
                        value: calendar.id,
                        label: calendar.summary
                    })) : []
                }
                : field
        ));
    }, [calendarIdInputType, googleCalendars]);

    const handleChange = (e, field) => {
        const { name, value, type, checked } = e.target;

        if (name === 'calendar_id' && calendarIdInputType === 'manual') {
            setManualCalendarId(value);
        }

        setFormData(prevData => {
            if (type === 'checkbox') {
                const currentValues = prevData[name] || [];
                if (checked) {
                    return { ...prevData, [name]: [...currentValues, value] };
                } else {
                    return { ...prevData, [name]: currentValues.filter(item => item !== value) };
                }
            } else {
                return { ...prevData, [name]: value };
            }
        });

        if (field.name === 'service_alias') {
            setSelectedType(value);
        }
    };

    useEffect(() => {
        // Update the calendar_id field in formFields when googleCalendars changes
        if (googleCalendars.length > 0) {
            setFormFields(prevFields => prevFields.map(field =>
                field.name === 'calendar_id'
                    ? {
                        ...field,
                        type: 'select',
                        options: googleCalendars.map(calendar => ({
                            value: calendar.id,
                            label: calendar.summary
                        }))
                    }
                    : field
            ));
        }
    }, [googleCalendars]);

    useEffect(() => {
            // axios.get(`${constants.serverURL}/calendars/alias/${selectedType}`)
            axios.get(`${constants.serverURL}/calendars/`)
                .then(response => {
                    const newOptions = response.data
                        .filter(calendar => calendar.id === serviceId) // Filter out the elements that don't meet the condition
                        .map(calendar => ({value: calendar.calendar_id, label: calendar.event_name})); // Map the filtered elements to the desired format
                    setCollisionWithCalendarOptions(newOptions);
                    setErrFetchingTypeOfReservations(false);
                })
                .catch(error => {
                    console.error("Error fetching reservation types:", error);
                    setErrFetchingTypeOfReservations(true);
                });
    }, []);

    useEffect(() => {
        setFormFields([
            {
                name: 'calendar_id',
                type: 'text',
                labelText: 'Calendar ID (make google calendar first)',
                labelColor: 'text-success',
                validation: (value) => !!value,
            },
            {
                name: 'service_alias',
                type: 'select',
                labelText: 'Service Alias',
                labelColor: 'text-success',
                options: [
                    {value: 'klub', label: 'Klub'},
                    {value: 'stud', label: 'Stud'},
                    {value: 'grill', label: 'Grill'},
                ],
                validation: (value) => !!value,
            },
            {
                name: 'more_than_max_people_with_permission',
                type: 'checkbox',
                sybType: 'oneCheckbox',
                labelText: 'Allow More Than Max People With Permission',
                labelColor: 'text-success',
                options: [{value: 'true', label: 'True'}],
            },
            {
                name: 'color',
                type: 'color',
                labelText: 'Calendar Color',
                labelColor: 'text-success',
            },
            // errFetchingTypeOfReservations ? {type: "empty"} : {
            //     name: 'collision_with_calendar',
            //     type: 'checkbox',
            //     labelText: 'Collision With Calendar',
            //     labelColor: 'text-success',
            //     options: collisionWithCalendarOptions,
            //     validation: (value) => value,
            // },
            // errFetchingAdditionalServices ? {type: "empty"} : {
            //     name: 'mini_services',
            //     type: 'checkbox',
            //     labelText: 'Mini Services',
            //     labelColor: 'text-success',
            //     options: additionalServices,
            // },
            {
                name: 'collision_with_itself',
                type: 'checkbox',
                sybType: 'oneCheckbox',
                labelText: 'Collision With Itself',
                labelColor: 'text-success',
                options: [{value: 'true', label: 'True'}],
                validation: (value) => value,
            },
            {
                name: 'reservation_type',
                type: 'text',
                labelText: 'Reservation Type',
                labelColor: 'text-success',
                validation: (value) => !!value,
            },
            {
                name: 'event_name',
                type: 'text',
                labelText: 'Event Name',
                labelColor: 'text-success',
                validation: (value) => !!value,
            },
            {
                name: 'max_people',
                type: 'number',
                labelText: 'Max People',
                labelColor: 'text-success',
                validation: (value) => value >= 0,
            },
            {
                name: 'club_member_rules',
                type: 'group',
                labelText: 'Club Member Rules',
                fields: [
                    {
                        name: 'club_night_time',
                        type: 'checkbox',
                        sybType: 'oneCheckbox',
                        labelText: 'Night Time',
                        labelColor: 'text-success',
                        options: [{value: 'true', label: 'True'}],
                    },
                    {
                        name: 'club_reservation_more_24_hours',
                        type: 'checkbox',
                        sybType: 'oneCheckbox',
                        labelText: 'Reservation More Than 24 Hours',
                        labelColor: 'text-success',
                        options: [{value: 'true', label: 'True'}],
                    },
                    {
                        name: 'club_in_advance_hours',
                        type: 'number',
                        labelText: 'In Advance Hours',
                        labelColor: 'text-success',
                    },
                    {
                        name: 'club_in_advance_minutes',
                        type: 'number',
                        labelText: 'In Advance Minutes',
                        labelColor: 'text-success',
                    },
                    {
                        name: 'club_in_advance_day',
                        type: 'number',
                        labelText: 'In Advance Day',
                        labelColor: 'text-success',
                    },
                ],
            },
            {
                name: 'active_member_rules',
                type: 'group',
                labelText: 'Active Member Rules',
                fields: [
                    {
                        name: 'active_night_time',
                        type: 'checkbox',
                        sybType: 'oneCheckbox',
                        labelText: 'Night Time',
                        labelColor: 'text-success',
                        options: [{value: 'true', label: 'True'}],
                    },
                    {
                        name: 'active_reservation_more_24_hours',
                        type: 'checkbox',
                        sybType: 'oneCheckbox',
                        labelText: 'Reservation More Than 24 Hours',
                        labelColor: 'text-success',
                        options: [{value: 'true', label: 'True'}],
                    },
                    {
                        name: 'active_in_advance_hours',
                        type: 'number',
                        labelText: 'In Advance Hours',
                        labelColor: 'text-success',
                    },
                    {
                        name: 'active_in_advance_minutes',
                        type: 'number',
                        labelText: 'In Advance Minutes',
                        labelColor: 'text-success',
                    },
                    {
                        name: 'active_in_advance_day',
                        type: 'number',
                        labelText: 'In Advance Day',
                        labelColor: 'text-success',
                    },
                ],
            },
            {
                name: 'manager_rules',
                type: 'group',
                labelText: 'Manager Rules',
                fields: [
                    {
                        name: 'manager_night_time',
                        type: 'checkbox',
                        sybType: 'oneCheckbox',
                        labelText: 'Night Time',
                        labelColor: 'text-success',
                        options: [{value: 'true', label: 'True'}],
                    },
                    {
                        name: 'manager_reservation_more_24_hours',
                        type: 'checkbox',
                        sybType: 'oneCheckbox',
                        labelText: 'Reservation More Than 24 Hours',
                        labelColor: 'text-success',
                        options: [{value: 'true', label: 'True'}],
                    },
                    {
                        name: 'manager_in_advance_hours',
                        type: 'number',
                        labelText: 'In Advance Hours',
                        labelColor: 'text-success',
                    },
                    {
                        name: 'manager_in_advance_minutes',
                        type: 'number',
                        labelText: 'In Advance Minutes',
                        labelColor: 'text-success',
                    },
                    {
                        name: 'manager_in_advance_day',
                        type: 'number',
                        labelText: 'In Advance Day',
                        labelColor: 'text-success',
                    },
                ],
            },
        ]);
    }, [collisionWithCalendarOptions, additionalServices, errFetchingAdditionalServices, errFetchingTypeOfReservations]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestData = {
            more_than_max_people_with_permission: !!(formData.more_than_max_people_with_permission && formData.more_than_max_people_with_permission.length > 0),
            color: formData.color,

            reservation_service_id: serviceId,
            id: formData.calendar_id,
            service_alias: formData.service_alias,
            collision_with_calendar: formData.collision_with_calendar || [],
            mini_services: formData.mini_services || [],
            collision_with_itself: !!(formData.collision_with_itself && formData.collision_with_itself.length > 0),
            reservation_type: formData.reservation_type,
            event_name: formData.event_name,
            max_people: Number(formData.max_people) || 0,

            club_member_rules: {
                night_time: !!(formData.club_night_time && formData.club_night_time.length > 0),
                reservation_more_24_hours: !!(formData.club_reservation_more_24_hours && formData.club_reservation_more_24_hours.length > 0),
                in_advance_hours: Number(formData.club_in_advance_hours) || 0,
                in_advance_minutes: Number(formData.club_in_advance_minutes) || 0,
                in_advance_day: Number(formData.club_in_advance_day) || 0
            },
            active_member_rules: {
                night_time: !!(formData.active_night_time && formData.active_night_time.length > 0),
                reservation_more_24_hours: !!(formData.active_reservation_more_24_hours && formData.active_reservation_more_24_hours.length > 0),
                in_advance_hours: Number(formData.active_in_advance_hours) || 0,
                in_advance_minutes: Number(formData.active_in_advance_minutes) || 0,
                in_advance_day: Number(formData.active_in_advance_day) || 0
            },
            manager_rules: {
                night_time: !!(formData.manager_night_time && formData.manager_night_time.length > 0),
                reservation_more_24_hours: !!(formData.manager_reservation_more_24_hours && formData.manager_reservation_more_24_hours.length > 0),
                in_advance_hours: Number(formData.manager_in_advance_hours) || 0,
                in_advance_minutes: Number(formData.manager_in_advance_minutes) || 0,
                in_advance_day: Number(formData.manager_in_advance_day) || 0
            }
        };

        axios.post(`${constants.serverURL}/calendars/create_calendar`, requestData)
            .then(() => {
                setSuccessMessage('Calendar created successfully!');
                setErrorMessage('');
            })
            .catch((error) => {
                console.error('Error making reservation:', error);
                setSuccessMessage('');
                setErrorMessage('Error creating calendar.');
            });
    };

    const renderField = useCallback((field) => {
        const commonProps = {
            name: field.name,
            value: formData[field.name] || '',
            onChange: (e) => handleChange(e, field),
            className: "w-full p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        };

        if (field.name === 'calendar_id') {
            return (
                <div>
                    <div className="flex space-x-2 mb-2">
                        <button
                            type="button"
                            onClick={() => setCalendarIdInputType('manual')}
                            className={`py-2 px-4 text-sm font-medium rounded-md ${
                                calendarIdInputType === 'manual'
                                    ? 'bg-green-600 text-white'
                                    : 'bg-green-100 text-green-700'
                            }`}
                        >
                            Manual Input
                        </button>
                        <button
                            type="button"
                            onClick={fetchGoogleCalendars}
                            disabled={isLoadingCalendars}
                            className={`py-2 px-4 text-sm font-medium rounded-md ${
                                calendarIdInputType === 'select'
                                    ? 'bg-green-600 text-white'
                                    : 'bg-green-100 text-green-700'
                            } disabled:bg-green-300`}
                        >
                            {isLoadingCalendars ? 'Loading...' : 'Fetch Google Calendars'}
                        </button>
                    </div>
                    {calendarIdInputType === 'manual' ? (
                        <input
                            type="text"
                            {...commonProps}
                            value={manualCalendarId}
                            onChange={(e) => {
                                setManualCalendarId(e.target.value);
                                handleChange(e, field);
                            }}
                        />
                    ) : (
                        <select {...commonProps}>
                            <option value="">Select a calendar</option>
                            {googleCalendars.map((calendar) => (
                                <option key={calendar.id} value={calendar.id}>
                                    {calendar.summary}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
            );
        }

        switch (field.type) {
            case 'select':
                return (
                    <select {...commonProps}>
                        <option value="">Select an option</option>
                        {field.options.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                );
            case 'checkbox':
                return (
                    <div className="space-y-2">
                        {field.options.map((option) => (
                            <div key={option.value} className="flex items-center">
                                <input
                                    type="checkbox"
                                    {...commonProps}
                                    value={option.value}
                                    id={`${field.name}-${option.value}`}
                                    checked={(formData[field.name] || []).includes(option.value)}
                                    className="mr-2 focus:ring-green-500 h-4 w-4 text-green-600 border-green-300 rounded"
                                />
                                <label htmlFor={`${field.name}-${option.value}`} className="text-sm text-green-700">
                                    {option.label}
                                </label>
                            </div>
                        ))}
                    </div>
                );
            case 'group':
                return (
                    <div className="space-y-3 bg-green-50 p-3 rounded-md">
                        <h6 className="font-medium text-green-800">{field.labelText}</h6>
                        {field.fields.map(subField => (
                            <div key={subField.name}>
                                <label className="block text-sm font-medium text-green-700 mb-1">
                                    {subField.labelText}
                                </label>
                                {renderField(subField)}
                            </div>
                        ))}
                    </div>
                );
            case 'color':
                return (
                    <input
                        type="color"
                        {...commonProps}
                        className="h-10 w-full"
                    />
                );
            case 'empty':
                return null;
            default:
                return (
                    <input
                        type={field.type}
                        {...commonProps}
                    />
                );
        }
    }, [formData, handleChange, googleCalendars, isLoadingCalendars, fetchGoogleCalendars, calendarIdInputType, manualCalendarId]);

    return (
        <UniversalLayout centerContent>
            <div className="max-w-2xl w-full bg-gradient-to-r from-green-50 to-green-100 shadow-md p-6 rounded-lg">
                <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
                    Create New Calendar
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {formFields.map((field) => (
                        <div key={field.name}>
                            <label htmlFor={field.name} className="block text-sm font-medium text-green-700 mb-1">
                                {field.labelText}
                            </label>
                            {renderField(field)}
                            {errors[field.name] && (
                                <p className="text-red-600 text-sm mt-1">{errors[field.name]}</p>
                            )}
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Create Calendar
                    </button>
                </form>

                {successMessage && <div className="mt-3 p-2 bg-green-100 text-green-700 rounded">{successMessage}</div>}
                {errorMessage && <div className="mt-3 p-2 bg-red-100 text-red-700 rounded">{errorMessage}</div>}
            </div>
        </UniversalLayout>
    );
};
export default CreateNewCalendar;
