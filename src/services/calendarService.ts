import type { CalendarDayModel, CalendarEvent, CalendarMarker } from '../types';

const DAY_MS = 86_400_000;

const fixedMarkers: Array<Omit<CalendarMarker, 'id' | 'date'> & { month: number; day: number }> = [
  { month: 1, day: 1, title: '신정', type: 'holiday', isHoliday: true },
  { month: 3, day: 1, title: '삼일절', type: 'holiday', isHoliday: true },
  { month: 4, day: 5, title: '식목일', type: 'anniversary' },
  { month: 5, day: 5, title: '어린이날', type: 'holiday', isHoliday: true },
  { month: 5, day: 8, title: '어버이날', type: 'anniversary' },
  { month: 5, day: 15, title: '스승의 날', type: 'anniversary' },
  { month: 6, day: 6, title: '현충일', type: 'holiday', isHoliday: true },
  { month: 8, day: 15, title: '광복절', type: 'holiday', isHoliday: true },
  { month: 10, day: 3, title: '개천절', type: 'holiday', isHoliday: true },
  { month: 10, day: 9, title: '한글날', type: 'holiday', isHoliday: true },
  { month: 12, day: 25, title: '성탄절', type: 'holiday', isHoliday: true },
];

const datedMarkers: Record<string, Omit<CalendarMarker, 'id' | 'date'>[]> = {
  '2026-02-16': [{ title: '설날 연휴', type: 'holiday', isHoliday: true }],
  '2026-02-17': [{ title: '설날', type: 'holiday', isHoliday: true }],
  '2026-02-18': [{ title: '설날 연휴', type: 'holiday', isHoliday: true }],
  '2026-03-02': [{ title: '삼일절 대체공휴일', type: 'holiday', isHoliday: true }],
  '2026-05-24': [{ title: '부처님오신날', type: 'holiday', isHoliday: true }],
  '2026-05-25': [{ title: '부처님오신날 대체공휴일', type: 'holiday', isHoliday: true }],
  '2026-08-17': [{ title: '광복절 대체공휴일', type: 'holiday', isHoliday: true }],
  '2026-09-24': [{ title: '추석 연휴', type: 'holiday', isHoliday: true }],
  '2026-09-25': [{ title: '추석', type: 'holiday', isHoliday: true }],
  '2026-09-26': [{ title: '추석 연휴', type: 'holiday', isHoliday: true }],
  '2026-10-05': [{ title: '개천절 대체공휴일', type: 'holiday', isHoliday: true }],
};

export function toIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function fromIsoDate(value: string): Date {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

export function getMarkers(date: Date): CalendarMarker[] {
  const isoDate = toIsoDate(date);
  const fixed = fixedMarkers
    .filter((item) => item.month === date.getMonth() + 1 && item.day === date.getDate())
    .map((item) => ({ ...item, id: `fixed-${isoDate}-${item.title}`, date: isoDate }));
  const dated = (datedMarkers[isoDate] ?? []).map((item) => ({
    ...item,
    id: `dated-${isoDate}-${item.title}`,
    date: isoDate,
  }));
  return [...fixed, ...dated];
}

export function buildMonthDays(cursor: Date, events: CalendarEvent[], today = new Date()): CalendarDayModel[] {
  const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const gridStart = new Date(first);
  gridStart.setDate(first.getDate() - first.getDay());

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart.getTime() + index * DAY_MS);
    const isoDate = toIsoDate(date);
    return {
      date,
      isoDate,
      day: date.getDate(),
      isCurrentMonth: date.getMonth() === cursor.getMonth(),
      isToday: isoDate === toIsoDate(today),
      userEvents: events.filter((event) => event.date === isoDate),
      markers: getMarkers(date),
    };
  });
}

export function formatLunarDate(date: Date): string {
  try {
    const formatter = new Intl.DateTimeFormat('ko-KR-u-ca-chinese', {
      month: 'long',
      day: 'numeric',
    });
    return `음력 ${formatter.format(date)}`;
  } catch {
    return '음력 정보 미지원';
  }
}

export function formatSolarDate(date: Date): string {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(date);
}
