import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import constants from '../Constants';
import UniversalLayout from "../UniversalLayout";
import useCreateFormLogic from '../hooks/useCreateFormLogic';
import SuccessErrorMessage from "./SuccessErrorMessage";

const CreateNewCalendar = ({serviceId, serviceCalendars }) => {
    const [googleCalendars, setGoogleCalendars] = useState([]);
    const [isLoadingCalendars, setIsLoadingCalendars] = useState(false);
    const [calendarIdInputType, setCalendarIdInputType] = useState('manual');
    const [manualCalendarId, setManualCalendarId] = useState('');
    const [collisionWithCalendarOptions, setCollisionWithCalendarOptions] = useState([]);
    const [errFetchingTypeOfReservations, setErrFetchingTypeOfReservations] = useState(true);


    const initialFields = [
        // todo если выбираем гугл то само выполниться
        // отправляем пустой в др случае
        {
            name: 'calendar_id',
            // type: 'text',
            labelText: 'Select Calendar Source',
            labelColor: 'text-success',
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
        {
            name: 'collision_with_calendar',
            type: 'checkbox',
            labelText: 'Collision With Calendars',
            labelColor: 'text-success',
            options: serviceCalendars.map(calendar => ({ value: calendar.id, label: calendar.className })),
            validation: (value) => value,
        },
        {
            name: 'collision_with_itself',
            type: 'checkbox',
            sybType: 'oneCheckbox',
            labelText: 'Collision With Itself',
            labelColor: 'text-success',
            options: [{value: 'true', label: 'True'}],
            validation: (value) => value,
        },
        // todo если выбираем гугл то само выполниться
        // человек заполняет сам  в др случае
        {
            name: 'reservation_type',
            type: 'text',
            labelText: 'Calendar Name',
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
                // todo reservation_without_permission
                {
                    name: 'reservation_without_permission',
                    type: 'checkbox',
                    sybType: 'oneCheckbox',
                    labelText: 'Reservation More Than 24 Hours',
                    labelColor: 'text-success',
                    options: [{value: 'true', label: 'True'}],
                },
                {
                    name: 'max_reservation_hours',
                    type: 'number',
                    labelText: 'Max Reservation Hours',
                    labelColor: 'text-success',
                },
                {
                    name: 'in_advance_hours',
                    type: 'number',
                    labelText: 'In Advance Hours',
                    labelColor: 'text-success',
                },
                {
                    name: 'in_advance_minutes',
                    type: 'number',
                    labelText: 'In Advance Minutes',
                    labelColor: 'text-success',
                },
                {
                    name: 'in_prior_days',
                    type: 'number',
                    labelText: 'In Prior Day',
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
                    name: 'club_night_time',
                    type: 'checkbox',
                    sybType: 'oneCheckbox',
                    labelText: 'Night Time',
                    labelColor: 'text-success',
                    options: [{value: 'true', label: 'True'}],
                },
                // todo reservation_without_permission
                {
                    name: 'reservation_without_permission',
                    type: 'checkbox',
                    sybType: 'oneCheckbox',
                    labelText: 'Reservation More Than 24 Hours',
                    labelColor: 'text-success',
                    options: [{value: 'true', label: 'True'}],
                },
                {
                    name: 'max_reservation_hours',
                    type: 'number',
                    labelText: 'Max Reservation Hours',
                    labelColor: 'text-success',
                },
                {
                    name: 'in_advance_hours',
                    type: 'number',
                    labelText: 'In Advance Hours',
                    labelColor: 'text-success',
                },
                {
                    name: 'in_advance_minutes',
                    type: 'number',
                    labelText: 'In Advance Minutes',
                    labelColor: 'text-success',
                },
                {
                    name: 'in_prior_days',
                    type: 'number',
                    labelText: 'In Prior Day',
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
                    name: 'club_night_time',
                    type: 'checkbox',
                    sybType: 'oneCheckbox',
                    labelText: 'Night Time',
                    labelColor: 'text-success',
                    options: [{value: 'true', label: 'True'}],
                },
                // todo reservation_without_permission
                {
                    name: 'reservation_without_permission',
                    type: 'checkbox',
                    sybType: 'oneCheckbox',
                    labelText: 'Reservation More Than 24 Hours',
                    labelColor: 'text-success',
                    options: [{value: 'true', label: 'True'}],
                },
                {
                    name: 'max_reservation_hours',
                    type: 'number',
                    labelText: 'Max Reservation Hours',
                    labelColor: 'text-success',
                },
                {
                    name: 'in_advance_hours',
                    type: 'number',
                    labelText: 'In Advance Hours',
                    labelColor: 'text-success',
                },
                {
                    name: 'in_advance_minutes',
                    type: 'number',
                    labelText: 'In Advance Minutes',
                    labelColor: 'text-success',
                },
                {
                    name: 'in_prior_days',
                    type: 'number',
                    labelText: 'In Prior Day',
                    labelColor: 'text-success',
                },
            ],
        },
    ]

    const {
        formFields,
        formData,
        message,
        setFormFields,
        handleChange,
        handleSubmit,
        renderField,
        setMessage
    } = useCreateFormLogic(initialFields, `${constants.serverURL}/calendars/create_calendar`);

    const fetchGoogleCalendars = useCallback(async () => {
        setIsLoadingCalendars(true);
        try {
            const response = await axios.get(`${constants.serverURL}/calendars/google_calendars/`);
            const newOptions = response.data
                .filter(calendar => calendar.id === serviceId)
                .map(calendar => ({value: calendar.calendar_id, label: calendar.reservation_type}));

            setCollisionWithCalendarOptions(newOptions);
            setErrFetchingTypeOfReservations(false);
            setGoogleCalendars(response.data);
            setCalendarIdInputType('select');
        } catch (error) {
            console.error('Error fetching Google Calendars:', error);
            setMessage({type: 'error', text: 'Failed to fetch Google Calendars'});
        } finally {
            setIsLoadingCalendars(false);
        }
    }, [serviceId, setMessage]);

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
    }, [calendarIdInputType, googleCalendars, setFormFields]);

    const makeSubmit = (e) => {
        e.preventDefault();

        const requestData = {
            more_than_max_people_with_permission: !!formData.more_than_max_people_with_permission,
            color: formData.color,
            reservation_service_id: serviceId,
            collision_with_calendar: formData.collision_with_calendar || [],
            id: calendarIdInputType === 'manual' ? '' : formData.calendar_id,
            reservation_type: calendarIdInputType === 'manual'
                ? formData.reservation_type
                : googleCalendars.find(cal => cal.id === formData.calendar_id)?.reservation_type || '',
            mini_services: formData.mini_services || [],
            collision_with_itself: !!formData.collision_with_itself,

            max_people: Number(formData.max_people) || 0,
            club_member_rules: {
                night_time: !!formData.club_night_time,
                reservation_more_24_hours: !!formData.club_reservation_more_24_hours,
                in_advance_hours: Number(formData.club_in_advance_hours) || 0,
                in_advance_minutes: Number(formData.club_in_advance_minutes) || 0,
                in_advance_day: Number(formData.club_in_advance_day) || 0
            },
            active_member_rules: {
                night_time: !!formData.active_night_time,
                reservation_more_24_hours: !!formData.active_reservation_more_24_hours,
                in_advance_hours: Number(formData.active_in_advance_hours) || 0,
                in_advance_minutes: Number(formData.active_in_advance_minutes) || 0,
                in_advance_day: Number(formData.active_in_advance_day) || 0
            },
            manager_rules: {
                night_time: !!formData.manager_night_time,
                reservation_more_24_hours: !!formData.manager_reservation_more_24_hours,
                in_advance_hours: Number(formData.manager_in_advance_hours) || 0,
                in_advance_minutes: Number(formData.manager_in_advance_minutes) || 0,
                in_advance_day: Number(formData.manager_in_advance_day) || 0
            }
        };

        handleSubmit(requestData);
    };

    const renderCalendarIdField = useCallback(() => {
        const commonProps = {
            name: 'calendar_id',
            value: formData.calendar_id || '',
            onChange: handleChange,
            className: "w-full p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        };

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
                    <></>
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
    }, [calendarIdInputType, formData.calendar_id, handleChange, isLoadingCalendars, fetchGoogleCalendars, googleCalendars, manualCalendarId]);

    return (
        <UniversalLayout centerContent whiteBackGreenContentBackground>
            <div className="max-w-2xl w-full bg-gradient-to-r from-green-50 to-green-100 shadow-md p-6 rounded-lg">
                <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
                    Create New Calendar
                </h1>
                <form onSubmit={makeSubmit} className="space-y-5">
                    {formFields.map((field) => (
                        <div key={field.name}>
                            <label htmlFor={field.name} className="block text-sm font-medium text-green-700 mb-1">
                                {field.labelText}
                            </label>
                            {field.name === 'calendar_id' ? renderCalendarIdField() :
                                field.name === 'color' ? (
                                    <input
                                        type="color"
                                        name={field.name}
                                        value={formData[field.name] || ''}
                                        onChange={handleChange}
                                        className="w-full h-12 p-1 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                ) : renderField(field)}
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Create Calendar
                    </button>
                </form>

                {message && <SuccessErrorMessage message={message} />}
            </div>
        </UniversalLayout>
    );
};

export default CreateNewCalendar;