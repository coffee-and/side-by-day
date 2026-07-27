export type ThemeName = 'light' | 'dark';
export type AppSection = 'today' | 'calendar' | 'todos' | 'notes';
export type WorkspaceLayout = 'mobile' | 'tablet' | 'desktop';

export type SpaceKind = 'personal' | 'shared';

export interface Space {
  id: string;
  name: string;
  kind: SpaceKind;
  memberIds: string[];
}

export type EventAppearanceVariant = 'underline' | 'fill';

export interface EventAppearance {
  variant: EventAppearanceVariant;
  accentColor: string;
  textColor?: string;
}

export type RepeatFrequency = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface RepeatRule {
  frequency: RepeatFrequency;
  interval: number;
}

export interface EventAlert {
  minutesBefore: number;
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
  note?: string;
  appearance?: EventAppearance;
  repeat?: RepeatRule;
  alerts?: EventAlert[];
}

export interface TodoItem {
  id: string;
  spaceId: string;
  title: string;
  dueDate?: string;
  completedAt?: string;
  createdAt: string;
  important: boolean;
  repeat?: RepeatRule;
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
  yearlyRepeat: boolean;
  icon?: string;
  color?: string;
}

export type WorkspaceEntityKind = 'event' | 'todo' | 'memo' | 'counter';

export interface WorkspaceEditorTarget {
  kind: WorkspaceEntityKind;
  id?: string;
  date?: string;
}
