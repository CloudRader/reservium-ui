import React from 'react';
import PropTypes from 'prop-types';
import * as Tabs from '@radix-ui/react-tabs';

/**
 * Tab group component for rendering multiple tabs using Radix UI
 */
const TabGroup = ({ tabs, activeTab, onTabChange }) => (
  <Tabs.Root value={activeTab} onValueChange={onTabChange}>
    <Tabs.List className="flex flex-wrap gap-1">
      {tabs.map((tab) => (
        <Tabs.Trigger
          key={tab.id}
          value={tab.id}
          className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-t-lg transition-colors data-[state=active]:bg-green-100 data-[state=active]:text-green-700 data-[state=active]:border-b-2 data-[state=active]:border-green-600 data-[state=inactive]:text-gray-600 hover:bg-green-50 hover:text-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
        >
          {tab.label}
        </Tabs.Trigger>
      ))}
    </Tabs.List>
  </Tabs.Root>
);

TabGroup.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
};

export default TabGroup;
