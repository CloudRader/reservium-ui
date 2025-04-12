import React, { useState } from 'react';

const EventRegistrationForm = ({ formData }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [agreementAccepted, setAgreementAccepted] = useState(false);
    const [selectedSpaces, setSelectedSpaces] = useState([]);
    const [selectedSpace, setSelectedSpace] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!agreementAccepted) {
            alert('Please accept the agreement terms before submitting.');
            return;
        }

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
                others_space: selectedSpaces.join(', '),
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

    const addSpace = () => {
        if (selectedSpace && !selectedSpaces.includes(selectedSpace)) {
            setSelectedSpaces([...selectedSpaces, selectedSpace]);
            setSelectedSpace('');
        }
    };

    const removeSpace = (space) => {
        setSelectedSpaces(selectedSpaces.filter(s => s !== space));
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
                                readOnly
                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                            <input
                                type="number"
                                name="guests"
                                required
                                defaultValue={formData.guests}
                                readOnly
                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Event Start</label>
                            <input
                                type="datetime-local"
                                name="event_start"
                                required
                                defaultValue={formData.event_start}
                                readOnly
                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Event End</label>
                            <input
                                type="datetime-local"
                                name="event_end"
                                required
                                defaultValue={formData.event_end}
                                readOnly
                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                defaultValue={formData.email}
                                readOnly
                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
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
                                readOnly
                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Spaces</label>
                            <div className="flex space-x-2">
                                <select
                                    value={selectedSpace}
                                    onChange={(e) => setSelectedSpace(e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    <option value="">Select a space</option>
                                    {formData.allSpace && formData.allSpace.map((space, index) => (
                                        <option key={index} value={space}>
                                            {space}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    onClick={addSpace}
                                    disabled={!selectedSpace}
                                    className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                                >
                                    Add
                                </button>
                            </div>

                            {selectedSpaces.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {selectedSpaces.map((space, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                                        >
                                            {space}
                                            <button
                                                type="button"
                                                onClick={() => removeSpace(space)}
                                                className="ml-1 inline-flex items-center p-0.5 rounded-full text-green-400 hover:bg-green-200 hover:text-green-500 focus:outline-none"
                                            >
                                                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}

                            {!formData.allSpace || formData.allSpace.length === 0 && (
                                <p className="mt-2 text-sm text-gray-500 italic">No additional spaces available</p>
                            )}
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-800 mb-2">Agreement of Terms</h3>
                        <p className="text-gray-700 text-sm mb-4">
                            By sending this registration form, I acknowledge that I am formally registering the event in the system and I
                            am aware of the terms of use for the BUK club space and its equipment. I take full responsibility
                            for ensuring that the event runs smoothly, without health complications or issues. I also
                            acknowledge that the PS team will ensure the registration of the event in the reservation system. I
                            accept responsibility for any damages caused to the space and am prepared to cover the costs in
                            case of any damage.
                        </p>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="agreement"
                                checked={agreementAccepted}
                                onChange={(e) => setAgreementAccepted(e.target.checked)}
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <label htmlFor="agreement" className="ml-2 block text-sm text-gray-700">
                                I accept the agreement terms
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={isSubmitting || !agreementAccepted}
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Form'}
                        </button>
                    </div>
                </form>
            )}
        </>
    );
};

export default EventRegistrationForm; 