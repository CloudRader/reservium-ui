import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import constants from "../Constants";
import UniversalLayout from "../UniversalLayout";

const EditService = ({ service: initialService }) => {
    const navigate = useNavigate();
    const [service, setService] = useState(initialService);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        web: '',
        contact_mail: '',
        public: false,
        name: '',
        alias: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (initialService) {
            setFormData({
                web: initialService.web,
                contact_mail: initialService.contact_mail,
                public: initialService.public,
                name: initialService.name,
                alias: initialService.alias,
            });
        }
    }, [initialService]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await axios.put(`${constants.serverURL}/reservation_services/${service.id}`, formData);
            setService(response.data);
            setIsEditing(false);
            setIsSubmitting(false);
        } catch (err) {
            setError('Failed to update service');
            setIsSubmitting(false);
            console.error(err);
        }
    };

    if (!service) {
        return <div>Loading...</div>;
    }

    return (
        <UniversalLayout centerContent whiteBackGreenContentBackground>
            <h1 className="text-2xl font-bold text-green-800 mb-6">Edit Service: {service.name}</h1>
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
            <div className="bg-white p-4 w-100 shadow">
                {isEditing ? (
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-green-700">Web</label>
                                <input
                                    type="text"
                                    name="web"
                                    value={formData.web}
                                    onChange={handleInputChange}
                                    className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-green-700">Contact Email</label>
                                <input
                                    type="email"
                                    name="contact_mail"
                                    value={formData.contact_mail}
                                    onChange={handleInputChange}
                                    className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-green-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-green-700">Alias</label>
                                <input
                                    type="text"
                                    name="alias"
                                    value={formData.alias}
                                    onChange={handleInputChange}
                                    className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="public"
                                        checked={formData.public}
                                        onChange={handleInputChange}
                                        className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                                    />
                                    <span className="ml-2 text-sm text-green-700">Public</span>
                                </label>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? 'Updating...' : 'Update Service'}
                            </button>
                        </div>
                    </form>
                ) : (
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h2 className="text-lg font-semibold text-green-700">Basic Information</h2>
                                <p><strong>Web:</strong> {service.web}</p>
                                <p><strong>Contact Email:</strong> {service.contact_mail}</p>
                                <p><strong>Public:</strong> {service.public ? 'Yes' : 'No'}</p>
                                <p><strong>Name:</strong> {service.name}</p>
                                <p><strong>Alias:</strong> {service.alias}</p>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-green-700">Associated Items</h2>
                                <p><strong>Calendars:</strong> {service.calendars?.length || 0}</p>
                                <p><strong>Mini Services:</strong> {service.mini_services?.length || 0}</p>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                onClick={() => navigate(`/edit-calendars/${service.linkName}`)}
                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Edit Calendars
                            </button>
                            <button
                                onClick={() => navigate(`/edit-mini-services/${service.linkName}`)}
                                className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            >
                                Edit Mini Services
                            </button>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Edit Service
                            </button>
                        </div>
                    </>
                )}
            </div>
        </UniversalLayout>
    );
};

export default EditService;