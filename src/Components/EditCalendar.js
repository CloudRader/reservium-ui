import React, { useState, useEffect, useCallback } from 'react';
import UniversalLayout from "../UniversalLayout";
import constants from "../Constants";
import useEditableForm from "../hooks/useEditableForm";
import SuccessErrorMessage from "./SuccessErrorMessage";
import axios from 'axios';
axios.defaults.withCredentials = true;

const EditCalendar = ({ serviceName, calendarBaseData, serviceId, isEditMode = false, serviceCalendars = [] }) => {
    const calendarFetchUrl = `${constants.serverURL}/calendars/${calendarBaseData.googleCalendarId}`;
    const calendarUpdateUrl = `${constants.serverURL}/calendars/${calendarBaseData.googleCalendarId}`;
    const initialData = {
        ...calendarBaseData,
        club_member_rules: {},
        active_member_rules: {},
        manager_rules: {},
        collision_with_calendar: serviceCalendars.collision_with_calendar || []
    };

    const [miniServices, setMiniServices] = useState([]);
    const [isLoadingMiniServices, setIsLoadingMiniServices] = useState(false);

    const fetchMiniServices = useCallback(async () => {
        setIsLoadingMiniServices(true);
        try {
            const response = await axios.get(`${constants.serverURL}/mini_services/reservation_service/${serviceId}`);
            setMiniServices(response.data);
        } catch (error) {
            console.error('Error fetching mini services:', error);
        } finally {
            setIsLoadingMiniServices(false);
        }
    }, [serviceId]);

    useEffect(() => {
        fetchMiniServices();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [serviceId]);

    const {
        loading,
        isEditing,
        editedData,
        message,
        handleEdit,
        handleSave,
        handleCancel,
        handleChange,
        handleRulesChange,
    } = useEditableForm(initialData, calendarUpdateUrl, calendarFetchUrl, isEditMode);

    if (loading || isLoadingMiniServices) return <p>Loading...</p>;

    if (!editedData) return <p>No data available</p>;

    // Ensure mini_services is always an array
    if (!editedData.mini_services) {
        editedData.mini_services = [];
    }

    return (
        <UniversalLayout centerContent whiteBackGreenContentBackground headerTittle={`${isEditing ? 'Edit' : 'View'} Calendar: ${serviceName}`} >
            <div className="bg-white p-4 rounded-lg shadow">
                {message && <SuccessErrorMessage message={message} />}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">ID</label>
                    <input
                        type="text"
                        name="id"
                        value={editedData.id}
                        readOnly
                        className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Color</label>
                    <div className="flex items-center space-x-2">
                        <input
                            type="color"
                            name="color"
                            value={editedData.color || '#000000'}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-12 h-12 p-1 rounded-md cursor-pointer"
                        />
                        <input
                            type="text"
                            name="color"
                            value={editedData.color || ''}
                            onChange={handleChange}
                            readOnly={!isEditing}
                            className={`flex-grow mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${isEditing ? 'bg-white' : 'bg-gray-100'
                                }`}
                            placeholder="#000000"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Reservation Type</label>
                    <input
                        type="text"
                        name="reservation_type"
                        value={editedData.reservation_type}
                        onChange={handleChange}
                        readOnly={!isEditing}
                        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${isEditing ? 'bg-white' : 'bg-gray-100'
                            }`}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Max People</label>
                    <input
                        type="number"
                        name="max_people"
                        value={editedData.max_people}
                        onChange={handleChange}
                        readOnly={!isEditing}
                        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Collision With Calendars</label>
                    <div className="mt-1">
                        {serviceCalendars?.map(calendar => (
                            <div key={calendar.googleCalendarId} className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    id={`collision-calendar-${calendar.googleCalendarId}`}
                                    checked={editedData.collision_with_calendar?.includes(calendar.googleCalendarId) || false}
                                    onChange={(e) => {
                                        const updatedCollisions = e.target.checked
                                            ? [...(editedData.collision_with_calendar || []), calendar.googleCalendarId]
                                            : (editedData.collision_with_calendar || []).filter(id => id !== calendar.googleCalendarId);
                                        handleChange({
                                            target: {
                                                name: 'collision_with_calendar',
                                                value: updatedCollisions
                                            }
                                        });
                                    }}
                                    disabled={!isEditing}
                                    className="mr-2"
                                />
                                <label htmlFor={`collision-calendar-${calendar.googleCalendarId}`}>
                                    {calendar.className}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Mini Services</label>
                    <div className="mt-1">
                        {miniServices.length > 0 ? (
                            miniServices.map(service => (
                                <div key={service.id} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        id={`mini-service-${service.id}`}
                                        checked={editedData.mini_services?.includes(service.name) || false}
                                        onChange={(e) => {
                                            const updatedServices = e.target.checked
                                                ? [...(editedData.mini_services || []), service.name]
                                                : (editedData.mini_services || []).filter(name => name !== service.name);
                                            handleChange({
                                                target: {
                                                    name: 'mini_services',
                                                    value: updatedServices
                                                }
                                            });
                                        }}
                                        disabled={!isEditing}
                                        className="mr-2"
                                    />
                                    <label htmlFor={`mini-service-${service.id}`}>{service.name}</label>
                                </div>
                            ))
                        ) : (
                            <p>No mini services available</p>
                        )}
                    </div>
                </div>
                {['club_member_rules', 'active_member_rules', 'manager_rules'].map((ruleType) => (
                    editedData[ruleType] && (
                        <div key={ruleType} className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">{ruleType.replace(/_/g, ' ').charAt(0).toUpperCase() + ruleType.replace(/_/g, ' ').slice(1)}</h3>
                            {Object.entries(editedData[ruleType]).map(([key, value]) => (
                                <div key={key} className="mb-2">
                                    <label className="block text-sm font-medium text-gray-700">{key.replace(/_/g, ' ')}</label>
                                    {key === 'night_time' ? (
                                        <input
                                            type="checkbox"
                                            checked={value === true}
                                            onChange={(e) => handleRulesChange(ruleType, key, e.target.checked)}
                                            disabled={!isEditing}
                                            className="mt-1"
                                        />
                                    ) : key === 'max_reservation_hours' ? (
                                        <input
                                            type="number"
                                            value={value}
                                            onChange={(e) => handleRulesChange(ruleType, key, parseInt(e.target.value) || 0)}
                                            readOnly={!isEditing}
                                            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${isEditing ? 'bg-white' : 'bg-gray-100'
                                                }`}
                                        />
                                    ) : typeof value === 'boolean' ? (
                                        <input
                                            type="checkbox"
                                            checked={value}
                                            onChange={(e) => handleRulesChange(ruleType, key, e.target.checked)}
                                            disabled={!isEditing}
                                            className="mt-1"
                                        />
                                    ) : (
                                        <input
                                            type="number"
                                            value={value}
                                            onChange={(e) => handleRulesChange(ruleType, key, parseInt(e.target.value) || 0)}
                                            readOnly={!isEditing}
                                            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${isEditing ? 'bg-white' : 'bg-gray-100'
                                                }`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    )
                ))}

                <div className="mt-6 flex justify-end space-x-3">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleSave}
                                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Save
                            </button>
                            <button
                                onClick={handleCancel}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={handleEdit}
                            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Edit Calendar
                        </button>
                    )}
                </div>
            </div>
        </UniversalLayout>
    );
};

export default EditCalendar;