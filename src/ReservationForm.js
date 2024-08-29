import React, { useState } from 'react';

const ReservationForm = ({ formFields, username, onSubmit, onTypeChange }) => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = (e, field) => {
        const { name, value, type, checked } = e.target;
        let updatedValue = value;

        if (field.type === 'date' || field.type === 'time') {
            const isValid = field.validation ? field.validation(value) : true;
            if (!isValid) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    [name]: `Invalid value for ${field.labelText}`,
                }));
                return;
            }
            setErrors(prevErrors => {
                const { [name]: removed, ...rest } = prevErrors;
                return rest;
            });
        }

        if (field.type === 'time') {
            updatedValue = `${value}:00`;
        }

        setFormData(prevData => {
            if (type === 'checkbox') {
                const currentValues = prevData[name] || [];
                if (checked) {
                    return {
                        ...prevData,
                        [name]: [...currentValues, value],
                    };
                } else {
                    return {
                        ...prevData,
                        [name]: currentValues.filter(item => item !== value),
                    };
                }
            } else {
                return {
                    ...prevData,
                    [name]: updatedValue,
                };
            }
        });

        if (field.name === 'type' && onTypeChange) {
            onTypeChange({ value: updatedValue });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let validationErrors = {};
        formFields.forEach(field => {
            const value = formData[field.name];
            if (field.validation && !field.validation(value)) {
                validationErrors[field.name] = `Invalid value for ${field.labelText}`;
            }
        });

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            const payload = {
                start_datetime: `${formData.startDate}T${formData.startTime}`,
                end_datetime: `${formData.endDate}T${formData.endTime}`,
                purpose: formData.purpose,
                guests: parseInt(formData.guests, 10),
                reservation_type: formData.type,
                email: formData.email,
                additional_services: formData.additionalServices || [],
                username: username,
            };
            onSubmit(payload);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold text-purple-800 mb-4">Reservation Form</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formFields.map((field) => (
                    <div key={field.name} className="mb-4">
                        <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">{field.labelText}</label>
                        {field.type === 'select' ? (
                            <select
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                                name={field.name}
                                value={formData[field.name] || ''}
                                onChange={(e) => handleChange(e, field)}
                            >
                                <option value="">Select an option</option>
                                {field.options.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        ) : field.type === 'checkbox' ? (
                            <div className="space-y-2">
                                {field.options.map((option) => (
                                    <div key={option.value} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name={field.name}
                                            value={option.value}
                                            id={`${field.name}-${option.value}`}
                                            checked={(formData[field.name] || []).includes(option.value)}
                                            onChange={(e) => handleChange(e, field)}
                                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor={`${field.name}-${option.value}`} className="ml-2 block text-sm text-gray-900">
                                            {option.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <input
                                type={field.type}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                                name={field.name}
                                value={formData[field.name] || ''}
                                onChange={(e) => handleChange(e, field)}
                                min={field.min}
                                max={field.max}
                            />
                        )}
                        {errors[field.name] && <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>}
                    </div>
                ))}
                <div className="col-span-full mt-4">
                    <button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                        Submit Reservation
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReservationForm;