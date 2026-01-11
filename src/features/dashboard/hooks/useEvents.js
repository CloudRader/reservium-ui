import { useFetch } from '@features/shared';
import { API_ENDPOINTS } from '@config/apiEndpoints';

/**
 * Unified hook for fetching events with optional pagination
 * Handles both personal events and manager role-based events
 *
 * @param {Object} options - Configuration options
 * @param {number} options.userId - User ID
 * @param {string} options.activeTab - Active tab / event state filter
 * @param {Array} options.managerRoles - User's manager roles (for manager tabs)
 * @param {number} options.page - Page number for pagination (for personal tab)
 * @param {number} options.limit - Items per page for pagination (for personal tab)
 * @param {boolean} options.past - Whether to fetch past events (for personal tab)
 * @returns {Object} React Query result
 */
export const useEvents = ({
    userId,
    activeTab,
    managerRoles = [],
    page = 1,
    limit = 10,
    past = false,
}) => {
    const isPersonalTab = activeTab === 'personal';
    const hasManagerRoles = managerRoles && managerRoles.length > 0;

    // Determine which endpoint to use
    const endpoint = isPersonalTab
        ? API_ENDPOINTS.EVENTS.GET_USER_EVENTS
        : API_ENDPOINTS.EVENTS.GET_BY_USER_ROLES;

    // Build query params based on tab type
    const params = isPersonalTab
        ? { page, limit, past }
        : { event_state: activeTab, past: false };

    // Build query key
    const queryKey = isPersonalTab
        ? ['events-paginated', page, limit, past]
        : ['events', userId, activeTab];

    return useFetch(
        queryKey,
        endpoint,
        {
            params,
            enabled: isPersonalTab
                ? !!userId
                : !!userId && activeTab !== 'personal' && hasManagerRoles,
            keepPreviousData: true,
            staleTime: 1000,
            // For manager tabs without roles, return empty array
            select: (data) => {
                if (!isPersonalTab && !hasManagerRoles) {
                    return [];
                }
                return data;
            },
        }
    );
};

/**
 * Legacy export for backwards compatibility
 * @deprecated Use useEvents with options object instead
 */
export const useEventsWithPagination = (page = 1, limit = 10, isPersonalTab, past = false) => {
    return useEvents({
        userId: null, // Will be handled by enabled condition
        activeTab: isPersonalTab ? 'personal' : 'not_approved',
        page,
        limit,
        past,
    });
};
