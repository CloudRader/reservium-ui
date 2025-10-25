import { useQuery } from 'react-query';
import axios from 'axios';
import { API_BASE_URL } from '../constants';

axios.defaults.withCredentials = true;

export const useEventsWithPagination = (page = 1, limit = 10, isPersonalTab, past = false) => {
  const fetchEvents = async () => {
    const response = await axios.get(`${API_BASE_URL}/users/me/events`, {
      params: {
        page,
        limit,
        past,
      },
    });

    // Return raw array as provided by API
    return response.data;
  };

  return useQuery(['events-paginated', page, limit, past], fetchEvents, {
    enabled: isPersonalTab,
    staleTime: 1000,
  });
};
