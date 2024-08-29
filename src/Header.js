import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = ({ username, isLoggedIn, onLogout, services }) => {

    return (
        <header className="bg-green-100 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-bold text-green-800">Buben Club</span>
                        </div>
                        <div className="hidden sm:ml-6 border-bottom-2 sm:flex sm:space-x-8">
                            {services.map((item) => (
                                <NavLink
                                    key={item.linkName}
                                    to={item.linkName}
                                    className={({ isActive }) =>
                                        `inline-flex items-center px-1 pt-1  text-sm font-medium ${
                                            isActive
                                                ? 'border-green-600 text-green-900'
                                                : 'border-transparent text-green-700 hover:border-green-300 hover:text-green-800'
                                        }`
                                    }
                                >
                                    {item.serviceName}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        {isLoggedIn ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-sm font-medium text-green-700">Welcome, {username}</span>
                                <button
                                    onClick={onLogout}
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    Log out
                                </button>
                            </div>
                        ) : (
                            <NavLink
                                to="/login"
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-green-600 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Log in
                            </NavLink>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
