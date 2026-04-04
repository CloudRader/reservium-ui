import { useQuery } from 'react-query';
import axios from 'axios';
import { API_BASE_URL } from '@constants';

/**
 * Universal fetch hook using React Query
 *
 * @param {string|Array} queryKey - React Query key for caching
 * @param {string} endpoint - API endpoint (will be appended to API_BASE_URL)
 * @param {Object} options - Configuration options
 * @param {Object} options.params - URL query parameters (e.g., { include_removed: true, page: 1 })
 * @param {boolean} options.enabled - Whether query should run (default: true)
 * @param {number} options.staleTime - Time in ms before data is considered stale (default: 0)
 * @param {number} options.cacheTime - Time in ms to keep unused data in cache (default: 5 minutes)
 * @param {boolean} options.refetchOnWindowFocus - Refetch when window regains focus (default: true)
 * @param {boolean} options.keepPreviousData - Keep previous data while fetching (default: true)
 * @param {number} options.retry - Number of retry attempts (default: 1)
 * @param {number} options.retryDelay - Delay between retries in ms (default: 1000)
 * @param {Function} options.select - Transform/select data before returning
 * @param {Function} options.onSuccess - Callback on successful fetch
 * @param {Function} options.onError - Callback on error
 *
 * @returns {Object} React Query result object { data, isLoading, isError, error, refetch, ... }
 *
 * @example
 * // Fetch with deleted items
 * const { data, isLoading } = useFetch(
 *   ['services'],
 *   '/reservation-services/',
 *   { params: { include_removed: true } }
 * );
 *
 * @example
 * // Fetch without params
 * const { data, isLoading } = useFetch(
 *   ['calendars', serviceId],
 *   `/reservation-services/${serviceId}/calendars`
 * );
 *
 * @example
 * // Fetch with custom options
 * const { data, isLoading } = useFetch(
 *   ['events'],
 *   '/events',
 *   {
 *     params: { status: 'confirmed', limit: 10 },
 *     staleTime: 5 * 60 * 1000, // 5 minutes
 *     enabled: Boolean(userId),
 *     select: (data) => data.events,
 *   }
 * );
 */
const useFetch = (
    queryKey,
    endpoint,
    {
        params = {},
        enabled = true,
        staleTime = 0,
        cacheTime = 5 * 60 * 1000,
        refetchOnWindowFocus = true,
        keepPreviousData = true,
        retry = 1,
        retryDelay = 1000,
        select,
        onSuccess,
        onError,
    } = {}
) => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
                params,
            });
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch data';
            throw new Error(errorMessage);
        }
    };

    return useQuery(queryKey, fetchData, {
        enabled,
        staleTime,
        cacheTime,
        refetchOnWindowFocus,
        keepPreviousData,
        retry,
        retryDelay,
        select,
        onSuccess,
        onError,
    });
};

export default useFetch;
