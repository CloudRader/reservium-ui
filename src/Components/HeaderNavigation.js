import React from 'react';
import { NavLink } from 'react-router-dom';
import bubenLogo from "../assets/buben_logo.svg";

const HeaderNavigation = ({ services, showServices, isViewMode }) => {
    return (
        <div className="flex items-center justify-between w-full">
            <NavLink
                to={isViewMode ? "/view/club" : "/club"}
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
            >
                <img src={bubenLogo} alt="Buben Club Logo" className="w-10 h-10" />
                <span className="text-2xl font-bold bg-gradient-to-r from-green-700 to-green-900 bg-clip-text text-transparent">Buben Club</span>
            </NavLink>
            {showServices && (
                <div className="hidden sm:flex space-x-6">
                    {services.map((item) => (
                        <NavLink
                            key={item.linkName}
                            to={isViewMode ? `view/${item.linkName}` : item.linkName}
                            className={({ isActive }) =>
                                `inline-flex text-green-800 h-11 border-b-2 text-lg font-medium no-underline transition-all duration-200 ${isActive
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
