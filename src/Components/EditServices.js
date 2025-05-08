import React from 'react';
import EditTable from "./EditTable";
import useFetchWithDeleted from "../hooks/useFetchWithDeleted";

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

    return (
        data && <EditTable name={'Services'}
            data={data}
            nameAtr={'serviceName'}
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