import { getHolidayPreset } from '@hyunbinseo/holidays-kr';
import type { KoreanCalendarEvent } from '../types';

interface FixedCommemoration {
  month: number;
  day: number;
  name: string;
}

type HolidayPreset = Record<string, readonly string[]>;

const officialCache = new Map<number, KoreanCalendarEvent[]>();

const fixedCommemorations: FixedCommemoration[] = [
  { month: 3, day: 3, name: '납세자의 날' },
  { month: 3, day: 8, name: '3·8민주의거 기념일' },
  { month: 3, day: 15, name: '3·15의거 기념일' },
  { month: 4, day: 3, name: '4·3희생자 추념일' },
  { month: 4, day: 5, name: '식목일' },
  { month: 4, day: 7, name: '보건의 날' },
  { month: 4, day: 11, name: '대한민국임시정부 수립 기념일' },
  { month: 4, day: 19, name: '4·19혁명 기념일' },
  { month: 4, day: 20, name: '장애인의 날' },
  { month: 4, day: 21, name: '과학의 날' },
  { month: 4, day: 22, name: '정보통신의 날' },
  { month: 4, day: 28, name: '충무공 이순신 탄신일' },
  { month: 5, day: 1, name: '근로자의 날' },
  { month: 5, day: 8, name: '어버이날' },
  { month: 5, day: 10, name: '유권자의 날' },
  { month: 5, day: 15, name: '스승의 날' },
  { month: 5, day: 18, name: '5·18민주화운동 기념일' },
  { month: 5, day: 21, name: '부부의 날' },
  { month: 5, day: 31, name: '바다의 날' },
  { month: 6, day: 5, name: '환경의 날' },
  { month: 6, day: 10, name: '6·10민주항쟁 기념일' },
  { month: 6, day: 25, name: '6·25전쟁일' },
  { month: 6, day: 28, name: '철도의 날' },
  { month: 7, day: 17, name: '제헌절' },
  { month: 8, day: 14, name: '일본군 위안부 피해자 기림의 날' },
  { month: 9, day: 7, name: '푸른 하늘의 날' },
  { month: 10, day: 1, name: '국군의 날' },
  { month: 10, day: 2, name: '노인의 날' },
  { month: 10, day: 5, name: '세계 한인의 날' },
  { month: 10, day: 8, name: '재향군인의 날' },
  { month: 10, day: 10, name: '임산부의 날' },
  { month: 10, day: 21, name: '경찰의 날' },
  { month: 10, day: 24, name: '국제연합일' },
  { month: 10, day: 28, name: '교정의 날' },
  { month: 10, day: 29, name: '지방자치 및 균형발전의 날' },
  { month: 11, day: 3, name: '학생독립운동 기념일' },
  { month: 11, day: 9, name: '소방의 날' },
  { month: 11, day: 11, name: '농업인의 날' },
  { month: 11, day: 17, name: '순국선열의 날' },
  { month: 12, day: 3, name: '소비자의 날' },
  { month: 12, day: 5, name: '무역의 날' },
  { month: 12, day: 27, name: '원자력 안전 및 진흥의 날' },
];

function toDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function getCommemorations(year: number): KoreanCalendarEvent[] {
  return fixedCommemorations.map((item) => ({
    id: `commemoration-${year}-${item.month}-${item.day}`,
    date: toDateKey(year, item.month, item.day),
    name: item.name,
    type: 'commemoration',
  }));
}

async function getOfficialHolidays(year: number): Promise<KoreanCalendarEvent[]> {
  const cached = officialCache.get(year);
  if (cached) {
    return cached;
  }

  try {
    const preset = await getHolidayPreset(String(year)) as HolidayPreset;
    const events = Object.entries(preset).flatMap(([date, names]) => names.map((name, index) => ({
      id: `holiday-${date}-${index}`,
      date,
      name,
      type: 'public' as const,
      substitute: name.includes('대체공휴일'),
    })));
    officialCache.set(year, events);
    return events;
  } catch (error) {
    if (error instanceof RangeError) {
      officialCache.set(year, []);
      return [];
    }
    throw error;
  }
}

function mergeEvents(events: KoreanCalendarEvent[]) {
  const merged = new Map<string, KoreanCalendarEvent>();
  events.forEach((event) => {
    merged.set(`${event.date}-${event.name}`, event);
  });
  return [...merged.values()].sort((left, right) => left.date.localeCompare(right.date));
}

export function getKoreanCommemorationsForYears(years: number[]) {
  return years.flatMap(getCommemorations);
}

export async function getKoreanCalendarEventsForYears(years: number[]) {
  const officialEvents = await Promise.all(years.map(getOfficialHolidays));
  return mergeEvents([
    ...officialEvents.flat(),
    ...getKoreanCommemorationsForYears(years),
  ]);
}
