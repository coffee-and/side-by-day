import type {
  CalendarEvent,
  DateCounter,
  Memo,
  Space,
  TodoItem,
} from '../types';
import { EVENT_COLOR_TOKENS } from '../features/events/eventPalette';

export const PERSONAL_SPACE_ID = 'personal-space';
export const SHARED_SPACE_ID = 'shared-space-placeholder';

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
    name: 'MY DIARY',
    kind: 'personal',
    memberIds: ['local-user'],
  },
  {
    id: SHARED_SPACE_ID,
    name: 'TOGETHER DIARY',
    kind: 'shared',
    memberIds: [],
  },
];

export const sampleEvents: CalendarEvent[] = [
  {
    id: 'sample-1',
    spaceId: PERSONAL_SPACE_ID,
    title: '저녁 약속',
    date: dateWithOffset(0),
    time: '19:30',
    appearance: {
      variant: 'fill',
      accentColor: EVENT_COLOR_TOKENS[2].accent,
      textColor: EVENT_COLOR_TOKENS[2].text,
    },
  },
  {
    id: 'sample-2',
    spaceId: PERSONAL_SPACE_ID,
    title: '병원 예약',
    date: dateWithOffset(1),
    time: '14:00',
    appearance: {
      variant: 'underline',
      accentColor: EVENT_COLOR_TOKENS[10].accent,
    },
  },
  {
    id: 'sample-3',
    spaceId: PERSONAL_SPACE_ID,
    title: '친구 생일',
    date: dateWithOffset(4),
    appearance: {
      variant: 'fill',
      accentColor: EVENT_COLOR_TOKENS[0].accent,
      textColor: EVENT_COLOR_TOKENS[0].text,
    },
  },
  {
    id: 'sample-4',
    spaceId: PERSONAL_SPACE_ID,
    title: '전시 보러 가기',
    date: exhibitionDate,
    time: '15:00',
    note: '티켓 확인하기',
    appearance: {
      variant: 'underline',
      accentColor: EVENT_COLOR_TOKENS[3].accent,
    },
  },
  {
    id: 'sample-5',
    spaceId: PERSONAL_SPACE_ID,
    title: '카페 들르기',
    date: exhibitionDate,
    time: '17:00',
    appearance: {
      variant: 'fill',
      accentColor: EVENT_COLOR_TOKENS[1].accent,
      textColor: EVENT_COLOR_TOKENS[1].text,
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
    important: false,
  },
  {
    id: 'todo-2',
    spaceId: PERSONAL_SPACE_ID,
    title: '택배 보내기',
    dueDate: dateWithOffset(0),
    createdAt: nowIso,
    important: true,
  },
  {
    id: 'todo-3',
    spaceId: PERSONAL_SPACE_ID,
    title: '주말 장보기 목록 정리',
    dueDate: dateWithOffset(3),
    createdAt: nowIso,
    important: false,
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

export const sampleCounters: DateCounter[] = [
  {
    id: 'counter-1',
    spaceId: PERSONAL_SPACE_ID,
    title: 'Side by Day 시작',
    targetDate: dateWithOffset(-99),
    mode: 'countup',
    pinned: true,
    yearlyRepeat: false,
    icon: '◆',
    color: EVENT_COLOR_TOKENS[6].accent,
  },
  {
    id: 'counter-2',
    spaceId: PERSONAL_SPACE_ID,
    title: '다음 여행',
    targetDate: dateWithOffset(14),
    mode: 'countdown',
    pinned: true,
    yearlyRepeat: false,
    icon: '✦',
    color: EVENT_COLOR_TOKENS[2].accent,
  },
];
