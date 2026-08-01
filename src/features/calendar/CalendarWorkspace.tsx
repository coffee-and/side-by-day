import type { CalendarEvent } from '../../types';
import { CalendarToolbar } from './components/CalendarToolbar';
import { MonthCalendar } from './components/MonthCalendar';
import { MonthOverview } from './components/MonthOverview';
import { YearOverview } from './components/YearOverview';
import type { CalendarState } from './hooks/useCalendar';

interface CalendarWorkspaceProps {
  calendar: CalendarState;
  events: CalendarEvent[];
}

export function CalendarWorkspace({
  calendar,
  events,
}: CalendarWorkspaceProps) {
  return (
    <section className="calendar-panel" aria-label="MY DIARY 달력">
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
          koreanEvents={calendar.koreanEvents}
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
    </section>
  );
}
