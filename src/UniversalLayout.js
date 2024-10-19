import React from 'react';
import BackArrow from "./Components/BackArrow";

const UniversalLayout = ({
                             children,
                             centerContent = false,
                             fullHeight = false,
                             whiteBackGreenContentBackground = false,
                             className = '',
                             header
                         }) => {
    const contentClass = centerContent
        ? 'flex flex-col items-center justify-center'
        : 'flex flex-col md:flex-row items-stretch justify-between';

    const backGroundPage = whiteBackGreenContentBackground
        ? 'bg-white'
        : 'bg-gradient-to-r from-green-50 to-green-100';

    const backGroundContent = whiteBackGreenContentBackground
        ? 'p-6 bg-gradient-to-r from-green-50 to-green-100'
        : '';

    const heightClass = fullHeight
        ? 'min-h-screen'
        : 'min-h-[calc(100vh-4rem)]'; // Adjust 4rem based on your footer height

    return (
        <div className={`${backGroundPage} lg:py-52 ${heightClass}`}>
            <div className={`container mx-auto px-4 ${backGroundContent} ${className}`}>
                <div className="flex items-center justify-between mb-6">
                    <BackArrow/>
                    <div className="text-center">
                        {header}
                    </div>
                </div>
                <div className={contentClass}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default UniversalLayout;