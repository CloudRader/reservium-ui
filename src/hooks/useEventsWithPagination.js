import { useQuery } from 'react-query';
import axios from 'axios';
import { API_BASE_URL } from '../constants';

axios.defaults.withCredentials = true;

export const useEventsWithPagination = (page = 1, limit = 10, past = false) => {
  const fetchEvents = async () => {
    const response = await axios.get(`${API_BASE_URL}/users/me/events`, {
      params: {
        page,
        limit,
        past,
      },
    });
    return response.data;
  };

  return useQuery(['events-paginated', page, limit, past], fetchEvents, {
    keepPreviousData: true,
    staleTime: 10000,
  });
};
