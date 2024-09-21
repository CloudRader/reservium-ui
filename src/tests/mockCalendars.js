export const mockGoogleCalendars = [
    {
        googleCalendarId: 'primary@example.com',
        className: 'primary-calendar',
        color: '#4285F4', // Google Blue
        events: [
            {
                id: '1',
                title: 'Team Meeting',
                start: '2024-09-10T10:00:00',
                end: '2024-09-10T11:00:00',
                description: 'Weekly team sync-up'
            },
            {
                id: '2',
                title: 'Lunch with Client',
                start: '2024-09-12T12:30:00',
                end: '2024-09-12T13:30:00',
                description: 'Discuss project progress over lunch'
            },
            {
                id: '3',
                title: 'Project Deadline',
                start: '2024-09-15T00:00:00',
                end: '2024-09-16T00:00:00',
                description: 'Final submission for Project X'
            }
        ]
    },
    {
        googleCalendarId: 'work@example.com',
        className: 'work-calendar',
        color: '#0F9D58', // Google Green
        events: [
            {
                id: '4',
                title: 'Conference Call',
                start: '2024-09-11T14:00:00',
                end: '2024-09-11T15:00:00',
                description: 'Quarterly review with stakeholders'
            },
            {
                id: '5',
                title: 'Training Session',
                start: '2024-09-13T09:00:00',
                end: '2024-09-13T12:00:00',
                description: 'New software training for the team'
            }
        ]
    },
    {
        googleCalendarId: 'personal@example.com',
        className: 'personal-calendar',
        color: '#DB4437', // Google Red
        events: [
            {
                id: '6',
                title: 'Gym',
                start: '2024-09-10T07:00:00',
                end: '2024-09-10T08:00:00',
                description: 'Morning workout'
            },
            {
                id: '7',
                title: 'Family Dinner',
                start: '2024-09-14T19:00:00',
                end: '2024-09-14T21:00:00',
                description: 'Dinner with parents'
            },
            {
                id: '8',
                title: 'Not Approved: Vacation Request',
                start: '2024-09-20T00:00:00',
                end: '2024-09-25T00:00:00',
                description: 'Pending approval for time off'
            }
        ]
    }
];