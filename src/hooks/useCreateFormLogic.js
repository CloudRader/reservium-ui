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
            if (type === 'checkbox') {
                return { ...prevData, [name]: checked };
            } else {
                return { ...prevData, [name]: value };
            }
        });
    }, []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        axios.post(submitUrl, formData)
            .then(() => {
                setMessage({ type: 'success', text: 'Operation completed successfully!' });
                setFormData({});
                if (onSubmitSuccess) onSubmitSuccess();
            })
            .catch((error) => {
                console.error('Error:', error);
                setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
            });
    }, [formData, submitUrl, onSubmitSuccess]);

    const renderField = useCallback((field) => {
        const commonProps = {
            name: field.name,
            value: formData[field.name] || '',
            onChange: handleChange,
            className: "w-full p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        };

        switch (field.type) {
            case 'checkbox':
                return (
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            {...commonProps}
                            checked={formData[field.name] || false}
                            className="mr-2 focus:ring-green-500 h-4 w-4 text-green-600 border-green-300 rounded"
                        />
                        <label htmlFor={field.name} className="text-sm text-green-700">
                            {field.options[0].label}
                        </label>
                    </div>
                );
            default:
                return (
                    <input
                        type={field.type}
                        {...commonProps}
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