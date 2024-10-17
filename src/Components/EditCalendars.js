import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import UniversalLayout from "../UniversalLayout";

const EditCalendars = () => {
    const [calendars, setCalendars] = useState([]);
    const navigate = useNavigate();
    const { serviceId } = useParams();

    useEffect(() => {
        // Fetch calendars data here
        // For now, we'll use mock data
        const mockCalendars = [
            { id: '1', reservation_type: 'Type A', max_people: 10 },
            { id: '2', reservation_type: 'Type B', max_people: 20 },
            { id: '3', reservation_type: 'Type C', max_people: 15 },
        ];
        setCalendars(mockCalendars);
    }, []);

    const handleCalendarClick = (calendarId) => {
        // TODO fix
        // navigate(`/edit-calendar/${serviceId}/${calendarId}`);
        navigate(`/edit-calendar/${calendarId}`);
    };

    return (
        <UniversalLayout centerContent whiteBackGreenContentBackground >
            <h1 className="text-2xl font-bold text-green-800 mb-6">Edit Calendars</h1>
            <table className="w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-green-200 text-green-700">
                <tr>
                    <th className="py-2 px-4 text-left">Reservation Type</th>
                    <th className="py-2 px-4 text-left">Max People</th>
                    <th className="py-2 px-4 text-center">Actions</th>
                </tr>
                </thead>
                <tbody>
                {calendars.map((calendar) => (
                    <tr key={calendar.id} className="border-b border-green-100 hover:bg-green-50">
                        <td
                            className="py-3 px-4 cursor-pointer text-green-700 hover:text-green-900"
                            onClick={() => handleCalendarClick(calendar.id)}
                        >
                            {calendar.reservation_type}
                        </td>
                        <td className="py-3 px-4 text-green-700">
                            {calendar.max_people}
                        </td>
                        <td className="py-3 px-4 text-center">
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded text-sm"
                                onClick={() => handleCalendarClick(calendar.id)}
                            >
                                Edit
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="mt-6">
                <Link
                    // to={`/add-calendar/${serviceId}`}
                    to={`/add-calendar/`}

                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    Add New Calendar
                </Link>
            </div>
        </UniversalLayout>
    );
};

export default EditCalendars;