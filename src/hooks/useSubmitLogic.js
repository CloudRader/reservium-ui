import { useState, useCallback } from 'react';
import axios from 'axios';
import { useMutation } from 'react-query';
import constants from '../Constants';
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;

const useSubmitLogic = (service) => {
    const [errorMessages, setErrorMessages] = useState({});
    const navigate = useNavigate()

    const mutation = useMutation(
        (formData) => axios.post(`${constants.serverURL}/events/create_event`, formData),
        {
            onSuccess: (response, formData) => {
                if (response.status === 201) {
                    setErrorMessages({});
                    navigate('/success', {
                        state: {
                            ...response.data,
                            contactMail: service.contact_mail,
                            wikiLink: service.wikiLink,
                            ...formData
                        }
                    });
                } else {
                    handleError({ general: `Cannot create a reservation. ${response.data.message}` });
                }
            },
            onError: (error) => {
                const errorMessage = error.response?.status === 401
                    ? { auth: 'Authentication failed. Please log out and log in again.' }
                    : { general: 'Cannot create a reservation, try again later.' };
                handleError(errorMessage);
            }
        }
    );

    const handleSubmit = useCallback((formData) => {
        mutation.mutate(formData);
    }, [mutation]);

    const handleError = useCallback((errorMessage) => {
        setErrorMessages(errorMessage);
    }, []);

    return {
        errorMessages,
        setErrorMessages,
        handleSubmit,
        handleError,
        isSubmitting: mutation.isLoading,
        isSuccess: mutation.isSuccess,
        isError: mutation.isError,
        mutationData: mutation.data,
    };
};

export default useSubmitLogic;