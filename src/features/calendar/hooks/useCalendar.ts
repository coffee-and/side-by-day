import { useEffect, useMemo, useState } from 'react';
import { buildMonthCells, getUniqueYears } from '../lib/dateUtils';
import {
  getKoreanCalendarEventsForYears,
  getKoreanCommemorationsForYears,
} from '../services/koreanCalendarService';
import type { KoreanCalendarEvent } from '../types';
import { useCalendarController } from './useCalendarController';

export function useCalendar() {
  const controller = useCalendarController();
  const calendarYears = useMemo(() => {
    const monthDates = buildMonthCells(controller.visibleMonth).map((cell) => cell.date);
    return getUniqueYears([...monthDates, controller.selectedDate]);
  }, [controller.visibleMonth, controller.selectedDate]);
  const calendarYearKey = calendarYears.join(',');
  const commemorations = useMemo(
    () => getKoreanCommemorationsForYears(calendarYears),
    [calendarYearKey],
  );
  const [koreanEvents, setKoreanEvents] = useState<KoreanCalendarEvent[]>(commemorations);
  const [isCalendarDataLoading, setIsCalendarDataLoading] = useState(true);
  const [hasCalendarDataError, setHasCalendarDataError] = useState(false);

  useEffect(() => {
    let isActive = true;
    setKoreanEvents(commemorations);
    setIsCalendarDataLoading(true);
    setHasCalendarDataError(false);

    void getKoreanCalendarEventsForYears(calendarYears)
      .then((loadedEvents) => {
        if (isActive) {
          setKoreanEvents(loadedEvents);
        }
      })
      .catch(() => {
        if (isActive) {
          setKoreanEvents(commemorations);
          setHasCalendarDataError(true);
        }
      })
      .finally(() => {
        if (isActive) {
          setIsCalendarDataLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [calendarYearKey, commemorations]);

  return {
    ...controller,
    koreanEvents,
    isCalendarDataLoading,
    hasCalendarDataError,
  };
}

export type CalendarState = ReturnType<typeof useCalendar>;
