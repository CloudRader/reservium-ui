import { useQuery } from 'react-query';
import axios from 'axios';
import { API_BASE_URL } from '@constants';
import { API_ENDPOINTS } from '@config/apiEndpoints';
import { transformService, transformCalendars } from '@utils/reservationDataTransformers';
import { useKeycloak } from '@features/auth/hooks/useKeycloak';

/**
 * Hook to fetch reservation data
 *
 * Fetches services, calendars, and mini-services.
 * Uses authenticated or public endpoint based on login status.
 *
 * @param {Object} options - React Query options
 * @param {boolean} options.enabled - Whether to enable the query
 * @returns {UseQueryResult}
 */
export const useReservationData = (options = {}) => {
    const { isLoggedIn } = useKeycloak();

    const fetchData = async () => {
        // Determine endpoint based on auth status
        const endpoint = isLoggedIn
            ? `${API_BASE_URL}${API_ENDPOINTS.SERVICES.GET_ALL}`
            : `${API_BASE_URL}${API_ENDPOINTS.SERVICES.GET_ALL_PUBLIC}`;

        try {
            // For managers, include soft-deleted items
            const response = await axios.get(endpoint, {
                params: isLoggedIn ? { include_removed: true } : {}
            });

            const servicesData = response.data.map((info) =>
                transformService(info, info.calendars, {
                    includeLockersId: true,
                    includeAllFields: true,
                })
            );

            const calendarsData = response.data.reduce((acc, info) => {
                acc[info.alias] = transformCalendars(info.calendars, {
                    includeDeletedAt: true,
                    includeAllFields: true, // Include all fields for manager panel
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
            console.error('Failed to fetch reservation data:', error);
            throw new Error('Failed to fetch reservation data');
        }
    };

    return useQuery(
        ['reservationData', isLoggedIn],
        fetchData,
        {
            keepPreviousData: true,
            enabled: options.enabled ?? true,
            staleTime: 5 * 60 * 1000, // 5 minutes
            cacheTime: 30 * 60 * 1000, // 30 minutes
            retry: 1,
            retryDelay: 1000,
        }
    );
}
