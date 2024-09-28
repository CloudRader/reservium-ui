import React from 'react';
import {services} from '../Constants';
const ServiceButton = ({ children , href }) => (
    <a
        href={href}
        className="px-4 py-2 my-2 mr-2 no-underline text-white border border-white rounded-full hover:bg-white/20 transition-colors duration-300 whitespace-nowrap">
        {children}
    </a>
);

const ServicesSection = () => {
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

export default ServicesSection;