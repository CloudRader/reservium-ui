import React from 'react';

const WarningMessage = ({ contactMail, wikiLink }) => (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-2 mb-2" role="alert">
        <h5 className="font-bold mb-1">Important Notice</h5>
        <p className="inline">By using this site, you accept the <a href={wikiLink} className="underline text-blue-600 hover:text-blue-800">rules</a>. Need help? Contact {contactMail}.</p>
    </div>
);

export default WarningMessage;