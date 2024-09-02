import React from 'react';
import {useLocation} from 'react-router-dom';
import ServicesSection from './ServicesSection';

const NotFoundPage = () => {
    const location = useLocation();
    const {state} = location; // Access the state passed via navigation
    let isTooManyPeopleMessage = false;
    let response = "";
    if (state) {
        response = JSON.stringify(state, null, 2);
        isTooManyPeopleMessage = response.includes("Too many people!");
    }
    const link = "https://wiki.buk.cvut.cz/cs/club-zone/club-room";

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-50 to-green-100">
            {isTooManyPeopleMessage ? (
                <div className="container mx-auto px-4 py-8 md:py-16 lg:py-52 flex flex-col md:flex-row items-stretch justify-between">
                    <div className="w-full  mb-8 md:mb-0 md:flex md:flex-col">
                        <div className="bg-white p-6 md:p-8 text-center flex-grow flex flex-col justify-center">
                            <h1 className="text-4xl font-bold text-green-800 mb-4">Now reservation is waiting for
                                approval</h1>
                            <p className="text-green-700 text-xl mb-8">For this type of reservation (more than 10
                                people)
                                you will need to get additional confirmation. More information here: </p>
                           <div> <a href={link} target="_blank"
                               rel="noopener noreferrer"
                               className="inline-flex no-underline items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >INFO</a>
                           </div>
                            Server response {response}
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    className="container mx-auto px-4 py-8 md:py-16 lg:py-52 flex flex-col md:flex-row items-stretch justify-between">
                    <div className="w-full md:w-1/2 lg:w-5/12 mb-8 md:mb-0 md:flex md:flex-col">
                        <div className="bg-white p-6 md:p-8 text-center flex-grow flex flex-col justify-center">
                            <h1 className="text-4xl font-bold text-green-800 mb-4">Reservation made was
                                successfully</h1>
                            <p className="text-green-700 text-xl mb-8">Now you can see it in the calendar. Please read the terms of use of the spaces on our wiki page.</p>
                            <div>
                                <a href={link} target="_blank"
                                   rel="noopener noreferrer"
                                   className="inline-flex no-underline items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >READ</a>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-7/12 md:flex md:flex-col">
                        <ServicesSection/>
                    </div>
                </div>
            )}
</div> )
}
export default NotFoundPage;