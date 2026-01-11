import React, { useState } from 'react';
import DashboardHeader from './DashboardHeader';
import EventsList from './EventsList';
import { useEventActions } from '../hooks/useEventActions';

const Dashboard = ({ userId, isManager, managerRoles }) => {
  const [activeTab, setActiveTab] = useState('personal');

  const {
    handleDelete,
    handleRequestTimeChange,
    handleUpdateTime,
    handleApproveTime,
    handleApproveEvent,
  } = useEventActions();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="mx-auto px-4 py-6 lg:py-8">
      <DashboardHeader
        activeTab={activeTab}
        onTabChange={handleTabChange}
        isManager={isManager}
      />

      <EventsList
        activeTab={activeTab}
        onRequestTimeChange={handleRequestTimeChange}
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
