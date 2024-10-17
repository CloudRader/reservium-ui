import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import constants from "../Constants";
import UniversalLayout from "../UniversalLayout"; // Make sure to install axios: npm install axios

const mockService = {
    web: "http://example.com",
    contact_mail: "contact@example.com",
    public: true,
    id: 1,
    deleted_at: null,
    name: "Example Service",
    alias: "example",
    calendars: [
        {
            id: "cal1",
            reservation_type: "Type A",
            max_people: 10,
            // ... other calendar properties
        }
    ],
    mini_services: [
        {
            id: "mini1",
            name: "Mini Service 1",
            // ... other mini service properties
        }
    ]
};
const EditService = () => {
    const { serviceName } = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState(mockService);
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

    // useEffect(() => {
        // Fetch service data here based on serviceId
    //     const fetchService = async () => {
    //         try {
    //             const response = await axios.get(`${constants.serverURL}/reservation_services/name/${serviceName}`);
    //             setService(response.data);
    //             setFormData({
    //                 web: response.data.web,
    //                 contact_mail: response.data.contact_mail,
    //                 public: response.data.public,
    //                 name: response.data.name,
    //                 alias: response.data.alias,
    //             });
    //         } catch (err) {
    //             setError('Failed to fetch service data');
    //             console.error(err);
    //         }
    //     };
    //
    //     fetchService();
    // }, [serviceName]);

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
            const response = await axios.put(`/api/reservation_services/${service["id"]}`, formData);
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
        <UniversalLayout centerContent whiteBackGreenContentBackground >
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
                                <h2 className="text-lg font-semibold text-green-700">Calendars</h2>
                                <ul>
                                    {service.calendars.map(calendar => (
                                        <li key={calendar.id}>{calendar.reservation_type} (Max: {calendar.max_people})</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="mt-4">
                            <h2 className="text-lg font-semibold text-green-700">Mini Services</h2>
                            <ul>
                                {service.mini_services.map(miniService => (
                                    <li key={miniService.id}>{miniService.name}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-6 flex justify-end">
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