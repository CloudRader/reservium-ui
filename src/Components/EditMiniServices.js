import React from 'react';
import EditTable from "./EditTable";
import useFetchWithDeleted from "../hooks/useFetchWithDeleted";
import PulsatingLoader from "./ui/PulsatingLoader";

const EditMiniServices = ({ serviceId, serviceName }) => {
    const {
        data,
        isLoading,
        isError,
        error
    } = useFetchWithDeleted(
        ['serviceCalendars', serviceId],
        `/mini_services/reservation_service/${serviceId}`,
        !!serviceId
    );

    if (isLoading) {
        return <PulsatingLoader />;
    }

    if (isError) {
        return <div>Error: {error?.message || 'Something went wrong'}</div>;
    }

    return (
        data && <EditTable name={'Mini Services'}
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