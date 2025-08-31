import React from "react";
import UniversalLayout from "../../layouts/UniversalLayout.jsx";
import SuccessErrorMessage from "../ui/SuccessErrorMessage.jsx";
import useEditableForm from "../../hooks/useEditableForm.js";
import { API_BASE_URL } from "../../constants";
import ActionButtons from "../ui/ActionButtons.jsx";

const EditMiniService = ({ miniServiceData, isEditMode = false }) => {
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
    `${API_BASE_URL}/reservation-services/${miniServiceData.id}/mini-services`,
    null,
    isEditMode
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
          <label className="block text-sm font-medium text-gray-700">ID</label>
          <input
            type="text"
            name="id"
            value={editedData.id}
            readOnly
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
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
          <label className="block text-sm font-medium text-gray-700">
            Lockers IDs (comma-separated)
          </label>
          <input
            type="text"
            name="lockers_id"
            value={editedData.lockers_id}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
            placeholder="Enter locker IDs separated by commas (e.g., 1, 2, 3)"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Access Group
          </label>
          <input
            type="text"
            name="access_group"
            value={editedData.access_group || ""}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Room ID
          </label>
          <input
            type="number"
            name="room_id"
            value={editedData.room_id || ""}
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
