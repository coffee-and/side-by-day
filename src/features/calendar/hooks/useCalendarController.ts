import { useMemo, useState } from 'react';
import {
  addMonths,
  addYears,
  createLocalDate,
  getYearWindow,
  startOfMonth,
} from '../lib/dateUtils';
import type { CalendarViewMode } from '../types';

function createClampedDate(year: number, month: number, preferredDay: number) {
  const lastDay = new Date(year, month + 1, 0).getDate();
  return createLocalDate(year, month, Math.min(preferredDay, lastDay));
}

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
    const nextSelectedDate = createClampedDate(
      visibleMonth.getFullYear(),
      monthIndex,
      selectedDate.getDate(),
    );
    setSelectedDate(nextSelectedDate);
    setVisibleMonth(startOfMonth(nextSelectedDate));
    setViewMode('month');
  }

  function selectYear(year: number) {
    const nextSelectedDate = createClampedDate(
      year,
      visibleMonth.getMonth(),
      selectedDate.getDate(),
    );
    setSelectedDate(nextSelectedDate);
    setVisibleMonth(startOfMonth(nextSelectedDate));
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
