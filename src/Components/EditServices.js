import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import UniversalLayout from "../UniversalLayout";

const EditServices = () => {
    const [services, setServices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch services data here
        // For now, we'll use mock data
        const mockServices = [
            {id: '1', name: 'Service 1'},
            {id: '2', name: 'Service 2'},
            {id: '3', name: 'Service 3'},
        ];
        setServices(mockServices);
    }, []);

    const handleServiceClick = (serviceId) => {
        navigate(`/edit-service/${serviceId}`);
    };

    return (
        <UniversalLayout centerContent whiteBackGreenContentBackground>
            <h1 className="text-2xl font-bold text-green-800 mb-6">Edit Services</h1>
            <table className="w-full bg-white overflow-hidden">
                <thead className="bg-green-200 text-green-700">
                <tr>
                    <th className="py-2 px-4 text-left">Service Name</th>
                    <th className="py-2 px-36 text-right">Actions</th>
                </tr>
                </thead>
                <tbody>
                {services.map((service) => (
                    <tr key={service.id} className="border-b border-green-100 hover:bg-green-50">
                        <td
                            className="py-3 px-4 cursor-pointer text-green-700 hover:text-green-900"
                            onClick={() => handleServiceClick(service.id)}
                        >
                            {service.name}
                        </td>
                        <td className="py-3 px-12 text-right">
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mr-2 text-sm"
                                onClick={() => navigate(`/edit-calendars/${service.id}`)}
                            >
                                Edit Calendars
                            </button>
                            <button
                                className="bg-purple-500 hover:bg-purple-600 text-white py-1 px-2 rounded text-sm"
                                onClick={() => navigate(`/edit-mini-services/${service.id}`)}
                            >
                                Edit Mini Services
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="mt-6">
                <Link
                    to="/add-service"
                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    Add New Service
                </Link>
            </div>
        </UniversalLayout>
    );
};

export default EditServices;