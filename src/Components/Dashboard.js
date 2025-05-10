import React, { useState } from 'react';
import { useEvents } from '../hooks/useEvents';
import axios from 'axios';
import constants from '../Constants';
import DashboardHeader from './DashboardHeader';
import EventCard from './EventCard';
import PulsatingLoader from './PulsatingLoader';

const Dashboard = ({ userId, isManager, managerRoles }) => {
    const [activeTab, setActiveTab] = useState('personal');

    const { data: events, isLoading, error } = useEvents(
        userId,
        activeTab,
        managerRoles
    );

    // Handle tab change
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    // Handle delete event
    const handleDelete = async (eventId, note) => {
        try {
            await axios.delete(`${constants.serverURL}/events/${eventId}`, { data: note });
            // The query will automatically refetch due to React Query's cache invalidation
        } catch (error) {
            console.error('Error deleting event:', error);
            alert('Failed to delete event. Please try again.');
        }
    };

    // Handle update event time
    const handleUpdateTime = async (eventId, newStartTime, newEndTime, reason) => {
        try {
            if (!reason) return;

            const startDateTime = new Date(newStartTime);
            const endDateTime = new Date(newEndTime);

            // Convert to naive datetime strings (YYYY-MM-DD HH:mm:ss)
            const formatNaiveDateTime = (date) => {
                return date.toISOString().slice(0, 19).replace('T', ' ');
            };

            await axios.put(
                `${constants.serverURL}/events/request_update_reservation_time/${eventId}`,
                {
                    event_update: {
                        start_datetime: formatNaiveDateTime(startDateTime),
                        end_datetime: formatNaiveDateTime(endDateTime)
                    },
                    reason: reason
                }
            );
            // The query will automatically refetch due to React Query's cache invalidation
        } catch (error) {
            console.error('Error requesting time update:', error);
            alert('Failed to request time update. Please try again.');
        }
    };

    // Handle approve/decline time change
    const handleApproveTime = async (eventId, approve, managerNotes) => {
        try {
            await axios.put(
                `${constants.serverURL}/events/approve_update_reservation_time/${eventId}?approve=${approve}`,
                managerNotes
            );
            // The query will automatically refetch due to React Query's cache invalidation
        } catch (error) {
            console.error('Error approving/declining time change:', error);
            alert(`Failed to ${approve ? 'approve' : 'decline'} time change. Please try again.`);
        }
    };

    // Handle approve/decline event
    const handleApproveEvent = async (eventId, approve, managerNotes) => {
        try {
            await axios.put(
                `${constants.serverURL}/events/approve_event/${eventId}?approve=${approve}`,
                managerNotes
            );
            // The query will automatically refetch due to React Query's cache invalidation
        } catch (error) {
            console.error('Error approving/declining event:', error);
            alert(`Failed to ${approve ? 'approve' : 'decline'} event. Please try again.`);
        }
    };

    if (isLoading) {
        return <PulsatingLoader />;
    }

    if (error) {
        return <div className="text-red-500 text-center p-4">Error loading events: {error.message}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <DashboardHeader
                activeTab={activeTab}
                onTabChange={handleTabChange}
                isManager={isManager}
            />

            {/* Desktop version */}
            <div className="hidden md:grid gap-4">
                {events?.map((event) => (
                    <EventCard
                        key={event.id}
                        event={event}
                        onUpdateTime={handleUpdateTime}
                        onDelete={handleDelete}
                        onApproveTime={handleApproveTime}
                        onApproveEvent={handleApproveEvent}
                        isManager={isManager}
                    />
                ))}
            </div>

            {/* Mobile version */}
            <div className="md:hidden space-y-4">
                {events?.map((event) => (
                    <EventCard
                        key={event.id}
                        event={event}
                        onUpdateTime={handleUpdateTime}
                        onDelete={handleDelete}
                        onApproveTime={handleApproveTime}
                        onApproveEvent={handleApproveEvent}
                        isManager={isManager}
                        isMobile={true}
                    />
                ))}
            </div>
            {(!events || events.length === 0) && (
                <div className="text-center p-8 bg-white rounded-lg shadow-sm">
                    <p className="text-gray-800 text-xl mb-4">
                        No events found
                    </p>
                    <p className="text-gray-600">
                        {activeTab === 'personal'
                            ? "You don't have any events yet."
                            : "There are no events to manage at the moment."}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Dashboard; 