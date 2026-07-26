import type { CalendarDayDecoration, CalendarEvent, DateCounter } from '../types';

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

const exhibitionDate = dateWithOffset(7);

export const sampleEvents: CalendarEvent[] = [
  {
    id: 'sample-1',
    title: '저녁 약속',
    date: dateWithOffset(0),
    time: '19:30',
    owner: 'together',
    source: 'local',
    appearance: {
      variant: 'fill',
      accentColor: '#FF5C8A',
      textColor: '#3A0718',
      borderRadius: 5,
    },
  },
  {
    id: 'sample-2',
    title: '병원 예약',
    date: dateWithOffset(1),
    time: '14:00',
    owner: 'mine',
    source: 'local',
    appearance: {
      variant: 'underline',
      accentColor: '#2F7CFF',
    },
  },
  {
    id: 'sample-3',
    title: '친구 생일',
    date: dateWithOffset(4),
    owner: 'partner',
    source: 'local',
    appearance: {
      variant: 'fill',
      accentColor: '#FFD84D',
      textColor: '#382A00',
      borderRadius: 4,
    },
  },
  {
    id: 'sample-4',
    title: '전시 보러 가기',
    date: exhibitionDate,
    time: '15:00',
    owner: 'together',
    note: '티켓 확인하기',
    source: 'local',
    appearance: {
      variant: 'underline',
      accentColor: '#18C96E',
    },
  },
  {
    id: 'sample-5',
    title: '카페 들르기',
    date: exhibitionDate,
    time: '17:00',
    owner: 'together',
    source: 'local',
    appearance: {
      variant: 'fill',
      accentColor: '#FF8A3D',
      textColor: '#3B1800',
      borderRadius: 4,
    },
  },
  {
    id: 'sample-6',
    title: '장보기',
    date: exhibitionDate,
    time: '19:00',
    owner: 'mine',
    source: 'local',
    appearance: {
      variant: 'underline',
      accentColor: '#8B5CF6',
    },
  },
  {
    id: 'sample-7',
    title: '통화하기',
    date: exhibitionDate,
    time: '21:00',
    owner: 'partner',
    source: 'local',
  },
];

export const sampleDayDecorations: CalendarDayDecoration[] = [
  { date: dateWithOffset(0), icon: '🍽️', label: '저녁 약속' },
  { date: dateWithOffset(4), icon: '🎂', label: '생일' },
  { date: exhibitionDate, icon: '🖼️', label: '전시' },
];

export const sampleCounters: DateCounter[] = [
  { id: 'counter-1', title: '함께한 날', targetDate: dateWithOffset(-99), mode: 'countup' },
  { id: 'counter-2', title: '다음 여행', targetDate: dateWithOffset(14), mode: 'countdown' },
];
