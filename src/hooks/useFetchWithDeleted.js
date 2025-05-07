import { useQuery } from 'react-query';
import axios from 'axios';
import constants from "../Constants";

axios.defaults.withCredentials = true;

const useFetchWithDeleted = (queryKey, fetchUrl, enabled = true) => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`${constants.serverURL}${fetchUrl}?include_removed=true`);
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
        }
    );
};

export default useFetchWithDeleted; 