import React, { useState, useEffect } from "react";
import ReservationForm from "../Components/ReservationForm";
import AdaptiveCalendar from "../Components/AdaptiveCalendar";
import WarningMessage from "../Components/ui/WarningMessage";
import { ErrorMobileModal } from "../Components/ui/ErrorMobileModal";
import PulsatingLoader from "../Components/ui/PulsatingLoader";
import useSubmitLogic from "../hooks/useSubmitLogic";
import useIsMobile from "../hooks/useIsMobile";

const ReservationPage = ({ roomCalendarLinks, service, allService }) => {
  const isMobile = useIsMobile();
  const [selectedSlot, setSelectedSlot] = useState(null);
  const { errorMessages, setErrorMessage, handleSubmit, isSubmitting } =
    useSubmitLogic(service, allService);

  return (
    <div className="max-w-7xl dark:!bg-slate-400 mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {isSubmitting && <PulsatingLoader />}
      {isMobile && errorMessages?.general && (
        <ErrorMobileModal
          onClose={() => setErrorMessage({})}
          message={errorMessages.general}
        />
      )}
      <WarningMessage
        contactMail={service?.contact_mail}
        wikiLink={service?.wikiLink}
      />
      <div className="flex flex-col lg:flex-row gap-8">
        <ReservationForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          calendarIds={service?.calendarIds}
          reservationTypes={
            service.reservation_types?.map((name) => ({
              value: name,
              label: name,
            })) || []
          }
          selectedSlot={selectedSlot}
        />
        <div
          className={`w-full dark:!bg-slate-400 shadow-md overflow-hidden ${
            isMobile ? "p-1" : "p-6"
          } no-underline`}
        >
          <AdaptiveCalendar
            isMobile={isMobile}
            googleCalendars={roomCalendarLinks}
            setSelectedSlot={setSelectedSlot}
          />
          {!isMobile && errorMessages?.general && (
            <div className="alert alert-danger mt-5">
              {errorMessages.general}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
