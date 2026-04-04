import React from 'react';
import { CloseCircleIcon } from '../icons/CloseCircleIcon';

const ErrorMessage = ({
    message = 'Something went wrong',
    title = 'Error',
    onRetry,
    className = ''
}) => {
    return (
        <div
            role="alert"
            className={`bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-sm ${className}`}
        >
            <div className="flex items-start">
                <div className="flex-shrink-0">
                    <CloseCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                        {title}
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                        <p>{message}</p>
                    </div>
                    {onRetry && (
                        <div className="mt-4">
                            <button
                                type="button"
                                onClick={onRetry}
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                Try again
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ErrorMessage; 