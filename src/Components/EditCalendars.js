
import React from 'react';
import { useQuery } from 'react-query';
import EditTable from "./EditTable";
import axios from 'axios';
import constants from "../Constants";
axios.defaults.withCredentials = true;

const fetchCalendarsForService = async (serviceId) => {
    try {
        const response = await axios.get(`${constants.serverURL}/calendars/reservation_service/${serviceId}?include_removed=true`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch calendars for this service');
    }
};

const EditCalendars = ({ serviceId, serviceName }) => {

    const {
        data,
        isLoading,
        isError,
        error
    } = useQuery(
        ['serviceCalendars', serviceId],
        () => fetchCalendarsForService(serviceId),
        {
            enabled: !!serviceId,
        }
    );

    return (
        data && <EditTable
            name={'Calendars'}
            data={data}
            nameAtr={'reservation_type'}
            idAtr={'id'}
            editLink={`/manager/edit-calendar/${serviceName}/`}
            addLink={`/manager/add-calendar/${serviceName}`}
            viewLink={`/manager/view-calendar/${serviceName}/`}
            deleteLink={`/calendars/`}
            retrieveLink={`/calendars/retrieve_deleted/`}
        />
    );
};

export default EditCalendars;