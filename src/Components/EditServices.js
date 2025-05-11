import React from 'react';
import EditTable from "./EditTable";
import useFetchWithDeleted from "../hooks/useFetchWithDeleted";
import PulsatingLoader from "./ui/PulsatingLoader";

const EditServices = () => {
    const {
        data,
        isLoading,
        isError,
        error
    } = useFetchWithDeleted(
        ['services'],
        '/reservation_services/'
    );

    if (isLoading) {
        return <PulsatingLoader />;
    }

    if (isError) {
        return <div>Error: {error?.message || 'Something went wrong'}</div>;
    }

    return (
        data && <EditTable name={'Services'}
            data={data}
            nameAtr={'name'}
            idAtr={'id'}
            editLink={`/manager/edit-service/`}
            addLink={`/manager/add-service`}
            viewLink={`/manager/view-service/`}
            deleteLink={`/reservation_services/`}
            retrieveLink={`/reservation_services/retrieve_deleted/`}
        />
    );
};

export default EditServices;