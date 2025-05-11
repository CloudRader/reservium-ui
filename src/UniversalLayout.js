import React from 'react';
import BackArrow from "./Components/ui/BackArrow";

const UniversalLayout = ({
    children,
    centerContent = false,
    fullHeight = false,
    whiteBackGreenContentBackground = false,
    className = '',
    headerTittle = '',
}) => {
    const contentClass = centerContent
        ? 'flex flex-col items-center justify-center'
        : 'flex flex-col md:flex-row items-stretch justify-between';

    const heightClass = fullHeight
        ? 'min-h-screen'
        : 'min-h-[calc(100vh-4rem)]';

    return (
        <div className={`bg-gradient-to-br from-green-100 via-green-50 to-blue-50 lg:py-16 ${heightClass}`}>
            <div className={`container mx-auto px-4 ${className}`}>
                {headerTittle &&
                    <div className="flex items-center justify-between mb-8">
                        <div className="w-1/4">
                            <BackArrow />
                        </div>
                        <div className="w-1/2 text-center text-2xl font-bold text-green-800">
                            {headerTittle}
                        </div>
                        <div className="w-1/4"></div>
                    </div>
                }
                <div className={contentClass}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default UniversalLayout;