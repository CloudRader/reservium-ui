const constants = {
    serverURL: "https://api.develop.reservation.buk.cvut.cz",
    headOfDormitoryEmail: "renata.prihodova@cvut.cz",
    googleCalendarApiKey: process.env['REACT_APP_GOOGLE_CALENDAR_API_KEY'],
    reservationFormLink: "https://drive.google.com/file/d/1GeEh4cKlcBzspV-AzsG_ag_WfVVgXl1X/view?usp=sharing",
    reservationInfoLink: "https://wiki.buk.cvut.cz/en/club-zone/club-room#reservation-system",
    wikiInfoLink: "https://wiki.buk.cvut.cz/en/club-zone/",
    contactMail: "provoz@buk.cvut.cz",
    feedBackEmail: "provoz@buk.cvut.cz",
    services: [
        { name: "Membership", url: "https://wiki.buk.cvut.cz/en/for-members/membership" },
        { name: "Club room", url: "https://wiki.buk.cvut.cz/en/club-zone/club-room" },
        { name: "Study room", url: "https://wiki.buk.cvut.cz/en/club-zone/study-room" },
        { name: "Grill", url: "https://wiki.buk.cvut.cz/en/club-zone/grill" },
        { name: "Luggage room", url: "https://wiki.buk.cvut.cz/en/club-zone/luggage-room" },
        { name: "Games", url: "https://wiki.buk.cvut.cz/en/club-zone/board-games" },
        { name: "Sport", url: "https://wiki.buk.cvut.cz/en/club-zone/sport" },
        { name: "Internet", url: "https://wiki.buk.cvut.cz/en/for-members/internet" },
        { name: "Events", url: "https://www.instagram.com/bubenklub/" }
    ],
    // set hours in int format
    default_reservation_start_time: 17,
    default_reservation_end_time: 21,
    MOBILE_SCREEN_BREAKPOINT: 1024,
};

export default constants;