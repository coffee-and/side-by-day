import { useEffect, useMemo, useState } from 'react';
import type { CalendarDayDecoration, CalendarEvent } from '../../types';
import { CalendarToolbar } from './components/CalendarToolbar';
import { DateDetails } from './components/DateDetails';
import { MonthCalendar } from './components/MonthCalendar';
import { MonthOverview } from './components/MonthOverview';
import { YearOverview } from './components/YearOverview';
import { useCalendarController } from './hooks/useCalendarController';
import { buildMonthCells, getUniqueYears } from './lib/dateUtils';
import {
  getKoreanCalendarEventsForYears,
  getKoreanCommemorationsForYears,
} from './services/koreanCalendarService';
import type { KoreanCalendarEvent } from './types';

interface CalendarWorkspaceProps {
  events: CalendarEvent[];
  dayDecorations: CalendarDayDecoration[];
}

export function CalendarWorkspace({ events, dayDecorations }: CalendarWorkspaceProps) {
  const calendar = useCalendarController();
  const calendarYears = useMemo(() => {
    const monthDates = buildMonthCells(calendar.visibleMonth).map((cell) => cell.date);
    return getUniqueYears([...monthDates, calendar.selectedDate]);
  }, [calendar.visibleMonth, calendar.selectedDate]);
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

  return (
    <section className="calendar-workspace" aria-label="대한민국 공유 캘린더">
      <div className="calendar-panel">
        <CalendarToolbar
          onNext={calendar.goNext}
          onOpenMonths={calendar.openMonthOverview}
          onOpenYears={calendar.openYearOverview}
          onPrevious={calendar.goPrevious}
          onToday={calendar.goToday}
          viewMode={calendar.viewMode}
          visibleMonth={calendar.visibleMonth}
          years={calendar.years}
        />

        {calendar.viewMode === 'month' ? (
          <MonthCalendar
            dayDecorations={dayDecorations}
            events={events}
            koreanEvents={koreanEvents}
            onSelectDate={calendar.selectDate}
            selectedDate={calendar.selectedDate}
            today={calendar.today}
            visibleMonth={calendar.visibleMonth}
          />
        ) : null}

        {calendar.viewMode === 'months' ? (
          <MonthOverview
            onSelectMonth={calendar.selectMonth}
            selectedMonth={calendar.visibleMonth.getMonth()}
            year={calendar.visibleMonth.getFullYear()}
          />
        ) : null}

        {calendar.viewMode === 'years' ? (
          <YearOverview
            onSelectYear={calendar.selectYear}
            selectedYear={calendar.visibleMonth.getFullYear()}
            years={calendar.years}
          />
        ) : null}
      </div>

      <DateDetails
        date={calendar.selectedDate}
        events={events}
        hasCalendarDataError={hasCalendarDataError}
        isCalendarDataLoading={isCalendarDataLoading}
        koreanEvents={koreanEvents}
      />
    </section>
  );
}
