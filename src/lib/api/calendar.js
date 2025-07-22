import axios from "axios";
import { serverURL } from "../../constants/Constants";
import { parseCalendarData } from "../normalize/calendar";

axios.defaults.withCredentials = true;

export async function getPublicCalendarData() {
    const response = await axios.get(`${serverURL}/reservation_services/services/public`);
    return parseCalendarData(response.data);
}
