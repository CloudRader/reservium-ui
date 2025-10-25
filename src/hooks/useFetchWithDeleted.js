import { useQuery } from 'react-query';
import axios from 'axios';
import { API_BASE_URL } from "../constants";

axios.defaults.withCredentials = true;

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
            refetchOnWindowFocus: false,
            keepPreviousData: true,
        }
    );
};

export default useFetchWithDeleted; 