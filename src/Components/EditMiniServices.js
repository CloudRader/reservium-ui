import React from 'react';
import EditTable from "./EditTable";
import useFetchWithDeleted from "../hooks/useFetchWithDeleted";
import PulsatingLoader from "./ui/PulsatingLoader";
import ErrorMessage from "./ui/ErrorMessage";

const EditMiniServices = ({ serviceId, serviceName }) => {
    const {
        data,
        isLoading,
        isError,
        error,
        refetch
    } = useFetchWithDeleted(
        ['serviceCalendars', serviceId],
        `/mini_services/reservation_service/${serviceId}`,
        !!serviceId
    );

    if (isError) {
        return (
            <div className="container mx-auto px-4 py-8">
                <ErrorMessage
                    message={error?.message || 'Failed to load mini services'}
                    title="Error Loading Mini Services"
                    onRetry={refetch}
                />
            </div>
        );
    }

    return (
        <div className="relative">
            {isLoading && <PulsatingLoader />}
            {data && <EditTable
                name={'Mini Services'}
                data={data}
                nameAtr={'name'}
                idAtr={'id'}
                editLink={`/manager/edit-mini-service/${serviceName}/`}
                addLink={`/manager/add-mini-service/${serviceName}`}
                viewLink={`/manager/view-mini-service/${serviceName}/`}
                deleteLink={`/mini_services/`}
                retrieveLink={`/mini_services/retrieve_deleted/`}
                refetch={refetch}
            />}
        </div>
    );
};

export default EditMiniServices;