import axios from 'axios';
import constants from '../../constants/Constants';

export const fetchAdditionalServices = async (calendarId) => {
    const { data } = await axios.get(`${constants.serverURL}/calendars/mini_services/${calendarId}`);
    return data.map(service => ({ value: service, label: service }));
}; 