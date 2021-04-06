import { CalendarEvent } from '../interfaces';

export function convertEvent(event: CalendarEvent): CalendarEvent {
  // convert date
  event.start = new Date(event.start);
  event.end = new Date(event.end);

  return event;
}

export function convertEvents(events: CalendarEvent[]): CalendarEvent[] {
  return events.map(convertEvent);
}
