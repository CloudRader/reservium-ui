import React from 'react';
import EditTable from '../EditTable.jsx';
import { useFetch } from '@features/shared';
import { API_ENDPOINTS } from '@config/apiEndpoints';
import PulsatingLoader from '@components/ui/feedback/PulsatingLoader.jsx';
import ErrorMessage from '@components/ui/feedback/ErrorMessage.jsx';

const EditCalendars = ({ serviceId, serviceName }) => {
  const { data, isLoading, isError, error, refetch } = useFetch(
    ['serviceCalendars', serviceId],
    API_ENDPOINTS.SERVICES.GET_CALENDARS(serviceId),
    {
      params: { include_removed: true },
      enabled: !!serviceId
    }
  );

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage
          message={error?.message || 'Failed to load calendars'}
          title="Error Loading Calendars"
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
          name={'Calendars'}
          data={data}
          nameAtr={'reservation_type'}
          idAtr={'id'}
          editLink={`/manager/edit-calendar/${serviceName}/`}
          addLink={`/manager/add-calendar/${serviceName}`}
          viewLink={`/manager/view-calendar/${serviceName}/`}
          deleteLink={`/calendars/`}
          retrieveLink={`/calendars/`}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default EditCalendars;
