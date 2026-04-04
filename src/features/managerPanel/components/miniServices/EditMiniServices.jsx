import React from 'react';
import EditTable from '../EditTable.jsx';
import { useFetch } from '@features/shared';
import { API_ENDPOINTS } from '@config/apiEndpoints';
import PulsatingLoader from '@components/ui/feedback/PulsatingLoader.jsx';
import ErrorMessage from '@components/ui/feedback/ErrorMessage.jsx';

const EditMiniServices = ({ serviceId, serviceName }) => {
  const { data, isLoading, isError, error, refetch } = useFetch(
    ['serviceMiniServices', serviceId],
    API_ENDPOINTS.SERVICES.GET_MINI_SERVICES(serviceId),
    {
      params: { include_removed: true },
      enabled: !!serviceId
    }
  );

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage
          message={error?.message || 'Failed to load mini services'}
          title="Error Loading Mini Services"
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
          name={'Mini Services'}
          data={data}
          nameAtr={'name'}
          idAtr={'id'}
          editLink={`/manager/edit-mini-service/${serviceName}/`}
          addLink={`/manager/add-mini-service/${serviceName}`}
          viewLink={`/manager/view-mini-service/${serviceName}/`}
          deleteLink={`/mini-services/`}
          retrieveLink={`/mini-services/`}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default EditMiniServices;
