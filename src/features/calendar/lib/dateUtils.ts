import type { CalendarDayCell } from '../types';

const DATE_KEY_LENGTH = 10;

export const weekdayLabels = ['일', '월', '화', '수', '목', '금', '토'] as const;
export const monthLabels = Array.from({ length: 12 }, (_, index) => `${index + 1}월`);

export function createLocalDate(year: number, month: number, day: number) {
  return new Date(year, month, day, 12, 0, 0, 0);
}

export function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function startOfMonth(date: Date) {
  return createLocalDate(date.getFullYear(), date.getMonth(), 1);
}

export function addMonths(date: Date, amount: number) {
  return createLocalDate(date.getFullYear(), date.getMonth() + amount, 1);
}

export function addYears(date: Date, amount: number) {
  return createLocalDate(date.getFullYear() + amount, date.getMonth(), 1);
}

export function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function fromDateKey(dateKey: string) {
  const normalized = dateKey.slice(0, DATE_KEY_LENGTH);
  const [year, month, day] = normalized.split('-').map(Number);
  return createLocalDate(year, month - 1, day);
}

export function isSameDay(left: Date, right: Date) {
  return toDateKey(left) === toDateKey(right);
}

export function isSameMonth(left: Date, right: Date) {
  return left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth();
}

export function buildMonthCells(month: Date): CalendarDayCell[] {
  const monthStart = startOfMonth(month);
  const firstVisibleDay = createLocalDate(
    monthStart.getFullYear(),
    monthStart.getMonth(),
    1 - monthStart.getDay(),
  );

  return Array.from({ length: 42 }, (_, index) => {
    const date = createLocalDate(
      firstVisibleDay.getFullYear(),
      firstVisibleDay.getMonth(),
      firstVisibleDay.getDate() + index,
    );

    return {
      date,
      key: toDateKey(date),
      isCurrentMonth: isSameMonth(date, monthStart),
    };
  });
}

export function formatLongDate(date: Date) {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(date);
}

export function getYearWindow(centerYear: number, size = 10) {
  const before = Math.floor((size - 1) / 2);
  const start = centerYear - before;
  return Array.from({ length: size }, (_, index) => start + index);
}

export function getUniqueYears(dates: Date[]) {
  return [...new Set(dates.map((date) => date.getFullYear()))];
}
