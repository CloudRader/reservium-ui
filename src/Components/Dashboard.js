import React, { useState } from 'react';
// import { format } from 'date-fns';

// Test data for local development
const TEST_EVENTS = {
    personal: [
        {
            id: 1,
            name: "Team Meeting",
            serviceName: "Conference Room A",
            time: "2024-03-20T10:00:00",
            status: "confirmed"
        },
        {
            id: 2,
            name: "Client Presentation",
            serviceName: "Meeting Room B",
            time: "2024-03-21T14:30:00",
            status: "pending"
        },
        {
            id: 3,
            name: "Project Review",
            serviceName: "Board Room",
            time: "2024-03-22T09:00:00",
            status: "confirmed"
        }
    ],
    managed: [
        {
            id: 4,
            name: "Department Meeting",
            serviceName: "Conference Room A",
            time: "2024-03-20T13:00:00",
            status: "confirmed"
        },
        {
            id: 5,
            name: "Training Session",
            serviceName: "Training Room",
            time: "2024-03-21T11:00:00",
            status: "pending"
        },
        {
            id: 6,
            name: "Team Building",
            serviceName: "Outdoor Space",
            time: "2024-03-23T15:00:00",
            status: "confirmed"
        }
    ]
};

// Simple date formatting function
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const Dashboard = ({ isManager }) => {
    const [activeTab, setActiveTab] = useState('personal');
    const [events, setEvents] = useState(TEST_EVENTS[activeTab]);

    // Simulate loading state
    const [isLoading, setIsLoading] = useState(false);

    // Handle tab change
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setEvents(TEST_EVENTS[tab]);
    };

    // Simulate delete event
    const handleDelete = (eventId, note) => {
        console.log('Deleting event:', eventId, 'with note:', note);
        setEvents(events.filter(event => event.id !== eventId));
    };

    // Simulate update event time
    const handleUpdateTime = (eventId, newTime) => {
        console.log('Updating event:', eventId, 'to new time:', newTime);
        setEvents(events.map(event =>
            event.id === eventId
                ? { ...event, time: newTime }
                : event
        ));
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">Event Dashboard</h1>
                <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
                    <button
                        className={`px-3 py-1.5 text-sm font-medium ${activeTab === 'personal'
                            ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400'
                            : 'text-gray-600 dark:text-gray-400'
                            }`}
                        onClick={() => handleTabChange('personal')}
                    >
                        My Events
                    </button>
                    {isManager &&
                        (
                            <button
                                className={`px-3 py-1.5 text-sm font-medium ${activeTab === 'managed'
                                    ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400'
                                    : 'text-gray-600 dark:text-gray-400'
                                    }`}
                                onClick={() => handleTabChange('managed')}
                            >
                                Managed Events
                            </button>
                        )}
                </div>
            </div>

            <div className="grid gap-4">
                {events?.map((event) => (
                    <div
                        key={event.id}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:shadow-md transition-shadow"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                                    {event.name}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                                    Service: {event.serviceName}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                                    Time: {formatDate(event.time)}
                                </p>
                                <span className={`inline-block px-2 py-0.5 rounded text-xs ${event.status === 'confirmed'
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                    }`}>
                                    {event.status}
                                </span>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => {
                                        const newTime = prompt('Enter new time (YYYY-MM-DD HH:mm):');
                                        if (newTime) {
                                            handleUpdateTime(event.id, newTime);
                                        }
                                    }}
                                    className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                >
                                    Change Time
                                </button>
                                <button
                                    onClick={() => {
                                        const note = prompt('Please provide a reason for deletion:');
                                        if (note) {
                                            handleDelete(event.id, note);
                                        }
                                    }}
                                    className="px-3 py-1.5 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard; 