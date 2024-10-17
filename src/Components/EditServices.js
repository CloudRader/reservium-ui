import React from 'react';
import EditTable from "./EditTable";

const EditServices = ({services}) => {



    return (
        <EditTable name={'Services'}
                   data={services}
                   nameAtr={'serviceName'}
                   id={'linkName'}
                   editLink={`/edit-service/`}
                   addLink={`/add-service/`}
        />
    );
};
export default EditServices;