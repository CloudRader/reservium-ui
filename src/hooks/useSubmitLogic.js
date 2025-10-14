import { useState, useCallback } from 'react';
import axios from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../constants";
axios.defaults.withCredentials = true;

const useSubmitLogic = (service, allService) => {
    const [errorMessages, setErrorMessage] = useState({});
    const navigate = useNavigate()

    const mutation = useMutation(
        (formData) => axios.post(`${API_BASE_URL}/events/`, formData),
        {
            onSuccess: (response, formData) => {
                if (response.status === 201) {
                    setErrorMessage({});
                    navigate('/success', {
                        state: {
                            ...response.data,
                            contactMail: service.contact_mail,
                            wikiLink: service.wikiLink,
                            allService: allService,
                            serviceName: service.serviceName,
                            ...formData
                        }
                    });
                } else {
                    setErrorMessage({ general: `Cannot create a reservation. ${response.data.message}` });
                }
            },
            onError: (error) => {
                if (error.response?.status === 401)
                    navigate("/logout");

                // Extract error message from server response
                let errorMsg = 'Cannot create a reservation, try again later.';
                if (error.response?.data?.detail?.[0]?.msg) {
                    errorMsg = error.response.data.detail[0].msg;
                } else if (error.response?.data?.message) {
                    errorMsg = error.response.data.message;
                } else if (error.response?.data?.detail) {
                    errorMsg = error.response.data.detail;
                }

                setErrorMessage({ general: errorMsg });
            }
        }
    );

    const handleSubmit = useCallback((formData) => {
        mutation.mutate(formData);
    }, [mutation]);

    return {
        errorMessages,
        setErrorMessage,
        handleSubmit,
        isSubmitting: mutation.isLoading,
        isSuccess: mutation.isSuccess,
        isError: mutation.isError,
        mutationData: mutation.data,
    };
};

export default useSubmitLogic;