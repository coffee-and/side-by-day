export type ThemeName = 'light' | 'dark';

export type EventOwner = 'mine' | 'partner' | 'together';
export type CalendarEventSource = 'local' | 'google' | 'apple' | 'native';
export type EventBorderStyle = 'none' | 'solid' | 'dashed' | 'dotted';

export interface EventAppearance {
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderStyle?: EventBorderStyle;
  borderRadius?: number;
  fontWeight?: 400 | 500 | 600 | 700 | 800;
}

export interface CalendarDayDecoration {
  date: string;
  icon: string;
  label?: string;
}

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
  appearance?: EventAppearance;
}

export interface DateCounter {
  id: string;
  title: string;
  targetDate: string;
  mode: 'countup' | 'countdown';
}
