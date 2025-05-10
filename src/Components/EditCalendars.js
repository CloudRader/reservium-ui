import React from 'react';
import EditTable from "./EditTable";
import useFetchWithDeleted from "../hooks/useFetchWithDeleted";
import PulsatingLoader from "./PulsatingLoader";

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

    if (isLoading) {
        return <PulsatingLoader />;
    }

    if (isError) {
        return <div>Error: {error?.message || 'Something went wrong'}</div>;
    }

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