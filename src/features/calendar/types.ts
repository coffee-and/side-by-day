export type CalendarViewMode = 'month' | 'months' | 'years';

export type KoreanCalendarEventType = 'public' | 'observance' | 'commemoration';

export interface KoreanCalendarEvent {
  id: string;
  date: string;
  name: string;
  type: KoreanCalendarEventType;
  substitute?: boolean;
  note?: string;
}

export interface LunarDateInfo {
  year: number;
  month: number;
  day: number;
  isLeapMonth: boolean;
  label: string;
  gapja?: string;
}

export interface CalendarDayCell {
  date: Date;
  key: string;
  isCurrentMonth: boolean;
}
