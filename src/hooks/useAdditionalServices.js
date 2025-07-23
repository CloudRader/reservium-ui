import { useQuery } from 'react-query';
import { fetchAdditionalServices } from '../lib/api/miniServices';

const useAdditionalServices = (reservationType, calendarIds) => {
    const { data: additionalServices = [] } = useQuery(
        ['additionalServices', reservationType, calendarIds[reservationType]],
        () => reservationType && calendarIds[reservationType] ? fetchAdditionalServices(calendarIds[reservationType]) : [],
        {
            enabled: !!reservationType && !!calendarIds[reservationType],
            keepPreviousData: true,
        }
    );
    return additionalServices;
};

export default useAdditionalServices; 