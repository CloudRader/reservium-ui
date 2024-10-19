import React, {useState, useCallback} from 'react';
import axios from 'axios';
import constants from '../Constants';
import UniversalLayout from "../UniversalLayout";
import useCreateFormLogic from '../hooks/useCreateFormLogic';
import SuccessErrorMessage from "./SuccessErrorMessage";

const CreateNewCalendar = ({serviceId, serviceCalendars}) => {
    const [googleCalendars, setGoogleCalendars] = useState([]);
    const [isLoadingCalendars, setIsLoadingCalendars] = useState(false);
    const [calendarIdInputType, setCalendarIdInputType] = useState('manual');

    const initialFields = [
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
            type: 'multiCheckbox',
            labelText: 'Collision With Calendars',
            labelColor: 'text-success',
            options: serviceCalendars.map(calendar => ({
                value: calendar.googleCalendarId,
                label: calendar.className
            })),
            validation: (value) => Array.isArray(value) && value.length > 0,
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
        {
            name: 'mini_services',
            type: 'text',
            labelText: 'Mini Services',
            labelColor: 'text-success',
            validation: (value) => !!value,
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
        // setFormFields,
        handleChange,
        handleSubmit,
        renderField,
        setMessage
    } = useCreateFormLogic(initialFields, `${constants.serverURL}/calendars/create_calendar`);

    const makeSubmit = (e) => {
        e.preventDefault();

        const requestData = {
            id: calendarIdInputType === 'manual' ? '' : formData.calendar_id,
            collision_with_calendar: formData.collision_with_calendar || [],
            more_than_max_people_with_permission: !!formData.more_than_max_people_with_permission,
            mini_services: formData.mini_services.split(",") || [],
            color: formData.color,
            reservation_service_id: serviceId,
            reservation_type: calendarIdInputType === 'manual'
                ? formData.reservation_type
                : googleCalendars.find(cal => cal.id === formData.calendar_id)?.submission || '',
            max_people: Number(formData.max_people) || 0,
            collision_with_itself: !!formData.collision_with_itself,

            club_member_rules: {
                night_time: !!formData.club_member_rules.night_time,
                reservation_without_permission: !!formData.club_member_rules.reservation_without_permission,
                max_reservation_hours: !!formData.club_member_rules.max_reservation_hours,
                in_advance_hours: Number(formData.club_member_rules.in_advance_hours) || 0,
                in_advance_minutes: Number(formData.club_member_rules.in_advance_minutes) || 0,
                in_prior_days: Number(formData.club_member_rules.in_prior_days) || 0
            },
            active_member_rules: {
                night_time: !!formData.active_member_rules.night_time,
                reservation_without_permission: !!formData.active_member_rules.reservation_without_permission,
                max_reservation_hours: !!formData.active_member_rules.max_reservation_hours,
                in_advance_hours: Number(formData.active_member_rules.in_advance_hours) || 0,
                in_advance_minutes: Number(formData.active_member_rules.in_advance_minutes) || 0,
                in_prior_days: Number(formData.active_member_rules.in_prior_days) || 0
            },
            manager_rules: {
                night_time: !!formData.manager_rules.night_time,
                reservation_without_permission: !!formData.manager_rules.reservation_without_permission,
                max_reservation_hours: !!formData.manager_rules.max_reservation_hours,
                in_advance_hours: Number(formData.manager_rules.in_advance_hours) || 0,
                in_advance_minutes: Number(formData.manager_rules.in_advance_minutes) || 0,
                in_prior_days: Number(formData.manager_rules.in_prior_days) || 0
            }
        };
        handleSubmit(requestData);
    };


    const fetchGoogleCalendars = useCallback(async () => {
        setIsLoadingCalendars(true);
        try {
            const response = await axios.get(`${constants.serverURL}/calendars/google_calendars/`);
            // const newOptions = response.data
            //     .filter(calendar => calendar.id === serviceId)
            //     .map(calendar => ({value: calendar.calendar_id, label: calendar.reservation_type}));

            setGoogleCalendars(response.data);
            setCalendarIdInputType('select');
        } catch (error) {
            console.error('Error fetching Google Calendars:', error);
            setMessage({type: 'error', text: 'Failed to fetch Google Calendars'});
        } finally {
            setIsLoadingCalendars(false);
        }
    }, [serviceId, setMessage]);

    const renderCalendarIdField = useCallback(() => {
        const commonProps = {
            name: 'calendar_id',
            value: formData.calendar_id || '',
            onChange: handleChange,
            className: "w-full p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        };
        return (
            <>
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
                {calendarIdInputType === 'manual'
                    ? null
                    : (<select {...commonProps}>
                            <option value="">Select a calendar</option>
                            {googleCalendars.map((calendar) => (
                                <option key={calendar.id} value={calendar.id}>
                                    {calendar.summary}
                                </option>
                            ))}
                        </select>
                    )}
            </>
        );
    }, [calendarIdInputType, formData.calendar_id, handleChange, isLoadingCalendars, fetchGoogleCalendars, googleCalendars]);

    const renderGroupField = (field) => (
        <div key={field.name} className="space-y-4">
            <h3 className="text-lg font-medium text-green-800">{field.labelText}</h3>
            {field.fields.map(subField => (
                <div key={`${field.name}.${subField.name}`}>
                    <label htmlFor={`${field.name}.${subField.name}`}
                           className="block text-sm font-medium text-green-700 mb-1">
                        {subField.labelText}
                    </label>
                    {renderField({...subField, name: `${field.name}.${subField.name}`})}
                </div>
            ))}
        </div>
    );


    return (
        <UniversalLayout centerContent whiteBackGreenContentBackground>
            <div className="max-w-2xl w-full bg-gradient-to-r from-green-50 to-green-100 shadow-md p-6 rounded-lg">
                <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
                    Create New Calendar
                </h1>

                <form onSubmit={makeSubmit} className="space-y-5">
                    {formFields.map((field) => (
                        field.type === 'group' ? renderGroupField(field) : (
                            <div key={field.name}>
                                <label htmlFor={field.name} className="block text-sm font-medium text-green-700 mb-1">
                                    {field.labelText}
                                </label>
                                {field.name === 'calendar_id' ? renderCalendarIdField() : renderField(field)}
                            </div>
                        )
                    ))}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Create Calendar
                    </button>
                </form>

                {message && <SuccessErrorMessage message={message}/>}
            </div>
        </UniversalLayout>
    );
};

export default CreateNewCalendar;