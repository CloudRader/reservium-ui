import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import bubenLogo from "./assets/buben_logo.svg";

const Header = ({username, isLoggedIn, onLogout, services}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-green-100 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex justify-between items-center h-16 text-green-800">
                    <div className="flex items-center space-x-2">
                        <NavLink key="club" to="club" className="flex items-center text-green-800 no-underline">
                            <span className="text-2xl font-bold mr-2">Buben Club</span>
                            <img src={bubenLogo} alt="Buben Club Logo" className="w-11 h-11"/>
                        </NavLink>
                        <div className="hidden sm:flex space-x-9">
                            {services.map((item) => (
                                <NavLink
                                    key={item.linkName}
                                    to={item.linkName}
                                    className={({isActive}) =>
                                        `inline-flex text-green-800 items-center h-11 border-b-2 text-sm font-medium no-underline ${
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
                    </div>
                    <div className="hidden sm:flex sm:items-center">
                        {isLoggedIn ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-sm font-medium text-green-700">{username}</span>
                                <NavLink
                                    className="no-underline inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    to="/logout"
                                >
                                    Log out
                                </NavLink>
                            </div>
                        ) : (
                            <NavLink
                                to="/login"
                                className="no-underline text-white inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Log in
                            </NavLink>
                        )}
                    </div>

                    <div className="sm:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-green-600 hover:text-green-800 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-100 focus:ring-green-500"
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                {isMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </nav>

                {/* Mobile dropdown menu */}
                {isMenuOpen && (
                    <div className="sm:hidden">
                        <div className="pt-2 pb-3 space-y-1">
                            {services.map((item) => (
                                <NavLink
                                    key={item.linkName}
                                    to={item.linkName}
                                    className={({isActive}) =>
                                        `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                                            isActive
                                                ? 'border-green-600 text-green-900 bg-green-50'
                                                : 'border-transparent text-green-700 hover:border-green-300 hover:bg-green-50 hover:text-green-800'
                                        }`
                                    }
                                >
                                    {item.serviceName}
                                </NavLink>
                            ))}
                        </div>
                        <div className="border-t border-green-200 pt-4 pb-3">
                            {isLoggedIn ? (
                                <div className="flex items-center px-5 space-x-4">
                                    <span className="text-sm font-medium text-green-700">Welcome, {username}</span>
                                    <button
                                        onClick={onLogout}
                                        className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    >
                                        Log out
                                    </button>
                                </div>
                            ) : (
                                <NavLink
                                    to="/login"
                                    className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-600 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    Log in
                                </NavLink>
                            )}
                        </div>
                    </div>
                )
                }
            </div>
        </header>
    )
        ;
};

export default Header;
