import axios from "axios";
import { parseCalendarData } from "../normalize/calendar";
import { API_BASE_URL } from "../../constants";

axios.defaults.withCredentials = true;

export async function getPublicCalendarData() {
    const response = await axios.get(`${API_BASE_URL}/reservation-services/public`);
    return parseCalendarData(response.data);
}
