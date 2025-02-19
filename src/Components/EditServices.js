import React from 'react';
import EditTable from "./EditTable";

const EditServices = ({ services }) => {
    return (
        <EditTable name={'Services'}
            data={services}
            nameAtr={'serviceName'}
            idAtr={'id'}
            editLink={`/manager/edit-service/`}
            addLink={`/manager/add-service`}
            viewLink={`/manager/view-service/`}
            deleteLink={`/reservation_services/`}
        />
    );
};
export default EditServices;