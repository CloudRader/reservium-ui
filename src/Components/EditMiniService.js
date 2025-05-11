import React from 'react';
import UniversalLayout from "../UniversalLayout";
import SuccessErrorMessage from "./ui/SuccessErrorMessage";
import useEditableForm from "../hooks/useEditableForm";
import constants from "../Constants";
import ActionButtons from './ui/ActionButtons';

const EditMiniService = ({ serviceName, miniServiceData, serviceId, isEditMode = false }) => {
    const {
        isEditing,
        editedData,
        message,
        handleEdit,
        handleSave,
        handleCancel,
        handleChange
    } = useEditableForm(miniServiceData, `${constants.serverURL}/mini_services/${miniServiceData.id}`, null, isEditMode);

    if (!miniServiceData) {
        return <div>No data available</div>;
    }

    return (
        <UniversalLayout centerContent whiteBackGreenContentBackground headerTittle={`${isEditing ? 'Edit' : 'View'} Mini Service: ${miniServiceData.name}`} >
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
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={editedData.name}
                        onChange={handleChange}
                        readOnly={!isEditing}
                        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${isEditing ? 'bg-white' : 'bg-gray-100'
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