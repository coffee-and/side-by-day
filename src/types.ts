export type ThemeName = 'light' | 'dark';
export type AppSection = 'today' | 'calendar' | 'todos' | 'notes';

export type SpaceKind = 'personal' | 'shared';

export interface Space {
  id: string;
  name: string;
  kind: SpaceKind;
  memberIds: string[];
}

export type EventOwner = 'mine' | 'partner' | 'together';
export type CalendarEventSource = 'local' | 'google' | 'apple' | 'native';
export type EventAppearanceVariant = 'underline' | 'fill';

export interface EventAppearance {
  variant: EventAppearanceVariant;
  accentColor: string;
  textColor?: string;
  borderRadius?: number;
}

export interface CalendarDayDecoration {
  date: string;
  icon: string;
  label?: string;
}

export interface CalendarEvent {
  id: string;
  spaceId: string;
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

export interface TodoItem {
  id: string;
  spaceId: string;
  title: string;
  dueDate?: string;
  completedAt?: string;
  createdAt: string;
}

export interface Memo {
  id: string;
  spaceId: string;
  title: string;
  content: string;
  linkedDate?: string;
  pinned: boolean;
  updatedAt: string;
}

export interface DateCounter {
  id: string;
  spaceId: string;
  title: string;
  targetDate: string;
  mode: 'countup' | 'countdown';
  pinned: boolean;
}
