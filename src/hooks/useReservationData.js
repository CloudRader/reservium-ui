import { useQuery } from 'react-query';
import axios from 'axios';
import { API_BASE_URL } from "../constants";
axios.defaults.withCredentials = true;

export function useReservationData(isLoggedIn) {
    const fetchData = async () => {
        try {
            let response = null;
            if (isLoggedIn) {
                response = await axios.get(`${API_BASE_URL}/reservation_services/?include_removed=true`);
            } else {
                response = await axios.get(`${API_BASE_URL}/reservation_services/services/public`);
            }

            const servicesData = response.data.map(info => ({
                wikiLink: info.web,
                linkName: info.alias,
                serviceName: info.name,
                contact_mail: info.contact_mail,
                public: info.public,
                id: info.id,
                reservation_types: info.calendars.map(calendar => calendar.reservation_type),
                calendarIds: info.calendars.reduce((acc, calendar) => {
                    acc[calendar.reservation_type] = calendar.id;
                    return acc;
                }, {}),
                lockers_id: info.lockers_id.join(',') || '',
                ...info
            }));

            const calendarsData = response.data.reduce((acc, info) => {
                acc[`${info.alias}`] = info.calendars.map((calendar) => ({
                    googleCalendarId: calendar.id,
                    className: calendar.reservation_type,
                    backgroundColor: calendar.color,
                    borderColor: calendar.color,
                    deleted_at: calendar.deleted_at,
                }));
                return acc;
            }, {});

            const miniServicesData = response.data.reduce((acc, info) => {
                acc[`${info.alias}`] = info.mini_services.map((miniService) => ({
                    id: miniService.id,
                    name: miniService.name,
                    reservationServiceId: miniService.reservation_service_id,
                    lockers_id: miniService.lockers_id.join(',') || '',
                    ...miniService
                }));
                return acc;
            }, {});

            return { services: servicesData, calendars: calendarsData, miniServices: miniServicesData };
        } catch (error) {
            throw new Error('Failed to fetch reservation data');
        }
    };

    return useQuery(['reservationData', isLoggedIn], fetchData,
        {
            keepPreviousData: true,
            enabled: true,
            staleTime: 5 * 60 * 1000, // 5 minutes
            cacheTime: 30 * 60 * 1000, // 30 minutes
            retry: 1,
            retryDelay: 1000,
        }
    );
}