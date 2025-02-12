import React, { useState } from 'react';
import axios from 'axios';
import constants from "../Constants";
import UniversalLayout from "../UniversalLayout";
axios.defaults.withCredentials = true;

const CreateNewMiniService = ({ serviceId }) => {
    const [formData, setFormData] = useState({
        name: '',
        reservation_service_id: serviceId, // Default value set to 'klub'
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${constants.serverURL}/mini_services/create_mini_service`, formData)
            .then(response => {
                if (response.status === 201) {
                    console.log(response);
                    setSuccessMessage('Mini service created successfully!');
                    setErrorMessage('');
                } else {
                    console.error('Error:', response);
                    setSuccessMessage('');
                    setErrorMessage(`Error creating mini service. ${response.data.message}`);
                }
            })
            .catch(error => {
                console.error('Error creating mini service:', error);
                setSuccessMessage('');
                setErrorMessage('Error creating mini service, try again later.');
            });
    };

    return (
        <UniversalLayout centerContent whiteBackGreenContentBackground headerTittle={'Create New Mini Service'}>
            <div className="bg-white p-4 rounded-lg shadow">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-green-700 mb-1">
                            Mini Service Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Create Mini Service
                    </button>
                </form>

                {successMessage && <div className="mt-3 p-2 bg-green-100 text-green-700 rounded">{successMessage}</div>}
                {errorMessage && <div className="mt-3 p-2 bg-red-100 text-red-700 rounded">{errorMessage}</div>}
            </div>
        </UniversalLayout>
    );
}

export default CreateNewMiniService;