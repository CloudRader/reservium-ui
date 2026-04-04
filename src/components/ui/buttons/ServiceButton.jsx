import React from "react";

const ServiceButton = ({ children, href }) => (
  <a
    href={href}
    className="px-4 py-2 my-2 mr-2 no-underline text-white border border-white rounded-full hover:bg-white/20 transition-colors duration-300 whitespace-nowrap"
  >
    {children}
  </a>
);

export default ServiceButton;
