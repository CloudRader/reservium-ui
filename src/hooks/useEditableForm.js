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
            // Format lockers_id to array before saving
            const dataToSave = {
                ...editedData,
                ...(editedData.lockers_id ?
                    {
                        lockers_id: editedData.lockers_id
                            .split(',')
                            .map(id => parseInt(id.trim()))
                            .filter(id => !isNaN(id)),
                    } : {}
                ),
                ...(editedData.access_group ?
                    {
                        access_group: editedData.access_group !== '' ? editedData.access_group : null
                    } : {}
                ),
                ...(editedData.room_id ?
                    {
                        room_id: editedData.room_id !== '' ? editedData.room_id : null
                    } : {}
                )
            };

            await axios.put(updateUrl, dataToSave);
            setIsEditing(false);
            setMessage({ type: 'success', text: 'Update successful!' });
        } catch (error) {
            if (error.response && error.response.data && Array.isArray(error.response.data.detail)) {
                const errorDetails = error.response.data.detail
                    .map(detail => `${detail.loc.join('.')} - ${detail.msg}`)
                    .join(', ');
                setMessage({ type: 'error', text: `Failed to update: ${errorDetails}` });
            } else {
                setMessage({ type: 'error', text: 'Failed to update. Please try again.' });
            }
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedData(initialData);
        setMessage(null);
    };

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;

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