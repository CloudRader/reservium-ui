import React from 'react';
import PropTypes from 'prop-types';
import TabGroup from '@components/ui/navigation/TabGroup';
import {
  PERSONAL_TABS,
  MANAGER_TABS,
  DASHBOARD_TABS,
} from '../config/dashboardTabs';

const DashboardHeader = ({ activeTab, onTabChange, isManager }) => {
  const tabs = isManager ? [...PERSONAL_TABS, ...MANAGER_TABS] : PERSONAL_TABS;

  return (
    <div className="mb-6">
      <h1 className="text-xl sm:text-3xl font-bold text-green-800 mb-4 sm:mb-6">
        Event Dashboard
      </h1>
      <div className="border-b-2 border-green-200">
        <div className="flex flex-wrap gap-1">
          <TabGroup
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={onTabChange}
          />
        </div>
      </div>
    </div>
  );
};

DashboardHeader.propTypes = {
  activeTab: PropTypes.oneOf(Object.values(DASHBOARD_TABS)).isRequired,
  onTabChange: PropTypes.func.isRequired,
  isManager: PropTypes.bool.isRequired,
};

export default DashboardHeader;
