import React, { useState } from 'react';
import TextareaModal from '@components/ui/modals/TextareaModal';
import DateTimeRangeModal from '@components/ui/modals/DateTimeRangeModal';
import EditEventModal from '@components/ui/modals/EditEventModal';
import ConfirmationModal from '@components/ui/modals/ConfirmationModal';
import Pagination from '@components/ui/navigation/Pagination';
import Table from '@components/ui/tables/Table';
import EventCard from './EventCard';
import { useModals } from '../hooks/useModals';
import useIsMobile from '@features/shared/hooks/useIsMobile';
import { formatForDateTimeLocal } from '@utils/dateUtils';
import { getEventsTableColumns } from '../config/eventsTableConfig';

const EventsTable = ({
  title,
  events,
  actions = [],
  currentPage = 1,
  onPageChange,
  hasMore = false,
  isLoading = false,
  showPagination = false,
  emptyMessage = 'No events to display.',
  showRequestedTime = false,
  totalPages,
}) => {
  const isMobile = useIsMobile();
  const [loadingEventId, setLoadingEventId] = useState(null);

  const {
    activeModal,
    modalData,
    isLoading: isModalLoading,
    open,
    close,
    setLoading,
    isModalOpen,
  } = useModals();

  const handleActionClick = async (action, event) => {
    if (!action.modalConfig) {
      setLoadingEventId(event.id);
      try {
        await action.onConfirm({ eventId: event.id });
      } finally {
        setLoadingEventId(null);
      }
    } else {
      open(action.modalType, event);
    }
  };

  const handleModalConfirm = async (data) => {
    const action = actions.find((a) => a.modalType === activeModal);
    if (action && action.onConfirm) {
      setLoading(true);
      setLoadingEventId(modalData?.id);
      try {
        await action.onConfirm({ eventId: modalData.id, ...data });
        close();
      } catch (error) {
        console.error('Action failed:', error);
      } finally {
        setLoadingEventId(null);
        setLoading(false);
      }
    }
  };

  const getActionConfig = (modalType) => {
    const action = actions.find((a) => a.modalType === modalType);
    return action?.modalConfig || {};
  };

  // Get table columns configuration
  const columns = getEventsTableColumns({
    showRequestedTime,
    actions,
    onActionClick: handleActionClick,
    loadingEventId,
  });

  // Render mobile card
  const renderMobileCard = (eventData) => (
    <EventCard
      key={eventData.event.id}
      event={eventData}
      actions={actions}
      showRequestedTime={showRequestedTime}
      loadingEventId={loadingEventId}
      onActionClick={handleActionClick}
    />
  );

  return (
    <>
      {/* Modals */}
      <TextareaModal
        isOpen={isModalOpen('declineTime') || isModalOpen('declineEvent')}
        onClose={close}
        onConfirm={handleModalConfirm}
        title={getActionConfig(activeModal)?.title || ''}
        placeholder={getActionConfig(activeModal)?.placeholder || ''}
        required={getActionConfig(activeModal)?.required || false}
        isLoading={isModalLoading}
      />

      <DateTimeRangeModal
        isOpen={isModalOpen('requestTimeChange')}
        onClose={close}
        onConfirm={handleModalConfirm}
        title={getActionConfig(activeModal)?.title || ''}
        placeholder={getActionConfig(activeModal)?.placeholder || ''}
        initialStartTime={formatForDateTimeLocal(modalData?.start_datetime)}
        initialEndTime={formatForDateTimeLocal(modalData?.end_datetime)}
        isLoading={isModalLoading}
      />

      <EditEventModal
        isOpen={isModalOpen('edit')}
        onClose={close}
        onConfirm={handleModalConfirm}
        eventData={modalData}
        isLoading={isModalLoading}
      />

      <ConfirmationModal
        isOpen={isModalOpen('approveTime') || isModalOpen('approveEvent')}
        onClose={close}
        onConfirm={() => handleModalConfirm({})}
        title={getActionConfig(activeModal)?.title || ''}
        message={
          getActionConfig(activeModal)?.confirmMessage || 'Are you sure?'
        }
        confirmText={getActionConfig(activeModal)?.confirmText || 'Confirm'}
        isLoading={isModalLoading}
      />

      {/* Table */}
      <Table
        data={events}
        columns={columns}
        renderMobileCard={renderMobileCard}
        isMobile={isMobile}
        emptyMessage={emptyMessage}
      />

      {/* Pagination */}
      {showPagination && onPageChange && (
        <Pagination
          currentPage={currentPage}
          onPageChange={onPageChange}
          hasMore={hasMore}
          isLoading={isLoading}
          totalPages={totalPages}
        />
      )}
    </>
  );
};

export default EventsTable;
