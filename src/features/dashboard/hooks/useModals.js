import { useState } from 'react';

/**
 * Multiple modals management hook
 * Manages multiple modals with type identification
 * @returns {Object} Modals state and control functions
 */
export const useModals = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const open = (modalType, data = null) => {
    setActiveModal(modalType);
    setModalData(data);
  };

  const close = () => {
    setActiveModal(null);
    setModalData(null);
    setIsLoading(false);
  };

  const setLoading = (loading) => {
    setIsLoading(loading);
  };

  const isModalOpen = (modalType) => {
    return activeModal === modalType;
  };

  return {
    activeModal,
    modalData,
    isLoading,
    open,
    close,
    setLoading,
    isModalOpen,
  };
};
