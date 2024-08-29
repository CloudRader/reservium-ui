import React, { useState } from 'react';

const ReservationForm = ({ formFields, onSubmit, onTypeChange }) => {
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
                return {
                    ...prevData,
                    [name]: checked
                        ? [...currentValues, value]
                        : currentValues.filter(item => item !== value),
                };
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
            };
            onSubmit(payload);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-gradient-to-r from-green-50 to-green-100 shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold text-green-800 mb-6">Reservation Form</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {formFields.map((field) => (
                        <div key={field.name}>
                            <label htmlFor={field.name} className="block text-sm font-medium text-green-700 mb-1">
                                {field.labelText}
                            </label>
                            {field.type === 'select' ? (
                                <select
                                    className="w-full p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                                                className="mr-2 focus:ring-green-500 h-4 w-4 text-green-600 border-green-300 rounded"
                                            />
                                            <label htmlFor={`${field.name}-${option.value}`} className="text-sm text-green-700">
                                                {option.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            ) : field.type !== 'empty' && (
                                <input
                                    type={field.type}
                                    className="w-full p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    name={field.name}
                                    value={formData[field.name] || ''}
                                    onChange={(e) => handleChange(e, field)}
                                    min={field.min}
                                    max={field.max}
                                />
                            )}
                            {errors[field.name] && (
                                <p className="text-red-600 text-sm mt-1">{errors[field.name]}</p>
                            )}
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Submit Reservation
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReservationForm;