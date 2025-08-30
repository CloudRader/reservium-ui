import { useQuery } from 'react-query';
import axios from 'axios';
import { options } from '@fullcalendar/core/preact.js';

axios.defaults.withCredentials = true;

export const useEvents = (userId, activeTab, managerRoles) => {
    const fetchUserEvents = async () => {
        const response = await axios.get(`${API_BASE_URL}/users/me/events`);
        return response.data;
    };

    const fetchManagedEvents = async () => {
        // If no manager roles, return empty array
        if (!managerRoles || managerRoles.length === 0) {
            return [];
        }

        // Fetch events for each manager role and combine results
        const eventsPromises = managerRoles.map(role =>
            // axios.get(`${API_BASE_URL}/events/state/reservation_service/${role}?event_state=${activeTab}`)
            axios.get(`${API_BASE_URL}/events/get-by-user-roles`)
        );

        try {
            const responses = await Promise.all(eventsPromises);
            // Combine all events into a single array
            const allEvents = responses.flatMap(response => response.data);
            return allEvents;
        } catch (error) {
            console.error('Error fetching managed events:', error);
            throw error;
        }
    };

    return useQuery(
        ['events', userId, activeTab],
        () => {
            switch (activeTab) {
                case 'personal':
                    return fetchUserEvents();
                case 'not_approved' || 'update_requested':
                    return fetchManagedEvents();
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