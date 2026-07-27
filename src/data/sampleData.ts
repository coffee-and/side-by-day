import type {
  CalendarDayDecoration,
  CalendarEvent,
  DateCounter,
  Memo,
  Space,
  TodoItem,
} from '../types';

export const PERSONAL_SPACE_ID = 'personal-space';

export function toDateKey(date: Date) {
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
const nowIso = new Date().toISOString();

export const sampleSpaces: Space[] = [
  {
    id: PERSONAL_SPACE_ID,
    name: '내 공간',
    kind: 'personal',
    memberIds: ['local-user'],
  },
];

export const sampleEvents: CalendarEvent[] = [
  {
    id: 'sample-1',
    spaceId: PERSONAL_SPACE_ID,
    title: '저녁 약속',
    date: dateWithOffset(0),
    time: '19:30',
    owner: 'mine',
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
    spaceId: PERSONAL_SPACE_ID,
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
    spaceId: PERSONAL_SPACE_ID,
    title: '친구 생일',
    date: dateWithOffset(4),
    owner: 'mine',
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
    spaceId: PERSONAL_SPACE_ID,
    title: '전시 보러 가기',
    date: exhibitionDate,
    time: '15:00',
    owner: 'mine',
    note: '티켓 확인하기',
    source: 'local',
    appearance: {
      variant: 'underline',
      accentColor: '#18C96E',
    },
  },
  {
    id: 'sample-5',
    spaceId: PERSONAL_SPACE_ID,
    title: '카페 들르기',
    date: exhibitionDate,
    time: '17:00',
    owner: 'mine',
    source: 'local',
    appearance: {
      variant: 'fill',
      accentColor: '#FF8A3D',
      textColor: '#3B1800',
      borderRadius: 4,
    },
  },
];

export const sampleTodos: TodoItem[] = [
  {
    id: 'todo-1',
    spaceId: PERSONAL_SPACE_ID,
    title: '고양이 사료 주문하기',
    dueDate: dateWithOffset(0),
    createdAt: nowIso,
  },
  {
    id: 'todo-2',
    spaceId: PERSONAL_SPACE_ID,
    title: '택배 보내기',
    dueDate: dateWithOffset(0),
    createdAt: nowIso,
  },
  {
    id: 'todo-3',
    spaceId: PERSONAL_SPACE_ID,
    title: '주말 장보기 목록 정리',
    dueDate: dateWithOffset(3),
    createdAt: nowIso,
  },
];

export const sampleMemos: Memo[] = [
  {
    id: 'memo-1',
    spaceId: PERSONAL_SPACE_ID,
    title: '이번 주 장보기',
    content: '사료, 모래, 우유, 달걀',
    pinned: true,
    updatedAt: nowIso,
  },
  {
    id: 'memo-2',
    spaceId: PERSONAL_SPACE_ID,
    title: '여행 준비',
    content: '숙소 확인 · 충전기 · 상비약',
    linkedDate: dateWithOffset(14),
    pinned: false,
    updatedAt: nowIso,
  },
];

export const sampleDayDecorations: CalendarDayDecoration[] = [
  { date: dateWithOffset(0), icon: '🍽️', label: '저녁 약속' },
  { date: dateWithOffset(4), icon: '🎂', label: '생일' },
  { date: exhibitionDate, icon: '🖼️', label: '전시' },
];

export const sampleCounters: DateCounter[] = [
  {
    id: 'counter-1',
    spaceId: PERSONAL_SPACE_ID,
    title: 'Side by Day 시작',
    targetDate: dateWithOffset(-99),
    mode: 'countup',
    pinned: true,
  },
  {
    id: 'counter-2',
    spaceId: PERSONAL_SPACE_ID,
    title: '다음 여행',
    targetDate: dateWithOffset(14),
    mode: 'countdown',
    pinned: true,
  },
];
