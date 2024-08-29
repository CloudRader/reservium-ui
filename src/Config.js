const googleCalendarsClubRoom = [
    {
        googleCalendarId: "c_19586a3da50ca06566ef62012d6829ebf4e3026108212e9f9d0cc2fc6bc7c44a@group.calendar.google.com",
        className: "gcal-club-room",
        backgroundColor: '#9222a7',
        borderColor: '#9222a7',
    },
    {
        googleCalendarId: "c_90c053583d4d2ae156551c6ecd311f87dad610a3272545c363879645f6968cef@group.calendar.google.com",
        className: "gcal-poker",
        backgroundColor: '#ff37da',
        borderColor: '#ff37da',
    },
    {
        googleCalendarId: "c_f8a87bad9df63841a343835e6c559643835aa3c908302680324807b61dcb7e49@group.calendar.google.com",
        className: "gcal-table-soccer",
        backgroundColor: '#008046',
        borderColor: '#008046',
    },
    {
        googleCalendarId: "c_4f3ccb9b25e3e37bc1dcea8784a8a11442d39e700809a12bee21bbeeb67af765@group.calendar.google.com",
        className: "gcal-projector",
        backgroundColor: '#616161',
        borderColor: '#616161',
    },
    {
        googleCalendarId: "c_8fc8c6760f7e32ed57785cf4739dc63e406b4a802aeec65ca0b1a3f56696263d@group.calendar.google.com",
        className: "gcal-pool",
        backgroundColor: '#d91414',
        borderColor: '#d91414',
    },
    {
        googleCalendarId: "c_ac8930b000e43818707d6ff5ec4e40b7ef529f4db79089cd5c3edaa3b59fb41b@group.calendar.google.com",
        className: "gcal-synthesizer",
        backgroundColor: '#f7c13c',
        borderColor: '#f7c13c',
    },
]

const googleCalendarsGrill = [
    {
        googleCalendarId: "c_6cab3396f3e0d400d07904b08f427ff9c66b90b809488cfe6401a87891ab1cfd@group.calendar.google.com",
        className: "gcal-study-room",
        backgroundColor: '#f26f20',
        borderColor: '#f26f20',
    },
];

const googleCalendarsStudyRoom = [
    {
        googleCalendarId: "c_8f07a054dc4cd02f848491ffee9adb0302611811e711ffe921e4025d18d42ef2@group.calendar.google.com",
        className: "gcal-study-room",
        backgroundColor: '#4551b2',
        borderColor: '#4551b2',
    },
    {
        googleCalendarId: "c_609bc4fdefe310e30dec02d90753f434d82cd738818dec679ad018d12731f97f@group.calendar.google.com",
        className: "gcal-study-desk",
        backgroundColor: '#0099e2',
        borderColor: '#0099e2',
    },
];

const config = {
    domenServer: "https://reservation.buk.cvut.cz:8000",
    clubCalendarLinks: googleCalendarsClubRoom,
    // clubCalendarLink: "https://calendar.google.com/calendar/embed?height=600&wkst=2&ctz=Europe%2FPrague&bgcolor=%23B39DDB&title=Club%20Room&showTz=0&showPrint=0&hl=en&src=Y185MGMwNTM1ODNkNGQyYWUxNTY1NTFjNmVjZDMxMWY4N2RhZDYxMGEzMjcyNTQ1YzM2Mzg3OTY0NWY2OTY4Y2VmQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y19mOGE4N2JhZDlkZjYzODQxYTM0MzgzNWU2YzU1OTY0MzgzNWFhM2M5MDgzMDI2ODAzMjQ4MDdiNjFkY2I3ZTQ5QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y18xOTU4NmEzZGE1MGNhMDY1NjZlZjYyMDEyZDY4MjllYmY0ZTMwMjYxMDgyMTJlOWY5ZDBjYzJmYzZiYzdjNDRhQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y180ZjNjY2I5YjI1ZTNlMzdiYzFkY2VhODc4NGE4YTExNDQyZDM5ZTcwMDgwOWExMmJlZTIxYmJlZWI2N2FmNzY1QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y184ZmM4YzY3NjBmN2UzMmVkNTc3ODVjZjQ3MzlkYzYzZTQwNmI0YTgwMmFlZWM2NWNhMGIxYTNmNTY2OTYyNjNkQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y19hYzg5MzBiMDAwZTQzODE4NzA3ZDZmZjVlYzRlNDBiN2VmNTI5ZjRkYjc5MDg5Y2Q1YzNlZGFhM2I1OWZiNDFiQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23cc00a9&color=%230B8043&color=%238E24AA&color=%23616161&color=%23D50000&color=%23F6BF26",
    // grillCalendarLink: "https://calendar.google.com/calendar/embed?height=600&wkst=2&ctz=Europe%2FPrague&bgcolor=%23EF6C00&title=Grill%20Centrum&showPrint=0&showTz=0&hl=en&src=Y182Y2FiMzM5NmYzZTBkNDAwZDA3OTA0YjA4ZjQyN2ZmOWM2NmI5MGI4MDk0ODhjZmU2NDAxYTg3ODkxYWIxY2ZkQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23EF6C00" ,
    // studyCalendarLink: "https://calendar.google.com/calendar/embed?height=600&wkst=2&ctz=Europe%2FPrague&bgcolor=%233F51B5&title=Study%20Room&showPrint=0&showTz=0&hl=en&src=Y184ZjA3YTA1NGRjNGNkMDJmODQ4NDkxZmZlZTlhZGIwMzAyNjExODExZTcxMWZmZTkyMWU0MDI1ZDE4ZDQyZWYyQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y182MDliYzRmZGVmZTMxMGUzMGRlYzAyZDkwNzUzZjQzNGQ4MmNkNzM4ODE4ZGVjNjc5YWQwMThkMTI3MzFmOTdmQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%233F51B5&color=%23039BE5" ,
    grillCalendarLink: googleCalendarsGrill,
    studyCalendarLink:  googleCalendarsStudyRoom,
    googleCalendarApiKey:  "AIzaSyARjUqLIMYShXY_JQAuUYdzb3G4Malsv3c",
};
export default config;