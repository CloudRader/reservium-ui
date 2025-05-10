import React from 'react';
import PropTypes from 'prop-types';

const DashboardHeader = ({ activeTab, eventState, onTabChange, onEventStateChange, isManager }) => {
    return (
        <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">Event Dashboard</h1>
            <div className="flex flex-wrap gap-4 border-b border-gray-200 dark:border-gray-700">
                <button
                    className={`px-3 py-1.5 text-sm font-medium ${activeTab === 'personal'
                        ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-400'
                        }`}
                    onClick={() => onTabChange('personal')}
                >
                    My Events
                </button>
                {isManager && (
                    <>
                        <button
                            className={`px-3 py-1.5 text-sm font-medium ${activeTab === 'managed'
                                ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400'
                                : 'text-gray-600 dark:text-gray-400'
                                }`}
                            onClick={() => onTabChange('managed')}
                        >
                            Managed Events
                        </button>
                        {activeTab === 'managed' && (
                            <div className="flex flex-wrap gap-2">
                                <button
                                    className={`px-3 py-1.5 text-sm font-medium ${eventState === 'not_approved'
                                        ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400'
                                        : 'text-gray-600 dark:text-gray-400'
                                        }`}
                                    onClick={() => onEventStateChange('not_approved')}
                                >
                                    Not Approved
                                </button>
                                <button
                                    className={`px-3 py-1.5 text-sm font-medium ${eventState === 'update_requested'
                                        ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400'
                                        : 'text-gray-600 dark:text-gray-400'
                                        }`}
                                    onClick={() => onEventStateChange('update_requested')}
                                >
                                    Update Requested
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

DashboardHeader.propTypes = {
    activeTab: PropTypes.oneOf(['personal', 'managed']).isRequired,
    eventState: PropTypes.oneOf(['not_approved', 'update_requested']).isRequired,
    onTabChange: PropTypes.func.isRequired,
    onEventStateChange: PropTypes.func.isRequired,
    isManager: PropTypes.bool.isRequired,
};

export default DashboardHeader; 