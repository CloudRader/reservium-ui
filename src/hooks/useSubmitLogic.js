import { useState, useCallback } from 'react';
import axios from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;

const useSubmitLogic = (service, allService) => {
    const [errorMessages, setErrorMessage] = useState({});
    const navigate = useNavigate()

    const mutation = useMutation(
        (formData) => axios.post(
            `${API_BASE_URL}/events/`,
            formData,
            {
                headers: {
                    Authorization: `Bearer some-token`,
                },
            }
            ),
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
                setErrorMessage({ general: 'Cannot create a reservation, try again later.' });
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