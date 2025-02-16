import React, { useState } from 'react';

const EventRegistrationForm = ({ formData }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

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

            if (!response.ok) {
                throw new Error(`Failed to submit form: ${response.statusText}`);
            }

            setSubmitSuccess(true);
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit form. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">Other Organizers</label>
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
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Space</label>
                            <textarea
                                name="others_space"
                                rows="3"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            ></textarea>
                        </div>
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
        </>
    );
};

export default EventRegistrationForm; 