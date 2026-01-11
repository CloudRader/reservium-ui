import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

const ServicesContext = createContext({
  services: [],
  calendars: {},
  miniServices: {},
});

export const ServicesProvider = ({ children, services, calendars, miniServices }) => {
  return (
    <ServicesContext.Provider value={{ services, calendars, miniServices }}>
      {children}
    </ServicesContext.Provider>
  );
};

ServicesProvider.propTypes = {
  children: PropTypes.node.isRequired,
  services: PropTypes.array,
  calendars: PropTypes.object,
  miniServices: PropTypes.object,
};

ServicesProvider.defaultProps = {
  services: [],
  calendars: {},
  miniServices: {},
};

export const useServices = () => {
  const context = useContext(ServicesContext);
  // Return default empty values if context is not available (outside ServicesProvider)
  return context || { services: [], calendars: {}, miniServices: {} };
};
