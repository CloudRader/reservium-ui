import React from 'react';
import {useLocation} from 'react-router-dom';
import ServicesSection from './ServicesSection';
import config from './Config';

const SuccessPage = () => {
    const location = useLocation();
    const {state} = location;
    let maxPeopleMessage = "";
    let isTooManyPeopleMessage = false;
    let isNightTimeMessage = false;
    let managerMail = "";
    let linkOnWiki = "";
    if (state) {
        const {message, contactMail, wikiLink} = state;
        if (message) {
            const response = JSON.stringify(message, null, 2);
            isTooManyPeopleMessage = response.includes("more than");
            isNightTimeMessage = response.includes("Night time");
            managerMail = JSON.stringify(contactMail);
            maxPeopleMessage = response.replace(/"/g, '');
        }
        linkOnWiki = wikiLink;
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-50 to-green-100">
            {isTooManyPeopleMessage ? (
                <div
                    className="container mx-auto px-4 py-6 md:py-16 lg:py-52 flex flex-col md:flex-row items-stretch justify-between">
                    <div className="w-full mb-8 md:mb-0 md:flex md:flex-col">
                        <div className="bg-white p-6 md:p-8 text-center flex-grow flex flex-col justify-center">
                            <h1 className="text-3xl font-bold text-green-800 mb-4">You need to confirm your
                                reservation</h1>
                            <p className="text-l md:text-xl text-green-700">
                                If you are reserving for {maxPeopleMessage}, you must fill out a registration form and
                                email it to the Head of Dormitory ({config.headOfDormitoryEmail}), with the manager ({managerMail})
                                in CC (Carbon Copy), at least 5 business days before the event.
                            </p>
                            <div className="pb-2">
                                <a href={linkOnWiki} target="_blank" rel="noopener noreferrer"
                                   className="inline-flex no-underline items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                    More information
                                </a>
                            </div>
                            <p className="text-l md:text-xl text-green-700">
                                The registration form can be obtained by contacting the room manager at {managerMail} or through the button bellow.:
                            </p>
                            <div className="pb-2">
                                <a href={config.reservationFormLink} target="_blank" rel="noopener noreferrer"
                                   className="inline-flex no-underline items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                    Registration form
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            ) : isNightTimeMessage ? (
                <div
                    className="container mx-auto px-4 py-8 md:py-16 lg:py-52 flex flex-col md:flex-row items-stretch justify-between">
                    <div className="w-full mb-8 md:mb-0 md:flex md:flex-col">
                        <div className="bg-white p-6 md:p-8 text-center flex-grow flex flex-col justify-center">
                            <h1 className="text-4xl font-bold text-green-800 mb-4">You need to confirm your
                                reservation</h1>
                            <p className="text-l md:text-xl text-green-700 mb-8">
                                For night time reservation you must get additional confirmation by email from the
                                manager. Write email to {managerMail}, with your reservation details. More information
                                here:
                            </p>
                            <div>
                                <a href={linkOnWiki} target="_blank" rel="noopener noreferrer"
                                   className="inline-flex no-underline items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                    INFO
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    className="container mx-auto px-4 py-8 md:py-16 lg:py-52 flex flex-col md:flex-row items-stretch justify-between">
                    <div className="w-full md:w-1/2 lg:w-5/12 mb-8 md:mb-0 md:flex md:flex-col">
                        <div className="bg-white p-6 md:p-8 text-center flex-grow flex flex-col justify-center">
                            <h1 className="text-4xl font-bold text-green-800 mb-4">Reservation was made
                                successfully</h1>
                            <p className="text-l md:text-xl text-green-700 mb-8">
                                Now you can see it in the calendar. Read the terms of use of the spaces on our
                                wiki page.
                            </p>
                            <div>
                                <a href={linkOnWiki} target="_blank" rel="noopener noreferrer"
                                   className="inline-flex no-underline items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                    READ
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-7/12 md:flex md:flex-col">
                        <ServicesSection/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SuccessPage;