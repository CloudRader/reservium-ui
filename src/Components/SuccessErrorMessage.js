import React from 'react';

const SuccessErrorMessage = ({message}) => {
    return (
        <div
            className={`mb-4 p-2 rounded ${
                message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
        >
            {message.text}
        </div>
    )
};
export default SuccessErrorMessage;