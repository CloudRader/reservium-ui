import React, {useEffect, useState} from 'react';
import UniversalLayout from "../UniversalLayout";
import axios from "axios";
import constants from "../Constants";

axios.defaults.withCredentials = true;
async function fetchCalendarData(calendar_id) {
    try {
        const response = await axios.get(`${constants.serverURL}/calendars/${calendar_id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch calendar data:', error);
        throw error; // Re-throw to handle it in the component if needed
    }
}
const EditCalendar = ({ serviceName, calendarBaseData }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState(null); // Changed from `calendar`
    const [calendar, setCalendar] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchCalendarData(calendarBaseData.googleCalendarId);
                setCalendar(data);
                setEditedData(data); // Set editedData after fetching calendar data
            } catch (err) {
                setError(err.message); // Handle error
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchData();
    }, [calendarBaseData.googleCalendarId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        console.log("Saving calendar:", editedData);
        setIsEditing(false);
        // In a real scenario, you would make an API call here to update the data
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedData(calendar); // Reset to original data
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleRulesChange = (ruleType, field, value) => {
        setEditedData(prevData => ({
            ...prevData,
            [ruleType]: {
                ...prevData[ruleType],
                [field]: value
            }
        }));
    };


    return (
        <UniversalLayout centerContent whiteBackGreenContentBackground>
            <h1 className="text-2xl font-bold text-green-800 mb-6">
                {isEditing ? 'Edit' : 'View'} Calendar: {serviceName}
            </h1>
            <div className="bg-white p-4 rounded-lg shadow">
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
                    <input
                        type="text"
                        name="color"
                        value={editedData.color}
                        onChange={handleChange}
                        readOnly={!isEditing}
                        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${
                            isEditing ? 'bg-white' : 'bg-gray-100'
                        }`}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Reservation Type</label>
                    <input
                        type="text"
                        name="reservation_type"
                        value={editedData.reservation_type}
                        onChange={handleChange}
                        readOnly={!isEditing}
                        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${
                            isEditing ? 'bg-white' : 'bg-gray-100'
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
                        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${
                            isEditing ? 'bg-white' : 'bg-gray-100'
                        }`}
                    />
                </div>

                {['club_member_rules', 'active_member_rules', 'manager_rules'].map((ruleType) => (
                    <div key={ruleType} className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">{ruleType.replace(/_/g, ' ').charAt(0).toUpperCase() + ruleType.replace(/_/g, ' ').slice(1)}</h3>
                        {Object.entries(editedData[ruleType]).map(([key, value]) => (
                            <div key={key} className="mb-2">
                                <label className="block text-sm font-medium text-gray-700">{key.replace(/_/g, ' ')}</label>
                                {typeof value === 'boolean' ? (
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
                                        onChange={(e) => handleRulesChange(ruleType, key, parseInt(e.target.value))}
                                        readOnly={!isEditing}
                                        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${
                                            isEditing ? 'bg-white' : 'bg-gray-100'
                                        }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
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