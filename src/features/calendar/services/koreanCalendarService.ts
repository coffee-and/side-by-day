import { getHolidayPreset } from '@hyunbinseo/holidays-kr';
import { fixedKoreanCommemorations } from '../data/koreanCommemorations';
import type { KoreanCalendarEvent } from '../types';

type HolidayPreset = Record<string, readonly string[]>;

export const OFFICIAL_HOLIDAY_DATA_RANGE = {
  start: 2018,
  end: 2027,
} as const;

const officialCache = new Map<number, KoreanCalendarEvent[]>();

function toDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function getCommemorations(year: number): KoreanCalendarEvent[] {
  return fixedKoreanCommemorations.map((item) => ({
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

export function hasOfficialHolidayData(year: number) {
  return year >= OFFICIAL_HOLIDAY_DATA_RANGE.start && year <= OFFICIAL_HOLIDAY_DATA_RANGE.end;
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
