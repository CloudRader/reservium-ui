import { useQuery } from 'react-query';
import axios from 'axios';
import { API_BASE_URL } from '../constants';
import {
    isServiceValid,
    getActiveCalendars,
    transformService,
    transformCalendars,
} from '../utils/reservationDataTransformers';

const transformData = (data) => {
    const result = data.reduce(
        (acc, serviceInfo) => {
            if (!isServiceValid(serviceInfo)) {
                return acc;
            }

            const activeCalendars = getActiveCalendars(serviceInfo.calendars);

            if (activeCalendars.length === 0) {
                return acc;
            }

            acc.services.push(
                transformService(serviceInfo, activeCalendars, {
                    includeDeletedAt: true,
                })
            );
            acc.calendars[serviceInfo.alias] = transformCalendars(activeCalendars);

            return acc;
        },
        { services: [], calendars: {} }
    );

    return result;
};

export const useViewCalendarData = () => {
    const queryResult = useQuery(
        'viewCalendarData',
        async () => {
            const response = await axios.get(
                `${API_BASE_URL}/reservation-services/public`
            );
            return transformData(response.data);
        },
        {
            enabled: true,
            staleTime: 5 * 60 * 1000,
            cacheTime: 30 * 60 * 1000,
            keepPreviousData: true,
            retry: 2,
            retryDelay: 1000,
        }
    );

    // Destructure data and return services/calendars directly
    const { data, ...rest } = queryResult;
    const { services = [], calendars = {} } = data || {};

    return {
        ...rest,
        services,
        calendars,
    };
}; 
