import React from "react";
import { services } from "@constants";
import ServiceButton from "@components/ui/buttons/ServiceButton";

const ServiceLinksPanel = () => {
  return (
    <div className="bg-green-700 p-7 py-12 h-full flex flex-col">
      <h2 className="text-white text-2xl mb-6">What else do we have</h2>
      <div className="flex-grow overflow-y-auto">
        <div className="flex flex-wrap">
          {services.map((service, index) => (
            <ServiceButton key={index} href={service.url}>
              {service.name}
            </ServiceButton>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceLinksPanel;
