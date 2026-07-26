export type ThemeName = 'natural' | 'cute' | 'simple' | 'dark';

export type EventOwner = 'mine' | 'partner' | 'together';
export type CalendarMarkerType = 'holiday' | 'anniversary' | 'observance';

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  owner: EventOwner;
  note?: string;
}

export interface CalendarMarker {
  id: string;
  title: string;
  date: string;
  type: CalendarMarkerType;
  isHoliday?: boolean;
}

export interface CalendarDayModel {
  date: Date;
  isoDate: string;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  userEvents: CalendarEvent[];
  markers: CalendarMarker[];
}

export interface DateCounter {
  id: string;
  title: string;
  targetDate: string;
  mode: 'countup' | 'countdown';
}
