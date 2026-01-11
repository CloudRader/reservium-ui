import React from 'react';

const SuccessErrorMessage = ({message}) => {
    const getMessageStyles = () => {
        switch (message.type) {
            case 'success':
                return 'bg-green-100 text-green-700';
            case 'error':
                return 'bg-red-100 text-red-700';
            case 'warning':
                return 'bg-yellow-100 text-yellow-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className={`mb-4 p-2 rounded ${getMessageStyles()}`}>
            {message.text}
        </div>
    )
};
export default SuccessErrorMessage;