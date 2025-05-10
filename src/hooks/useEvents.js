import { useQuery } from 'react-query';
import axios from 'axios';
import constants from '../Constants';

axios.defaults.withCredentials = true;

export const useEvents = (userId, activeTab, reservationServiceId, eventState) => {
    const fetchUserEvents = async () => {
        const response = await axios.get(`${constants.serverURL}/events/user/${userId}`);
        return response.data;
    };

    const fetchManagedEvents = async () => {
        const response = await axios.get(
            `${constants.serverURL}/events/state/reservation_service/${reservationServiceId}?event_state=${eventState}`
        );
        return response.data;
    };

    return useQuery(
        ['events', userId, activeTab, reservationServiceId, eventState],
        () => {
            switch (activeTab) {
                case 'personal':
                    return fetchUserEvents();
                case 'managed':
                    return fetchManagedEvents();
                default:
                    return fetchUserEvents();
            }
        },
        {
            enabled: !!userId && (activeTab === 'personal' || (activeTab === 'managed' && !!reservationServiceId)),
            staleTime: 5 * 60 * 1000, // 5 minutes
            cacheTime: 30 * 60 * 1000, // 30 minutes
        }
    );
}; 