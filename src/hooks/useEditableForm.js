import {useEffect, useState} from 'react';
import axios from 'axios';
import constants from "../Constants";

axios.defaults.withCredentials = true;

const useEditableForm = (initialData, updateUrl, fetchUrl) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState(initialData);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(true);


    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(fetchUrl);
    //             const data = response.data;
    //             setEditedData(data);
    //         } catch (err) {
    //             setMessage({ type: 'error', text: 'Failed to fetch calendar data. Please try again.' });
    //         } finally {
    //             setLoading(false); // Stop loading
    //         }
    //     };
    //
    //     fetchData();
    // }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(fetchUrl);
            const data = response.data;
            setEditedData(data);
        } catch (err) {
            setMessage({type: 'error', text: 'Failed to fetch calendar data. Please try again.'});
        } finally {
            setLoading(false); // Stop loading
        }
    };

    if(fetchUrl) {
        setLoading(true);
        fetchData();
    }

    const handleEdit = () => {
        setIsEditing(true);
        setMessage(null);
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(updateUrl, editedData);
            console.log("Update successful:", response.data);
            setIsEditing(false);
            setMessage({type: 'success', text: 'Update successful!'});
        } catch (error) {
            console.error("Failed to update:", error);
            setMessage({type: 'error', text: 'Failed to update. Please try again.'});
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedData(initialData);
        setMessage(null);
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setEditedData(prevData => ({
            ...prevData,
            [name]: value
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