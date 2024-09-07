import React from 'react';
import config from "./Config";

const WarningMessage = ({contactMail}) => {
    return (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3 mb-2" role="alert">
            <p className="font-bold">This is a beta version of the site</p>
            <p>If you encounter any problems or have suggestions for improving the site, please email {config.feedBackEmail}.</p>
            <p className="mt-2 font-bold">Attention!</p>
            <p>When using the site and creating reservations, you agree that you have read reservation and usage rules
                of spaces{' '}
                <a href="https://wiki.buk.cvut.cz/en/club-zone/club-room" className="underline text-blue-600 hover:text-blue-800">here</a>.
                Feel free to ask any questions {contactMail}.
            </p>
        </div>
    );
};

export default WarningMessage;