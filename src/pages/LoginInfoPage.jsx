import React from "react";
import { NavLink } from "react-router-dom";
import ServicesSection from "../Components/ServicesSection";
import UniversalLayout from "../layouts/UniversalLayout";

const LoginInfoPage = () => {
  return (
    <UniversalLayout>
      <div className="bg-white dark:!bg-green-700 border-r-2 border-green-50 dark:!text-white w-full md:w-1/2 lg:w-5/12 mb-8 md:mb-0 p-6 md:p-8 text-center flex flex-col justify-center">
        <h2 className="text-2xl dark:!text-white font-semibold text-green-700 mb-6">
          Please log in to make reservations.
        </h2>
        <NavLink
          to="/login"
          className="inline-flex self-center no-underline items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Log in
        </NavLink>
      </div>
      <div className="w-full md:w-1/2 lg:w-7/12">
        <ServicesSection />
      </div>
    </UniversalLayout>
  );
};

export default LoginInfoPage;
