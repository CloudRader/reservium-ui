import React from 'react';
import EditTable from "./EditTable";
import useFetchWithDeleted from "../hooks/useFetchWithDeleted";
import PulsatingLoader from "./ui/PulsatingLoader";
import ErrorMessage from "./ui/ErrorMessage";

const EditServices = () => {
    const {
        data,
        isLoading,
        isError,
        error,
        refetch
    } = useFetchWithDeleted(
        ['services'],
        '/reservation_services/'
    );

    if (isError) {
        return (
            <div className="container mx-auto px-4 py-8">
                <ErrorMessage
                    message={error?.message || 'Failed to load services'}
                    title="Error Loading Services"
                    onRetry={refetch}
                />
            </div>
        );
    }

    return (
        <div className="relative">
            {isLoading && <PulsatingLoader />}
            {data && <EditTable
                name={'Services'}
                data={data}
                nameAtr={'name'}
                idAtr={'id'}
                editLink={`/manager/edit-service/`}
                addLink={`/manager/add-service`}
                viewLink={`/manager/view-service/`}
                deleteLink={`/reservation_services/`}
                retrieveLink={`/reservation_services/retrieve_deleted/`}
                refetch={refetch}
            />}
        </div>
    );
};

export default EditServices;