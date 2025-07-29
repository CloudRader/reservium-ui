import React from 'react';

const CalendarIdInput = ({
                             calendarIdInputType,
                             setCalendarIdInputType,
                             isLoadingCalendars,
                             fetchGoogleCalendars,
                             googleCalendars,
                             formData,
                             handleChange
                         }) => {
    const renderManualInput = () => (
        <>
            <label htmlFor="reservation_type" className="block text-sm font-medium text-green-700 mb-1">
                Calendar Name (reservation_type)
            </label>
            <input
                type="text"
                name="reservation_type"
                onChange={handleChange}
                className="w-full p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={formData.reservation_type || ''}
            />
        </>
    );

    const renderGoogleCalendarSelect = () => (
        <select
            name="calendar_id"
            value={formData.calendar_id || ''}
            onChange={handleChange}
            className="w-full p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
            <option value="">Select a calendar</option>
            {googleCalendars.map((calendar) => (
                <option key={calendar.id} value={calendar.id}>
                    {calendar.summary}
                </option>
            ))}
        </select>
    );

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
            {calendarIdInputType === 'manual' ? renderManualInput() : renderGoogleCalendarSelect()}
        </div>
    );
};

export default CalendarIdInput;