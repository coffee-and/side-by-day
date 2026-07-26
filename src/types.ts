export type ThemeName = 'natural' | 'cute' | 'simple' | 'dark';

export type EventOwner = 'mine' | 'partner' | 'together';
export type CalendarEventSource = 'local' | 'google' | 'apple' | 'native';

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  endTime?: string;
  allDay?: boolean;
  owner: EventOwner;
  note?: string;
  source?: CalendarEventSource;
}

export interface DateCounter {
  id: string;
  title: string;
  targetDate: string;
  mode: 'countup' | 'countdown';
}
