import React from 'react';
import PropTypes from 'prop-types';

const TabButton = ({ isActive, onClick, children }) => (
    <button
        className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium ${isActive
            ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400'
            : 'text-gray-600 dark:text-gray-400'
            }`}
        onClick={onClick}
    >
        {children}
    </button>
);

TabButton.propTypes = {
    isActive: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

const ManagerTabs = ({ activeTab, onTabChange }) => (
    <div className="flex flex-wrap gap-1 sm:gap-2">
        <TabButton
            isActive={activeTab === 'not_approved'}
            onClick={() => onTabChange('not_approved')}
        >
            Not Approved
        </TabButton>
        <TabButton
            isActive={activeTab === 'update_requested'}
            onClick={() => onTabChange('update_requested')}
        >
            Update Requested
        </TabButton>
    </div>
);

ManagerTabs.propTypes = {
    activeTab: PropTypes.oneOf(['not_approved', 'update_requested']).isRequired,
    onTabChange: PropTypes.func.isRequired,
};

const DashboardHeader = ({ activeTab, onTabChange, isManager }) => {
    return (
        <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-5">Event Dashboard</h1>
            <div className="flex flex-wrap gap-2 sm:gap-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                <TabButton
                    isActive={activeTab === 'personal'}
                    onClick={() => onTabChange('personal')}
                >
                    My Events
                </TabButton>
                {isManager &&
                    <ManagerTabs
                        activeTab={activeTab}
                        onTabChange={onTabChange}
                    />
                }
            </div>
        </div>
    );
};

DashboardHeader.propTypes = {
    activeTab: PropTypes.oneOf(['personal', 'not_approved', 'update_requested']).isRequired,
    onTabChange: PropTypes.func.isRequired,
    isManager: PropTypes.bool.isRequired,
};

export default DashboardHeader; 