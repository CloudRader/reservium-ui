import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ServicesSection from '../Components/ServicesSection';
import constants from '../Constants';

const SuccessPage = () => {
    const location = useLocation();
    const { state } = location;
    let maxPeopleMessage = "";
    let isTooManyPeopleMessage = false;
    let isNightTimeMessage = false;
    let managerMail = "";
    let linkOnWiki = "";
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    if (state) {
        const { message, contactMail, wikiLink } = state;
        if (message) {
            const response = JSON.stringify(message, null, 2);
            isTooManyPeopleMessage = response.includes("more than");
            isNightTimeMessage = response.includes("Night time");
            managerMail = JSON.stringify(contactMail);
            maxPeopleMessage = response.replace(/"/g, '');
        }
        linkOnWiki = wikiLink;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = {
                event_name: e.target.event_name.value,
                guests: e.target.guests.value,
                event_start: e.target.event_start.value,
                event_end: e.target.event_end.value,
                user_name: e.target.user_name.value,
                email: e.target.email.value,
                organizers: e.target.organizers.value,
                space: e.target.space.value,
                others_space: e.target.others_space.value,
            };

            const response = await fetch('/emails/send_event_registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSubmitSuccess(true);
            } else {
                throw new Error('Failed to submit form');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit form. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Extract form data from state
    let formData = {};
    if (state && state.message) {
        const messageObj = JSON.parse(state.message);
        formData = {
            event_name: messageObj.event_name || '',
            guests: messageObj.guests || '',
            event_start: messageObj.event_start || '',
            event_end: messageObj.event_end || '',
            user_name: messageObj.user_name || '',
            email: messageObj.email || '',
            space: messageObj.space || '',
        };
    }

    if (isTooManyPeopleMessage) {
        return (
            <div className="min-h-screen bg-gradient-to-r from-green-50 to-green-100">
                <div className="container mx-auto px-4 py-6 md:py-16 lg:py-24">
                    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
                        <div className="p-6 md:p-8">
                            <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">Event Registration Form</h1>

                            {submitSuccess ? (
                                <div className="text-center p-6 bg-green-50 rounded-lg">
                                    <h2 className="text-2xl font-semibold text-green-700 mb-4">Registration Submitted Successfully!</h2>
                                    <p className="text-green-600">Your registration has been sent to the Head of Dormitory and manager.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
                                            <input
                                                type="text"
                                                name="event_name"
                                                required
                                                defaultValue={formData.event_name}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                                            <input
                                                type="number"
                                                name="guests"
                                                required
                                                defaultValue={formData.guests}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Event Start</label>
                                            <input
                                                type="datetime-local"
                                                name="event_start"
                                                required
                                                defaultValue={formData.event_start}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Event End</label>
                                            <input
                                                type="datetime-local"
                                                name="event_end"
                                                required
                                                defaultValue={formData.event_end}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                            <input
                                                type="text"
                                                name="user_name"
                                                required
                                                defaultValue={formData.user_name}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                defaultValue={formData.email}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Organizers</label>
                                            <input
                                                type="text"
                                                name="organizers"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Space</label>
                                            <input
                                                type="text"
                                                name="space"
                                                required
                                                defaultValue={formData.space}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Additional Space Details</label>
                                        <textarea
                                            name="others_space"
                                            rows="3"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        ></textarea>
                                    </div>
                                    <div className="flex justify-center">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                                        >
                                            {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                                        </button>
                                    </div>
                                </form>
                            )}

                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-600">
                                    For more information, please visit our wiki page:
                                </p>
                                <div className="mt-2">
                                    <a
                                        href={linkOnWiki}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-green-600 hover:text-green-700"
                                    >
                                        View Wiki Page →
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
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
                                email it to the Head of Dormitory ({constants.headOfDormitoryEmail}), with the manager
                                ({managerMail}) in CC (Carbon Copy), at least 5 business days before the event.
                            </p>
                            <div className="pb-2">
                                <a href={linkOnWiki} target="_blank" rel="noopener noreferrer"
                                    className="inline-flex no-underline items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                    More information
                                </a>
                            </div>
                            <p className="text-l md:text-xl text-green-700">
                                The registration form can be obtained by contacting the room manager at {managerMail} or
                                through the button bellow:
                            </p>
                            <div className="pb-2">
                                <a href={constants.reservationFormLink} target="_blank" rel="noopener noreferrer"
                                    className="inline-flex no-underline items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                    Registration form
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )
                : isNightTimeMessage ? (
                    <div className="container mx-auto px-4 py-8 md:py-16 lg:py-52 flex flex-col md:flex-row items-stretch justify-between">
                        <div className="w-full mb-8 md:mb-0 md:flex md:flex-col">
                            <div className="bg-white dark:!bg-green-700 p-6 md:p-8 text-center flex-grow flex flex-col justify-center">
                                <h1 className="text-4xl dark:!text-white font-bold text-green-800 mb-4">You need to confirm your
                                    reservation</h1>
                                <p className="text-l dark:!text-white md:text-xl text-green-700 mb-8">
                                    For night time reservation you must get additional confirmation from the manager. You will receive this confirmation via email. In case you do not receive a reply within a few days, you may contact the manager directly at {managerMail}, with your reservation details.
                                    More information here:
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
                    <div className="container mx-auto px-4 py-16 md:py-4 lg:py-52 flex flex-col md:flex-row items-stretch justify-between">
                        <div className="w-full md:w-1/2 lg:w-5/12 mb-8 md:mb-0 md:flex md:flex-col">
                            <div className="bg-white dark:!bg-green-700 p-6 md:p-8 text-center flex-grow flex flex-col justify-center">
                                <h1 className="text-4xl dark:!text-white font-bold text-green-800 mb-4">Reservation was made
                                    successfully</h1>
                                <p className="text-l dark:!text-white md:text-xl text-green-700 mb-8">
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
                            <ServicesSection />
                        </div>
                    </div>
                )}
        </div>
    );
};

export default SuccessPage;