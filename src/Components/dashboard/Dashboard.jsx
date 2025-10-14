import React, { useState } from 'react';
import axios from 'axios';
import DashboardHeader from './DashboardHeader';
import EventsList from './EventsList';
import { API_BASE_URL } from '../../constants';
import { formatDateTimeLocalForAPI } from '../../utils/dateUtils';

const Dashboard = ({ userId, isManager, managerRoles }) => {
  const [activeTab, setActiveTab] = useState('personal');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleDelete = async (eventId, note) => {
    try {
      await axios.delete(`${API_BASE_URL}/events/${eventId}`, {
        data: note,
      });
      alert('Event cancelled successfully!');
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to cancel event. Please try again.');
    }
  };

  // Handle update event time (for managers - direct PUT to /events/{id})
  const handleUpdateTime = async (
    eventId,
    newStartTime,
    newEndTime,
    reason
  ) => {
    try {
      if (!reason) return;

      await axios.put(`${API_BASE_URL}/events/${eventId}`, {
        event_update: {
          reservation_start: formatDateTimeLocalForAPI(newStartTime),
          reservation_end: formatDateTimeLocalForAPI(newEndTime),
        },
        reason: reason,
      });
      alert('Time change request sent successfully!');
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Failed to send time change request. Please try again.');
    }
  };

  // Handle approve/decline time change
  const handleApproveTime = async (eventId, approve, managerNotes) => {
    try {
      await axios.put(
        `${API_BASE_URL}/events/${eventId}/approve-time-change-request?approve=${approve}`,
        managerNotes
      );
      alert(`Time change ${approve ? 'approved' : 'declined'} successfully!`);
    } catch (error) {
      console.error('Error approving/declining time change:', error);
      alert(
        `Failed to ${
          approve ? 'approve' : 'decline'
        } time change. Please try again.`
      );
    }
  };

  // Handle approve/decline event
  const handleApproveEvent = async (eventId, approve, managerNotes) => {
    try {
      await axios.put(
        `${API_BASE_URL}/events/${eventId}/approve?approve=${approve}`,
        managerNotes
      );
      alert(`Event ${approve ? 'approved' : 'declined'} successfully!`);
    } catch (error) {
      console.error('Error approving/declining event:', error);
      alert(
        `Failed to ${approve ? 'approve' : 'decline'} event. Please try again.`
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <DashboardHeader
        activeTab={activeTab}
        onTabChange={handleTabChange}
        isManager={isManager}
      />

      <EventsList
        activeTab={activeTab}
        onUpdateTime={handleUpdateTime}
        onDelete={handleDelete}
        onApproveTime={handleApproveTime}
        onApproveEvent={handleApproveEvent}
        isManager={isManager}
        userId={userId}
        managerRoles={managerRoles}
      />
    </div>
  );
};

export default Dashboard;
