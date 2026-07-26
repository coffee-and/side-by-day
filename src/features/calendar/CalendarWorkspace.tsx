import { useMemo } from 'react';
import type { CalendarEvent } from '../../types';
import { CalendarToolbar } from './components/CalendarToolbar';
import { DateDetails } from './components/DateDetails';
import { MonthCalendar } from './components/MonthCalendar';
import { MonthOverview } from './components/MonthOverview';
import { YearOverview } from './components/YearOverview';
import { useCalendarController } from './hooks/useCalendarController';
import { buildMonthCells, getUniqueYears } from './lib/dateUtils';
import { getKoreanCalendarEventsForYears } from './services/koreanCalendarService';

interface CalendarWorkspaceProps {
  events: CalendarEvent[];
}

export function CalendarWorkspace({ events }: CalendarWorkspaceProps) {
  const calendar = useCalendarController();
  const calendarYears = useMemo(() => {
    const monthDates = buildMonthCells(calendar.visibleMonth).map((cell) => cell.date);
    return getUniqueYears([...monthDates, calendar.selectedDate]);
  }, [calendar.visibleMonth, calendar.selectedDate]);

  const koreanEvents = useMemo(
    () => getKoreanCalendarEventsForYears(calendarYears),
    [calendarYears],
  );

  return (
    <section className="calendar-workspace" aria-label="대한민국 공유 캘린더">
      <div className="calendar-card calendar-card--interactive">
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
        koreanEvents={koreanEvents}
      />
    </section>
  );
}
