import { useState, useCallback } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

const useCreateFormLogic = (initialFields, submitUrl, onSubmitSuccess) => {
    const [formFields, setFormFields] = useState(initialFields);
    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState(null);

    const handleChange = useCallback((e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => {
            const updateNestedField = (obj, path, val) => {
                const [head, ...rest] = path;
                if (rest.length === 0) {
                    return { ...obj, [head]: val };
                }
                return {
                    ...obj,
                    [head]: updateNestedField(obj[head] || {}, rest, val)
                };
            };

            const [groupName, fieldName] = name.split('.');
            if (groupName && fieldName) {
                // Handle nested fields
                return updateNestedField(prevData, [groupName, fieldName], type === 'checkbox' ? checked : value);
            } else {
                // Handle top-level fields
                if (type === 'checkbox') {
                    const field = formFields.find(f => f.name === name) ||
                        formFields.flatMap(f => f.fields || []).find(f => f.name === name);

                    if (field && field.type === 'multiCheckbox') {
                        // Handle multiCheckbox
                        const currentValues = Array.isArray(prevData[name]) ? prevData[name] : [];
                        if (checked) {
                            return { ...prevData, [name]: [...currentValues, value] };
                        } else {
                            return { ...prevData, [name]: currentValues.filter(v => v !== value) };
                        }
                    } else {
                        // Handle regular checkbox
                        return { ...prevData, [name]: checked };
                    }
                } else {
                    return { ...prevData, [name]: value };
                }
            }
        });
    }, [formFields]);

    const handleSubmit = useCallback((requestData) => {
        axios.post(submitUrl, requestData)
            .then(() => {
                setMessage({ type: 'success', text: 'Operation completed successfully!' });
                setFormData({});
                if (onSubmitSuccess) onSubmitSuccess();
            })
            .catch((error) => {
                console.error('Error:', error);
                setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
            });
    }, [submitUrl, onSubmitSuccess]);

    const renderField = useCallback((field) => {
        const commonProps = {
            name: field.name,
            onChange: handleChange,
            className: "w-full p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        };

        const getValue = (name) => {
            const [groupName, fieldName] = name.split('.');
            return groupName && fieldName ? formData[groupName]?.[fieldName] : formData[name];
        };

        switch (field.type) {
            case 'checkbox':
                return (
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            {...commonProps}
                            checked={getValue(field.name) || false}
                            className="mr-2 focus:ring-green-500 h-4 w-4 text-green-600 border-green-300 rounded"
                        />
                        <label htmlFor={field.name} className="text-sm text-green-700">
                            {field.options[0].label}
                        </label>
                    </div>
                );
            case 'multiCheckbox':
                const selectedValues = getValue(field.name) || [];
                return (
                    <div className="space-y-2">
                        {field.options.map(option => (
                            <div key={option.value} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`${field.name}-${option.value}`}
                                    {...commonProps}
                                    value={option.value}
                                    checked={selectedValues.includes(option.value)}
                                    className="mr-2 focus:ring-green-500 h-4 w-4 text-green-600 border-green-300 rounded"
                                />
                                <label htmlFor={`${field.name}-${option.value}`} className="text-sm text-green-700">
                                    {option.label}
                                </label>
                            </div>
                        ))}
                    </div>
                );
            default:
                return (
                    <input
                        type={field.type}
                        {...commonProps}
                        value={getValue(field.name) || ''}
                    />
                );
        }
    }, [formData, handleChange]);

    return {
        formFields,
        formData,
        message,
        setFormFields,
        handleChange,
        handleSubmit,
        renderField,
        setMessage
    };
};

export default useCreateFormLogic;