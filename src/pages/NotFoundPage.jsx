import React from "react";
import { Link } from "react-router-dom";
import ServicesSection from "../Components/ui/ServicesSection.jsx";
import UniversalLayout from "../layouts/UniversalLayout";

const NotFoundPage = () => {
  return (
    <UniversalLayout>
      <div className="bg-white dark:!bg-green-700 border-r-2 border-green-50 w-full md:w-1/2 lg:w-5/12 mb-8 md:mb-0 p-6 md:p-8 text-center flex flex-col justify-center">
        <h1 className="text-4xl dark:!text-white font-bold text-green-800 mb-4">
          404
        </h1>
        <h2 className="text-2xl dark:!text-white font-semibold text-green-700 mb-6">
          Page Not Found
        </h2>
        <p className="text-green-700 dark:text-white mb-8 font-medium">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-flex self-center no-underline items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Go to Home Page
        </Link>
      </div>
      <div className="w-full md:w-1/2 lg:w-7/12">
        <ServicesSection />
      </div>
    </UniversalLayout>
  );
};
export default NotFoundPage;
