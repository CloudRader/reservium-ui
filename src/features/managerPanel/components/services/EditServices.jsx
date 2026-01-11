import React from 'react';
import EditTable from '../EditTable.jsx';
import { useFetch } from '@features/shared';
import { API_ENDPOINTS } from '@config/apiEndpoints';
import PulsatingLoader from '@components/ui/feedback/PulsatingLoader.jsx';
import ErrorMessage from '@components/ui/feedback/ErrorMessage.jsx';

const EditServices = () => {
  const { data, isLoading, isError, error, refetch } = useFetch(
    ['services'],
    API_ENDPOINTS.SERVICES.GET_ALL,
    { params: { include_removed: true } }
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
