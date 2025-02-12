import React from 'react';
import EditTable from "./EditTable";

const EditServices = ({ services }) => {
    return (
        <EditTable name={'Services'}
            data={services}
            nameAtr={'serviceName'}
            idAtr={'linkName'}
            viewLink={`/view-service/`}
            editLink={`/edit-service/`}
            addLink={`/add-service`}
            deleteLink={`/reservation_services/`}
        />
    );
};
export default EditServices;