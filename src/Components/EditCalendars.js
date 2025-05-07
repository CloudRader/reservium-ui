import React from 'react';
import EditTable from "./EditTable";
import useFetchWithDeleted from "../hooks/useFetchWithDeleted";

const EditCalendars = ({ serviceId, serviceName }) => {
    const {
        data,
        isLoading,
        isError,
        error
    } = useFetchWithDeleted(
        ['serviceCalendars', serviceId],
        `/calendars/reservation_service/${serviceId}`,
        !!serviceId
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