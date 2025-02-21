import { useQuery } from 'react-query';
import axios from 'axios';
import constants from "../Constants";
axios.defaults.withCredentials = true;

export function useReservationData(isLoggedIn) {
    const fetchData = async () => {
        try {
            let response;
            if (isLoggedIn) {
                response = await axios.get(`${constants.serverURL}/reservation_services/services`);
            } else {
                response = await axios.get(`${constants.serverURL}/reservation_services/services/public`);
            }

            const data = response.data;

            const servicesData = data.map(info => ({
                wikiLink: info.web,
                linkName: isLoggedIn ? info.alias : 'view/' + info.alias,
                serviceName: info.name,
                contact_mail: info.contact_mail,
                public: info.public,
                deleted_at: info.deleted_at,
                id: info.id,
                reservation_types: info.calendars.map(calendar => calendar.reservation_type),
                calendarIds: info.calendars.reduce((acc, calendar) => {
                    acc[calendar.reservation_type] = calendar.id;
                    return acc;
                }, {})
            }));

            const calendarsData = data.reduce((acc, info) => {
                acc[`${info.alias}`] = info.calendars.map((calendar) => ({
                    googleCalendarId: calendar.id,
                    className: calendar.reservation_type,
                    backgroundColor: calendar.color,
                    borderColor: calendar.color,
                }));
                return acc;
            }, {});

            const miniServicesData = data.reduce((acc, info) => {
                acc[`${info.alias}`] = info.mini_services.map((miniService) => ({
                    id: miniService.id,
                    name: miniService.name,
                    reservationServiceId: miniService.reservation_service_id,
                }));
                return acc;
            }, {});

            return { services: servicesData, calendars: calendarsData, miniServices: miniServicesData };
        } catch (error) {
            throw new Error('Failed to fetch reservation data');
        }
    };

    return useQuery('reservationData', fetchData, {
        enabled: true,
        staleTime: Infinity,
        cacheTime: 1000 * 60 * 60,
    });
}