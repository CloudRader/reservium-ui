import React from 'react';
import EditTable from "./EditTable";



const EditMiniServices = ({ serviceName, miniServices }) => {

    return (
        <EditTable name={'Mini Services'}
            data={miniServices}
            nameAtr={'name'}
            idAtr={'id'}
            editLink={`/manager/edit-mini-service/${serviceName}/`}
            addLink={`/manager/add-mini-service/${serviceName}`}
            viewLink={`/manager/view-mini-service/${serviceName}/`}
            deleteLink={`/mini_services/`}
        />
    );
};

export default EditMiniServices;