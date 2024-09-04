import React from 'react';
import {NavLink} from "react-router-dom";
import ServicesSection from "./ServicesSection";

const LoginInfoPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-green-50 to-green-100">
            <div
                className="container mx-auto px-4 py-8 md:py-16 lg:py-52 flex flex-col md:flex-row items-stretch justify-between">
                <div className="w-full md:w-1/2 lg:w-5/12 mb-8 md:mb-0 md:flex md:flex-col">
                    <div className="bg-white p-6 md:p-8 text-center flex-grow flex flex-col justify-center">
                        <h2 className="text-2xl font-semibold text-green-700 mb-6">Please log in to make
                            reservations.</h2>
                        <div>
                            <NavLink
                                to="/login"
                                className="inline-flex no-underline items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Log in
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-7/12 md:flex md:flex-col">
                    <ServicesSection/>
                </div>
            </div>
        </div>
    )
};

export default LoginInfoPage;


