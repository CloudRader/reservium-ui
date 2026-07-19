import React from "react";
import { API_BASE_URL } from '@constants';
import UniversalLayout from '@layouts/UniversalLayout.jsx';
import useEditableForm from '../../hooks/useEditableForm.js';
import SuccessErrorMessage from '@components/ui/feedback/SuccessErrorMessage.jsx';
import { useNavigate } from "react-router-dom";
import Button from '@components/ui/buttons/Button.jsx';
import ActionButtons from '@components/ui/buttons/ActionButtons.jsx';

const EditService = ({ service: initialService, isEditMode = false }) => {
  const navigate = useNavigate();
  const serviceUpdateUrl = `${API_BASE_URL}/reservation-services/${initialService.id}`;

  // Transform initial service data to match form field names
  const transformedInitialService = {
    name: initialService.serviceName,
    alias: initialService.linkName,
    web: initialService.wikiLink,
    contact_mail: initialService.contact_mail,
    public: initialService.public,
  };

  const handleSaveSuccess = (savedData) => {
    // Navigate to new URL if name changed
    if (savedData.name !== initialService.serviceName) {
      navigate(`/manager/edit-service/${savedData.name}`, { replace: true });
    }
  };

  const {
    isEditing,
    editedData,
    message,
    handleEdit,
    handleSave,
    handleCancel,
    handleChange,
    loading,
  } = useEditableForm(
    transformedInitialService,
    serviceUpdateUrl,
    null,
    isEditMode,
    handleSaveSuccess,
  );

  const handleNavigation = (path) => () =>
    navigate(`/manager/${path}/${editedData.alias}`);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <UniversalLayout
      centerContent
      whiteBackGreenContentBackground
      headerTittle={`${isEditing ? "Edit" : "View"} Service: ${
        initialService.serviceName
      }`}
    >
      <div className="bg-white p-4 rounded-lg shadow">
        {message && <SuccessErrorMessage message={message} />}

        <div className="mb-4">
          <label htmlFor="service-name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="service-name"
            type="text"
            name="name"
            value={editedData.name}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="service-alias" className="block text-sm font-medium text-gray-700">
            Alias
          </label>
          <input
            id="service-alias"
            type="text"
            name="alias"
            value={editedData.alias}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="service-web" className="block text-sm font-medium text-gray-700">Web</label>
          <input
            id="service-web"
            type="text"
            name="web"
            value={editedData.web}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="contact-mail" className="block text-sm font-medium text-gray-700">
            Contact Email
          </label>
          <input
            id="contact-mail"
            type="email"
            name="contact_mail"
            value={editedData.contact_mail}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="service-public" className="block text-sm font-medium text-gray-700">
            Public
          </label>
          <input
            id="service-public"
            type="checkbox"
            name="public"
            checked={editedData.public}
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1 focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
          />
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <ActionButtons
            isEditing={isEditing}
            onSave={handleSave}
            onCancel={handleCancel}
            onEdit={handleEdit}
            isDeleted={initialService.deleted_at !== null}
            additionalButtons={
              <>
                <Button
                  variant="blue"
                  onClick={handleNavigation("edit-calendars")}
                >
                  Calendars
                </Button>
                <Button
                  variant="purple"
                  onClick={handleNavigation("edit-mini-services")}
                >
                  Mini Services
                </Button>
              </>
            }
          />
        </div>
      </div>
    </UniversalLayout>
  );
};

export default EditService;
