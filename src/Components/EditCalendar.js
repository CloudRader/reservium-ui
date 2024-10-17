import React from 'react';
import UniversalLayout from "../UniversalLayout";

const mockCalendar = {
    id: calendarId,
    reservation_type: "Type A",
    max_people: 10,
    color: "#00FF00",
    collision_with_itself: true,
    club_member_rules: {
        night_time: true,
        reservation_without_permission: true,
        max_reservation_hours: 2,
        in_advance_hours: 24,
        in_advance_minutes: 0,
        in_prior_days: 7
    },
    active_member_rules: {
        night_time: false,
        reservation_without_permission: false,
        max_reservation_hours: 1,
        in_advance_hours: 12,
        in_advance_minutes: 0,
        in_prior_days: 3
    },
    manager_rules: {
        night_time: true,
        reservation_without_permission: true,
        max_reservation_hours: 4,
        in_advance_hours: 48,
        in_advance_minutes: 0,
        in_prior_days: 14
    },
};
const EditCalendar = (serviceName, calendar) => {
    const handleEdit = () => {
        // Implement edit functionality
        console.log("Edit calendar:", calendar);
    };

    if (!calendar) {
        return <div>Loading...</div>;
    }

    return (
        <UniversalLayout centerContent whiteBackGreenContentBackground>
            <h1 className="text-2xl font-bold text-green-800 mb-6">Edit Calendar: {calendar.reservation_type}</h1>
            <div className="bg-white p-4 rounded-lg shadow">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h2 className="text-lg font-semibold text-green-700">Basic Information</h2>
                        <p><strong>Reservation Type:</strong> {calendar.reservation_type}</p>
                        <p><strong>Max People:</strong> {calendar.max_people}</p>
                        <p><strong>Color:</strong> <span style={{color: calendar.color}}>{calendar.color}</span></p>
                        <p><strong>Collision with itself:</strong> {calendar.collision_with_itself ? 'Yes' : 'No'}</p>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-green-700">Club Member Rules</h2>
                        <p><strong>Night time:</strong> {calendar.club_member_rules.night_time ? 'Yes' : 'No'}</p>
                        <p><strong>Reservation without
                            permission:</strong> {calendar.club_member_rules.reservation_without_permission ? 'Yes' : 'No'}
                        </p>
                        <p><strong>Max reservation hours:</strong> {calendar.club_member_rules.max_reservation_hours}
                        </p>
                        <p><strong>In advance hours:</strong> {calendar.club_member_rules.in_advance_hours}</p>
                        <p><strong>In prior days:</strong> {calendar.club_member_rules.in_prior_days}</p>
                    </div>
                </div>
                <div className="mt-4">
                    <h2 className="text-lg font-semibold text-green-700">Active Member Rules</h2>
                    {/* Display active member rules similar to club member rules */}
                </div>
                <div className="mt-4">
                    <h2 className="text-lg font-semibold text-green-700">Manager Rules</h2>
                    {/* Display manager rules similar to club member rules */}
                </div>
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleEdit}
                        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Edit Calendar
                    </button>
                </div>
            </div>
        </UniversalLayout>
    );
};

export default EditCalendar;