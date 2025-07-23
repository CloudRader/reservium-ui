import { useQuery } from 'react-query';
import axios from 'axios';
import constants from '../constants/Constants';
axios.defaults.withCredentials = true;

export const useViewCalendarData = () => {
    return useQuery('viewCalendarData', async () => {
        const response = await axios.get(`${constants.serverURL}/reservation_services/services/public`);
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

        return { services, calendars }
    }, {
        staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
        cacheTime: 30 * 60 * 1000, // Keep data in cache for 30 minutes
        keepPreviousData: true,
    });
}; 