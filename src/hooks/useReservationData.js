import { useQuery } from 'react-query';
import axios from 'axios';
import { API_BASE_URL } from '../constants';
import { transformService, transformCalendars } from '../utils/reservationDataTransformers';
import { useKeycloak } from './useKeycloak';

export function useReservationData() {
    const { isLoggedIn } = useKeycloak();
    const fetchData = async () => {
        try {
            let response;
            if (isLoggedIn) {
                response = await axios.get(`${API_BASE_URL}/reservation-services`);
            } else {
                response = await axios.get(`${API_BASE_URL}/reservation-services/public`);
            }

            const servicesData = response.data.map((info) =>
                transformService(info, info.calendars, {
                    includeLockersId: true,
                    includeAllFields: true,
                })
            );

            const calendarsData = response.data.reduce((acc, info) => {
                acc[info.alias] = transformCalendars(info.calendars, {
                    includeDeletedAt: true,
                });
                return acc;
            }, {});

            const miniServicesData = response.data.reduce((acc, info) => {
                acc[info.alias] = (info.mini_services || []).map((miniService) => ({
                    id: miniService.id,
                    name: miniService.name,
                    reservationServiceId: miniService.reservation_service_id,
                    lockers_id: (miniService.lockers_id || []).join(',') || '',
                    ...miniService,
                }));
                return acc;
            }, {});

            return {
                services: servicesData,
                calendars: calendarsData,
                miniServices: miniServicesData,
            };
        } catch (error) {
            throw new Error('Failed to fetch reservation data');
        }
    };

    return useQuery('reservationData', fetchData,
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
