import React from 'react';

const UniversalLayout = ({
                             children,
                             centerContent = false,
                             fullHeight = false,
                             whiteBackGreenContentBackground = false,
                             className = ''
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
            <div className={`container mx-auto px-4 ${backGroundContent} ${contentClass} ${className}`}>
                {children}
            </div>
        </div>
    );
};

export default UniversalLayout;