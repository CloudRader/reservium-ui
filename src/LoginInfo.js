import React from 'react';
import { NavLink } from "react-router-dom";
import { AlertCircle } from 'lucide-react';

const LoginInfo = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="border-2 border-green-800 bg-white rounded-lg p-3 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center text-green-800">
                    <AlertCircle className="w-8 h-8 mr-4" />
                    <span className="text-lg font-medium">Please log in to make reservations</span>
                </div>
                <NavLink
                    to="/login"
                    className="px-6 py-3 bg-green-800 text-white font-medium text-lg rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 shadow-md"
                > Log in
                </NavLink>
            </div>
        </div>
    );
};

export default LoginInfo;