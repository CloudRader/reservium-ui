import React from 'react';
import EditTable from './EditTable.jsx';
import useFetchWithDeleted from '../../hooks/useFetchWithDeleted.js';
import PulsatingLoader from '../ui/PulsatingLoader.jsx';
import ErrorMessage from '../ui/ErrorMessage.jsx';

const EditServices = () => {
  const { data, isLoading, isError, error, refetch } = useFetchWithDeleted(
    ['services'],
    '/reservation-services/'
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
      {data && (
        <EditTable
          name={'Services'}
          data={data}
          nameAtr={'name'}
          idAtr={'id'}
          editLink={`/manager/edit-service/`}
          addLink={`/manager/add-service`}
          viewLink={`/manager/view-service/`}
          deleteLink={`/reservation-services/`}
          retrieveLink={`/reservation-services/`}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default EditServices;
