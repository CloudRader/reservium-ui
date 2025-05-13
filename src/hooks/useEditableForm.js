import { useEffect, useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

const useEditableForm = (initialData, updateUrl, fetchUrl, initialEditMode = false) => {
    const [isEditing, setIsEditing] = useState(initialEditMode);
    const [editedData, setEditedData] = useState(initialData);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(fetchUrl);
                const data = response.data;
                setEditedData(data);
            } catch (err) {
                setMessage({ type: 'error', text: 'Failed to fetch calendar data. Please try again.' });
            } finally {
                setLoading(false);
            }
        };

        if (fetchUrl) {
            fetchData();
        }
    }, [fetchUrl]);


    const handleEdit = () => {
        setIsEditing(true);
        setMessage(null);
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(updateUrl, editedData);
            console.log("Update successful:", response.data);
            setIsEditing(false);
            setMessage({ type: 'success', text: 'Update successful!' });
        } catch (error) {
            console.error("Failed to update:", error);
            setMessage({ type: 'error', text: 'Failed to update. Please try again.' });
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedData(initialData);
        setMessage(null);
    };

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;

        // Special handling for lockers_id
        if (name === 'lockers_id') {
            // Only allow numbers and commas
            const sanitizedValue = value.replace(/[^0-9,]/g, '');

            // Split by comma and convert to numbers
            const lockersArray = sanitizedValue
                .split(',')
                .map(id => id.trim())
                .filter(id => id !== '')
                .map(id => parseInt(id))
                .filter(id => !isNaN(id));

            setEditedData(prevData => ({
                ...prevData,
                [name]: lockersArray
            }));
            return;
        }

        // Use the checked property for checkboxes, value for all other input types
        const newValue = type === 'checkbox' ? checked : value;

        setEditedData(prevData => ({
            ...prevData,
            [name]: newValue
        }));
    };

    const handleRulesChange = (ruleType, field, value) => {
        setEditedData(prevData => ({
            ...prevData,
            [ruleType]: {
                ...prevData[ruleType],
                [field]: value
            }
        }));
    };

    return {
        loading,
        isEditing,
        editedData,
        message,
        handleEdit,
        handleSave,
        handleCancel,
        handleChange,
        handleRulesChange,
    };
};

export default useEditableForm;