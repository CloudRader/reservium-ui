import {useQuery} from 'react-query';
import axios from 'axios';
import constants from "../Constants";

export async function fetchReservationData() {
    axios.defaults.withCredentials = true;
    const response = await axios.get(`${constants.serverURL}/reservation_services/`);
    const data = response.data;

    const services = data.map(info => ({
        wikiLink: info.web,
        linkName: info.alias,
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

    const calendars = data.reduce((acc, info) => {
        acc[`${info.alias}`] = info.calendars.map((calendar) => ({
            googleCalendarId: calendar.id,
            className: calendar.reservation_type,
            backgroundColor: calendar.color,
            borderColor: calendar.color,
        }));
        return acc;
    }, {});

    const miniServices = data.reduce((acc, info) => {
        acc[`${info.alias}`] = info.mini_services.map((miniService) => ({
            id: miniService.id,
            name: miniService.name,
            reservationServiceId: miniService.reservation_service_id,
        }));
        return acc;
    }, {});

    return {services, calendars, miniServices};
}

export function useReservationData(isLoggedIn) {
    return useQuery('reservationData', fetchReservationData, {
        enabled: isLoggedIn, // Only run the query if isLoggedIn is true
        staleTime: Infinity, // This data doesn't change often, so we can cache it indefinitely
        cacheTime: 1000 * 60 * 60, // Cache for 1 hour
    });
}