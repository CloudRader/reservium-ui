import axios from 'axios';
import { API_BASE_URL } from '../../constants';

export const fetchAdditionalServices = async (calendarId) => {
    const { data } = await axios.get(`${API_BASE_URL}/calendars/mini_services/${calendarId}`);
    return data.map(service => ({ value: service, label: service }));
}; 