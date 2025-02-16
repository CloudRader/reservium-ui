import React from 'react';
import EditTable from "./EditTable";

const EditServices = ({ services }) => {
    return (
        <EditTable name={'Services'}
            data={services}
            nameAtr={'serviceName'}
            idAtr={'id'}
            editLink={`/edit-service/`}
            addLink={`/add-service`}
            viewLink={`/view-service/`}
            deleteLink={`/reservation_services/`}
        />
    );
};
export default EditServices;