import { useQuery } from 'react-query';
import axios from 'axios';
import { API_BASE_URL } from "../constants";

const useFetchWithDeleted = (queryKey, fetchUrl, enabled = true) => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}${fetchUrl}?include_removed=true`);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch data from ${fetchUrl}`);
        }
    };

    return useQuery(
        queryKey,
        fetchData,
        {
            enabled,
            staleTime: 0,
            refetchOnWindowFocus: true,
            keepPreviousData: true,
        }
    );
};

export default useFetchWithDeleted; 