import React from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import ServicesSection from './ServicesSection';

const NotFoundPage = () => {
    const location = useLocation();
    const { state } = location; // Access the state passed via navigation

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-50 to-green-100">
            <div className="container mx-auto px-4 py-8 md:py-16 lg:py-52 flex flex-col md:flex-row items-stretch justify-between">
                <div className="w-full md:w-1/2 lg:w-5/12 mb-8 md:mb-0 md:flex md:flex-col">
                    <div className="bg-white p-6 md:p-8 text-center flex-grow flex flex-col justify-center">
                        {/*<h1 className="text-4xl font-bold text-green-800 mb-4">Reservation made successfully</h1>*/}
                        {/*<h2 className="text-2xl font-semibold text-green-700 mb-6">Reservation made successfully</h2>*/}
                        {/*<p className="text-green-700 mb-8">Now you can see it on the calendar.</p>*/}
                        {/*<p className="text-green-700 mb-8">Please read the terms of use for the spaces on our wiki.</p>*/}
                        {/*<div>*/}
                        {/*<a href="https://wiki.buk.cvut.cz/cs/club-zone/club-room" target="_blank"*/}
                        {/*   rel="noopener noreferrer"*/}
                        {/*   className="inline-flex no-underline items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" */}
                        {/*>WIKI</a>*/}
                        {/*</div>*/}
                        <p>Data received:</p>
                        <pre>{JSON.stringify(state, null, 2)}</pre>
                    </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-7/12 md:flex md:flex-col">
                    <ServicesSection/>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;