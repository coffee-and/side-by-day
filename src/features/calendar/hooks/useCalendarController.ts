import { useMemo, useState } from 'react';
import { addMonths, addYears, getYearWindow, startOfMonth } from '../lib/dateUtils';
import type { CalendarViewMode } from '../types';

export function useCalendarController(initialDate = new Date()) {
  const today = useMemo(() => new Date(), []);
  const [visibleMonth, setVisibleMonth] = useState(() => startOfMonth(initialDate));
  const [selectedDate, setSelectedDate] = useState(() => initialDate);
  const [viewMode, setViewMode] = useState<CalendarViewMode>('month');
  const [yearWindowCenter, setYearWindowCenter] = useState(initialDate.getFullYear());

  const years = useMemo(() => getYearWindow(yearWindowCenter), [yearWindowCenter]);

  function goPrevious() {
    if (viewMode === 'month') {
      setVisibleMonth((current) => addMonths(current, -1));
      return;
    }
    if (viewMode === 'months') {
      setVisibleMonth((current) => addYears(current, -1));
      return;
    }
    setYearWindowCenter((current) => current - 10);
  }

  function goNext() {
    if (viewMode === 'month') {
      setVisibleMonth((current) => addMonths(current, 1));
      return;
    }
    if (viewMode === 'months') {
      setVisibleMonth((current) => addYears(current, 1));
      return;
    }
    setYearWindowCenter((current) => current + 10);
  }

  function openMonthOverview() {
    setViewMode('months');
  }

  function openYearOverview() {
    setYearWindowCenter(visibleMonth.getFullYear());
    setViewMode('years');
  }

  function selectMonth(monthIndex: number) {
    setVisibleMonth(new Date(visibleMonth.getFullYear(), monthIndex, 1, 12));
    setViewMode('month');
  }

  function selectYear(year: number) {
    setVisibleMonth((current) => new Date(year, current.getMonth(), 1, 12));
    setYearWindowCenter(year);
    setViewMode('months');
  }

  function selectDate(date: Date) {
    setSelectedDate(date);
    setVisibleMonth(startOfMonth(date));
  }

  function goToday() {
    const now = new Date();
    setSelectedDate(now);
    setVisibleMonth(startOfMonth(now));
    setYearWindowCenter(now.getFullYear());
    setViewMode('month');
  }

  return {
    today,
    visibleMonth,
    selectedDate,
    viewMode,
    years,
    goPrevious,
    goNext,
    openMonthOverview,
    openYearOverview,
    selectMonth,
    selectYear,
    selectDate,
    goToday,
  };
}
