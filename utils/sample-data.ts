import { CalendarEvent, User } from '../interfaces';

/** Dummy user data. */
export const sampleUserData: User[] = [
  { id: 101, name: 'Alice' },
  { id: 102, name: 'Bob' },
  { id: 103, name: 'Caroline' },
  { id: 104, name: 'Dave' },
];

export const sampleEvents: CalendarEvent[] = [
  {
    id: 3,
    start: new Date(2021, 4 - 1, 8).toISOString(),
    end: new Date(2021, 4 - 1, 9, 23, 59, 59).toISOString(),
    title: 'First event',
    memo: 'test',
    allDay: true,
  },
  {
    id: 2,
    start: new Date(2021, 4 - 1, 11).toISOString(),
    end: new Date(2021, 4 - 1, 15, 23, 59, 59).toISOString(),
    title: 'Songkran',
    memo: "Let's go home",
  },
];
