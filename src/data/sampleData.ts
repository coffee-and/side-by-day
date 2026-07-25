import type { CalendarEvent, DateCounter } from '../types';

export const sampleEvents: CalendarEvent[] = [
  { id: '1', title: '병원 예약', date: '2026-07-27', time: '14:00', owner: 'mine' },
  { id: '2', title: '저녁 약속', date: '2026-07-27', time: '19:30', owner: 'together' },
  { id: '3', title: '친구 생일', date: '2026-07-30', owner: 'partner' },
];

export const sampleCounters: DateCounter[] = [
  { id: '1', title: '함께한 날', targetDate: '2025-10-18', mode: 'countup' },
  { id: '2', title: '여행까지', targetDate: '2026-08-15', mode: 'countdown' },
];
