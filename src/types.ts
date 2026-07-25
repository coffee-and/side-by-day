export type ThemeName = 'natural' | 'cute' | 'simple' | 'dark';

export type EventOwner = 'mine' | 'partner' | 'together';

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  owner: EventOwner;
  note?: string;
}

export interface DateCounter {
  id: string;
  title: string;
  targetDate: string;
  mode: 'countup' | 'countdown';
}
