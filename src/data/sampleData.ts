import type { CalendarEvent, DateCounter } from '../types';

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function dateWithOffset(days: number) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + days);
  return toDateKey(date);
}

export const sampleEvents: CalendarEvent[] = [
  { id: 'sample-1', title: '저녁 약속', date: dateWithOffset(0), time: '19:30', owner: 'together', source: 'local' },
  { id: 'sample-2', title: '병원 예약', date: dateWithOffset(1), time: '14:00', owner: 'mine', source: 'local' },
  { id: 'sample-3', title: '친구 생일', date: dateWithOffset(4), owner: 'partner', source: 'local' },
  { id: 'sample-4', title: '전시 보러 가기', date: dateWithOffset(7), time: '15:00', owner: 'together', note: '티켓 확인하기', source: 'local' },
];

export const sampleCounters: DateCounter[] = [
  { id: 'counter-1', title: '함께한 날', targetDate: dateWithOffset(-99), mode: 'countup' },
  { id: 'counter-2', title: '다음 여행', targetDate: dateWithOffset(14), mode: 'countdown' },
];
