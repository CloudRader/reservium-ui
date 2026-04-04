import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '@constants';
import { API_ENDPOINTS } from '@config/apiEndpoints';

/**
 * Hook to fetch mini services for a given service
 * @param {string} serviceId - The ID of the service
 * @returns {Object} { miniServices, isLoading, error }
 */
export const useMiniServices = (serviceId) => {
    const [miniServices, setMiniServices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!serviceId) return;

        const fetchMiniServices = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(
                    `${API_BASE_URL}${API_ENDPOINTS.SERVICES.GET_MINI_SERVICES(serviceId)}`
                );
                setMiniServices(response.data);
            } catch (err) {
                console.error('Error fetching mini services:', err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMiniServices();
    }, [serviceId]);

    return { miniServices, isLoading, error };
};
