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
      backgroundColor: '#F6D5DE',
      textColor: '#6E263B',
      borderColor: '#EAA9BA',
      borderStyle: 'solid',
      borderRadius: 7,
      fontWeight: 700,
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
      backgroundColor: '#DCE9F8',
      textColor: '#23466D',
      borderColor: '#9DBDE1',
      borderStyle: 'solid',
      borderRadius: 3,
      fontWeight: 600,
    },
  },
  {
    id: 'sample-3',
    title: '친구 생일',
    date: dateWithOffset(4),
    owner: 'partner',
    source: 'local',
    appearance: {
      backgroundColor: '#EEE0FA',
      textColor: '#5B2B73',
      borderColor: '#C7A6E2',
      borderStyle: 'dashed',
      borderRadius: 999,
      fontWeight: 700,
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
      backgroundColor: '#DDEBD8',
      textColor: '#2F5A36',
      borderColor: '#9FC39A',
      borderStyle: 'solid',
      borderRadius: 6,
      fontWeight: 700,
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
      backgroundColor: '#FFE4C5',
      textColor: '#754319',
      borderColor: '#E4B77F',
      borderStyle: 'dotted',
      borderRadius: 4,
      fontWeight: 600,
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
      backgroundColor: '#203A5F',
      textColor: '#FFFFFF',
      borderColor: '#203A5F',
      borderStyle: 'solid',
      borderRadius: 2,
      fontWeight: 600,
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
