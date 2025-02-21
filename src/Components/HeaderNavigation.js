import React from 'react';
import { NavLink } from 'react-router-dom';
import bubenLogo from "../assets/buben_logo.svg";

const HeaderNavigation = ({ services, showServices }) => {
    return (
        <div className="flex items-center space-x-2">
            <NavLink key="club" to="/club" className="w-200px flex items-center text-green-800 no-underline ">
                <span className="text-2xl font-bold mr-2">Buben Club</span>
                <img src={bubenLogo} alt="Buben Club Logo" className="w-11 h-11" />
            </NavLink>
            {showServices &&
                <div className="hidden sm:flex space-x-6 flex-grow justify-end">
                    {services.map((item) => (
                        <NavLink
                            key={item.linkName}
                            to={item.linkName}
                            className={({ isActive }) =>
                                `inline-flex text-green-800 items-center h-11 border-b-2 text-sm font-medium no-underline ${isActive
                                    ? 'border-green-600 text-green-900'
                                    : 'border-transparent hover:border-green-300 hover:text-green-600'
                                }`
                            }>
                            {item.serviceName}
                        </NavLink>
                    ))}
                </div>}
        </div>
    );
};

export default HeaderNavigation;
