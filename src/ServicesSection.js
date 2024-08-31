import React from 'react';

const ServiceButton = ({ children }) => (
    <button className="px-4 py-2 my-2 mr-2 text-white border border-white rounded-full hover:bg-white/20 transition-colors duration-300 whitespace-nowrap">
        {children}
    </button>
);

const ServicesSection = () => {
    const services = [
        "Membership", "Club room", "Study room", "Grill", "Storage room", "Games",
        "Sport", "Internet", "Events"
    ];

    return (
        <div className="bg-green-700 p-7 py-12 h-full flex flex-col">
            <h2 className="text-white text-2xl mb-6">Our Services</h2>
            <div className="flex-grow overflow-y-auto">
                <div className="flex flex-wrap">
                    {services.map((service, index) => (
                        <ServiceButton key={index}>{service}</ServiceButton>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServicesSection;