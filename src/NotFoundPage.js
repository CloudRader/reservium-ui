import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 to-green-100">
            <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8 text-center">
                <h1 className="text-4xl font-bold text-green-800 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-green-700 mb-6">Page Not Found</h2>
                <p className="text-green-600 mb-8">Oops! The page you're looking for doesn't exist.</p>
                <button
                    onClick={handleGoHome}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    Go to Home Page
                </button>
            </div>
        </div>
    );
};

export default NotFoundPage;