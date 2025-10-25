import React from 'react';
import Button from './Button';

const ActionButtons = ({
    isEditing,
    onSave,
    onCancel,
    onEdit,
    saveText = 'Save',
    cancelText = 'Cancel',
    editText = 'Edit',
    isDeleted = false,
    additionalButtons = null
}) => {
    if (isDeleted) {
        return null;
    }

    return (
        <div className="mt-6 flex justify-end space-x-3">
            {isEditing ? (
                <>
                    <Button variant="primary" onClick={onSave}>
                        {saveText}
                    </Button>
                    <Button variant="secondary" onClick={onCancel}>
                        {cancelText}
                    </Button>
                </>
            ) : (
                <>
                    {additionalButtons}
                    <Button variant="primary" onClick={onEdit}>
                        {editText}
                    </Button>
                </>
            )}
        </div>
    );
};

export default ActionButtons; 