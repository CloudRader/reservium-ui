import React from "react";
import { useNavigate } from "react-router-dom";
import UniversalLayout from '@layouts/UniversalLayout.jsx';
import SuccessErrorMessage from '@components/ui/feedback/SuccessErrorMessage.jsx';
import useEditableForm from '../../hooks/useEditableForm.js';
import { API_BASE_URL } from '@constants';
import ActionButtons from '@components/ui/buttons/ActionButtons.jsx';

const EditMiniService = ({ serviceName, miniServiceData, isEditMode = false }) => {
  const navigate = useNavigate();

  const handleSaveSuccess = (savedData) => {
    // Navigate to new URL if name changed
    if (savedData.name !== miniServiceData.name) {
      navigate(`/manager/edit-mini-service/${serviceName}/${savedData.name}`, { replace: true });
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
  } = useEditableForm(
    miniServiceData,
    `${API_BASE_URL}/mini-services/${miniServiceData.id}`,
    null,
    isEditMode,
    handleSaveSuccess,
  );

  if (!miniServiceData) {
    return <div>No data available</div>;
  }

  return (
    <UniversalLayout
      centerContent
      whiteBackGreenContentBackground
      headerTittle={`${isEditing ? "Edit" : "View"} Mini Service: ${
        miniServiceData.name
      }`}
    >
      <div className="bg-white p-4 rounded-lg shadow">
        {message && <SuccessErrorMessage message={message} />}
        <div className="mb-4">
          <label htmlFor="mini-service-id" className="block text-sm font-medium text-gray-700">ID</label>
          <input
            id="mini-service-id"
            type="text"
            name="id"
            value={editedData.id}
            readOnly
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="mini-service-name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="mini-service-name"
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
        <div className="mt-6 flex justify-end space-x-3">
          <ActionButtons
            isEditing={isEditing}
            onSave={handleSave}
            onCancel={handleCancel}
            onEdit={handleEdit}
            editText="Edit Mini Service"
            isDeleted={miniServiceData.deleted_at !== null}
          />
        </div>
      </div>
    </UniversalLayout>
  );
};

export default EditMiniService;
