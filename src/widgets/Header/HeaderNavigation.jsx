import React from 'react';
import { NavLink } from 'react-router-dom';
import bubenLogo from '../../assets/buben_logo.svg';
import { ROUTES } from '../../config/routes.js';

const HeaderNavigation = ({ services, showServices, isViewMode }) => {
  return (
    <div className="flex items-center space-x-2">
      <NavLink
        to={isViewMode ? ROUTES.VIEW.SERVICE('club') : ROUTES.SERVICE('club')}
        className="w-200px flex items-center text-green-800 no-underline"
      >
        <span className="text-2xl font-bold mr-2">Buben Club</span>
        <img src={bubenLogo} alt="Buben Club Logo" className="w-11 h-11" />
      </NavLink>
      {showServices && (
        <div className="hidden sm:flex space-x-6 flex-grow justify-end">
          {services.map((item) => (
            <NavLink
              key={item.linkName}
              to={
                isViewMode
                  ? ROUTES.VIEW.SERVICE(item.linkName)
                  : ROUTES.SERVICE(item.linkName)
              }
              className={({ isActive }) =>
                `inline-flex items-center text-green-800 h-11 border-b-2 text-sm font-medium no-underline ${
                  isActive
                    ? 'border-green-600 text-green-900'
                    : 'border-transparent hover:border-green-300 hover:text-green-600'
                }`
              }
            >
              {item.serviceName}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeaderNavigation;
