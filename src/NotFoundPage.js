import React from 'react';
import { useNavigate } from 'react-router-dom';
import ServicesSection from './ServicesSection';

const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className=" bg-gradient-to-r from-green-50 to-green-100">
            <div className="container mx-auto px-4 py-8 md:py-16 lg:py-52 flex flex-col md:flex-row items-start justify-between">
                <div className="w-full md:w-1/2 lg:w-5/12 mb-8 md:mb-0">
                    <div className="bg-white p-6 md:p-8 text-center">
                        <h1 className="text-4xl font-bold text-green-800 mb-4">404</h1>
                        <h2 className="text-2xl font-semibold text-green-700 mb-6">Page Not Found</h2>
                        <p className="text-green-700 mb-8">Oops! The page you're looking for doesn't exist.</p>
                        <button
                            onClick={handleGoHome}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Go to Home Page
                        </button>
                    </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-7/12">
                    <ServicesSection />
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;