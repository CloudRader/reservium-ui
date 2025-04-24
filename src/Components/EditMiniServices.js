import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import EditTable from "./EditTable";
import constants from "../Constants";

axios.defaults.withCredentials = true;

const fetchCalendarsForService = async (serviceId) => {
    try {
        const response =
            await axios.get(`${constants.serverURL}/mini_services/reservation_service/${serviceId}?include_removed=true`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch calendars for this service');
    }

};

const EditMiniServices = ({ serviceId, serviceName }) => {
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
            refetchOnWindowFocus: false,
        }
    );

    return (
        <EditTable name={'Mini Services'}
            data={data}
            nameAtr={'name'}
            idAtr={'id'}
            editLink={`/manager/edit-mini-service/${serviceName}/`}
            addLink={`/manager/add-mini-service/${serviceName}`}
            viewLink={`/manager/view-mini-service/${serviceName}/`}
            deleteLink={`/mini_services/`}
            retrieveLink={`/mini_services/retrieve_deleted/`}
        />
    );
};

export default EditMiniServices;