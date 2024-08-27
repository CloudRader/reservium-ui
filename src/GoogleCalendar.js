import React from 'react';

const GoogleCalendar = ({src}) => {
    return (
        <div>
            {/*<h3 className="my-4">Events Calendar</h3>*/}
            <div className="responsive-iframe">
                {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                <iframe src={src}  style={{border: "0"}} width="100%" height="600" scrolling="no"></iframe>
            </div>
        </div>
    );
};

export default GoogleCalendar;


