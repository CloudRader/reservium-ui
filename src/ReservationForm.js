import React, { useCallback, useState, useEffect } from 'react';

const ReservationForm = ({ formFields, onSubmit }) => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Initialize formData with default values
        const initialData = formFields.reduce((acc, field) => {
            if (field.defaultValue !== undefined) {
                acc[field.name] = field.defaultValue;
            }
            return acc;
        }, {});
        setFormData(initialData);
        console.log('set data first time ')

    }, [formFields]);

    const validateField = useCallback((field, value) => {
        if (field.validation && !field.validation(value)) {
            return `Invalid value for ${field.labelText}`;
        }
        return null;
    }, []);

    const handleChange = useCallback((e, field) => {
        const { name, value, type, checked } = e.target;
        let updatedValue = value;

        if (field.type === 'time') {
            // Ensure the value is in HH:MM format
            const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
            if (!timeRegex.test(value)) {
                // If not in correct format, don't update the state
                return;
            }
        }

        if (field.type === 'date' || field.type === 'time') {
            const error = validateField(field, value);
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: error
            }));
            if (error) return;
        }
        console.log('set data second1111 time ')
        setFormData(prevData => {
            if (type === 'checkbox') {
                return {
                    ...prevData,
                    [name]: checked
                        ? [...(prevData[name] || []), value]
                        : (prevData[name] || []).filter(item => item !== value),
                };
            } else {
                return {...prevData, [name]: updatedValue};
            }
        });
    }, [validateField]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        const validationErrors = formFields.reduce((acc, field) => {
            const error = validateField(field, formData[field.name]);
            if (error) acc[field.name] = error;
            return acc;
        }, {});

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
    }, [formData, formFields, onSubmit, validateField]);

    const renderField = useCallback((field) => {
        const commonProps = {
            name: field.name,
            value: formData[field.name] || '',
            onChange: (e) => handleChange(e, field),
            className: "w-full p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        };

        switch (field.type) {
            case 'select':
                return (
                    <select {...commonProps}>
                        <option value="">Select an option</option>
                        {field.options.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                );
            case 'checkbox':
                return (
                    <div className="space-y-2">
                        {field.options.map((option) => (
                            <div key={option.value} className="flex items-center">
                                <input
                                    type="checkbox"
                                    {...commonProps}
                                    value={option.value}
                                    id={`${field.name}-${option.value}`}
                                    checked={(formData[field.name] || []).includes(option.value)}
                                    className="mr-2 focus:ring-green-500 h-4 w-4 text-green-600 border-green-300 rounded"
                                />
                                <label htmlFor={`${field.name}-${option.value}`} className="text-sm text-green-700">
                                    {option.label}
                                </label>
                            </div>
                        ))}
                    </div>
                );
            case 'empty':
                return null;
            default:
                return (
                    <input
                        type={field.type}
                        {...commonProps}
                        min={field.min}
                        max={field.max}
                    />
                );
        }
    }, [formData, handleChange]);

    return (
        <div className="max-w-1xl bg-gradient-to-r from-green-50 to-green-100 shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-green-800 mb-6">Reservation Form</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {formFields.map((field) => (
                    <div key={field.name}>
                        <label htmlFor={field.name} className="block text-sm font-medium text-green-700 mb-1">
                            {field.labelText}
                        </label>
                        {renderField(field)}
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
    );
};

export default ReservationForm;