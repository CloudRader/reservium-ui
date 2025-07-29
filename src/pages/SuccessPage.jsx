import React from "react";
import { useLocation, Link } from "react-router-dom";
import ServicesSection from "../Components/ui/ServicesSection.jsx";
import {emails} from "../constants";
import EventRegistrationForm from "../Components/reservationForm/EventRegistrationForm.jsx";

const SuccessPage = () => {
  // Extract state processing to a separate function
  const processLocationState = (state) => {
    if (!state) return {};

    const { message, contactMail, wikiLink, ...rest } = state;

    return {
      isTooManyPeopleMessage: message
        ? JSON.stringify(message).includes("more than")
        : false,
      isNightTimeMessage: message
        ? JSON.stringify(message).includes("Night time")
        : false,
      managerMail: contactMail ? JSON.stringify(contactMail) : "",
      maxPeopleMessage: message ? message.replace(/"/g, "") : "",
      linkOnWiki: wikiLink || "",
      formData: {
        event_name: rest.purpose || "",
        guests: rest.guests || "",
        event_start: rest.start_datetime || "",
        event_end: rest.end_datetime || "",
        user_name: rest.user_name || "",
        email: rest.email || "",
        space: rest.serviceName || "",
        allSpace: (rest.allService || []).filter(
          (service) => service !== rest.serviceName
        ),
        manager_contact_mail: contactMail || "",
      },
    };
  };

  const { state } = useLocation();
  const {
    isTooManyPeopleMessage,
    isNightTimeMessage,
    managerMail,
    maxPeopleMessage,
    linkOnWiki,
    formData,
  } = processLocationState(state);

  // Render different content based on message type
  const renderContent = () => {
    if (isTooManyPeopleMessage) {
      return (
        <div className="container mx-auto px-4 py-6 md:py-16 lg:py-24">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
            <div className="p-6 md:p-8">
              <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
                Event Registration Form
              </h1>

              {/* Information section */}
              <div className="mb-8 text-center">
                <p className="text-l md:text-xl text-green-700 mb-4">
                  If you are reserving for {maxPeopleMessage}, you must fill out
                  this registration form. It will be sent to the Head of
                  Dormitory ({emails.headOfDormitory}), with the manager
                  ({managerMail}) in CC.
                </p>
                <div className="pb-2">
                  <a
                    href={linkOnWiki}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex no-underline items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    More information
                  </a>
                </div>
              </div>

              {/* Registration form */}
              <EventRegistrationForm formData={formData} />
            </div>
          </div>
        </div>
      );
    }

    if (isNightTimeMessage) {
      return (
        <div className="container mx-auto px-4 py-8 md:py-16 lg:py-52 flex flex-col md:flex-row items-stretch justify-between">
          <div className="w-full mb-8 md:mb-0 md:flex md:flex-col">
            <div className="bg-white dark:!bg-green-700 p-6 md:p-8 text-center flex-grow flex flex-col justify-center">
              <h1 className="text-4xl dark:!text-white font-bold text-green-800 mb-4">
                You need to confirm your reservation
              </h1>
              <p className="text-l dark:!text-white md:text-xl text-green-700 mb-8">
                For night time reservation you must get additional confirmation
                from the manager. You will receive this confirmation via email.
                In case you do not receive a reply within a few days, you may
                contact the manager directly at {managerMail}, with your
                reservation details. More information here:
              </p>
              <div>
                <a
                  href={linkOnWiki}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex no-underline items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  INFO
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-16 md:py-4 lg:py-52 flex flex-col md:flex-row items-stretch justify-between">
        <div className="w-full md:w-1/2 lg:w-5/12 mb-8 md:mb-0 md:flex md:flex-col">
          <div className="bg-white dark:!bg-green-700 p-6 md:p-8 text-center flex-grow flex flex-col justify-center">
            <h1 className="text-4xl dark:!text-white font-bold text-green-800 mb-4">
              Reservation was made successfully
            </h1>
            <p className="text-l dark:!text-white md:text-xl text-green-700 mb-6">
              Now you can see it in the calendar and dashboard. Read the terms
              of use of the spaces on our wiki page.
            </p>
            <div>
              <a
                href={linkOnWiki}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex no-underline items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mb-3"
              >
                READ
              </a>
            </div>
            <p className="text-l dark:!text-white md:text-xl text-green-700 mb-6">
              You can cancel or edit your reservation in your dashboard.
            </p>
            <div>
              <Link
                to={`/dashboard`}
                className="inline-flex no-underline items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-7/12 md:flex md:flex-col">
          <ServicesSection />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-green-100">
      {renderContent()}
    </div>
  );
};

export default SuccessPage;
