import KoreanLunarCalendar from 'korean-lunar-calendar';
import type { LunarDateInfo } from '../types';

export function getKoreanLunarDate(date: Date): LunarDateInfo | null {
  const calendar = new KoreanLunarCalendar();
  const isValid = calendar.setSolarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());

  if (!isValid) {
    return null;
  }

  const lunar = calendar.getLunarCalendar();
  const gapja = calendar.getKoreanGapja();
  const isLeapMonth = Boolean(lunar.intercalation);
  const leapLabel = isLeapMonth ? '윤' : '';

  return {
    year: lunar.year,
    month: lunar.month,
    day: lunar.day,
    isLeapMonth,
    label: `음력 ${lunar.year}년 ${leapLabel}${lunar.month}월 ${lunar.day}일`,
    gapja: `${gapja.year} ${gapja.month} ${gapja.day}`,
  };
}
