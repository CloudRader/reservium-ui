import { useQuery } from 'react-query';
import axios from 'axios';
import { API_BASE_URL } from "../constants";

axios.defaults.withCredentials = true;

export const useEvents = (userId, activeTab, managerRoles) => {
    const fetchUserEvents = async () => {
        const response = await axios.get(`${API_BASE_URL}/users/me/events`);
        return response.data;
    };

    const fetchManagedEvents = async (eventState) => {
        // If no manager roles, return empty array
        if (!managerRoles || managerRoles.length === 0) {
            return [];
        }

        // Fetch events filtered by event_state on the server side
        try {
            const response = await axios.get(`${API_BASE_URL}/events/get-by-user-roles`, {
                params: { event_state: eventState }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching managed events:', error);
            throw error;
        }
    };

    return useQuery(
        ['events', userId, activeTab],
        async () => {
            switch (activeTab) {
                case 'personal':
                    return fetchUserEvents();
                case 'not_approved':
                case 'update_requested':
                case 'confirmed':
                case 'canceled':
                    // Pass event_state to API for server-side filtering
                    return fetchManagedEvents(activeTab);
                default:
                    return fetchUserEvents();
            }
        },
        {
            enabled: !!userId,
            keepPreviousData: true,
            staleTime: 10000
        }
    );
}; 