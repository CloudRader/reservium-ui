import React from 'react';
import EditTable from "./EditTable";
import useFetchWithDeleted from "../hooks/useFetchWithDeleted";
import PulsatingLoader from "./ui/PulsatingLoader";
import ErrorMessage from "./ui/ErrorMessage";

const EditCalendars = ({ serviceId, serviceName }) => {
    const {
        data,
        isLoading,
        isError,
        error,
        refetch
    } = useFetchWithDeleted(
        ['serviceCalendars', serviceId],
        `/calendars/reservation_service/${serviceId}`,
        !!serviceId
    );

    if (isError) {
        return (
            <div className="container mx-auto px-4 py-8">
                <ErrorMessage
                    message={error?.message || 'Failed to load calendars'}
                    title="Error Loading Calendars"
                    onRetry={refetch}
                />
            </div>
        );
    }

    return (
        <div className="relative">
            {isLoading && <PulsatingLoader />}
            {data && <EditTable
                name={'Calendars'}
                data={data}
                nameAtr={'reservation_type'}
                idAtr={'id'}
                editLink={`/manager/edit-calendar/${serviceName}/`}
                addLink={`/manager/add-calendar/${serviceName}`}
                viewLink={`/manager/view-calendar/${serviceName}/`}
                deleteLink={`/calendars/`}
                retrieveLink={`/calendars/retrieve_deleted/`}
                refetch={refetch}
            />}
        </div>
    );
};

export default EditCalendars;