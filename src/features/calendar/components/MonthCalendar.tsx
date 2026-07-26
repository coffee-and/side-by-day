import { useMemo } from 'react';
import type { CalendarDayDecoration, CalendarEvent } from '../../../types';
import { buildMonthCells, isSameDay, weekdayLabels } from '../lib/dateUtils';
import type { KoreanCalendarEvent } from '../types';
import { CalendarDayEvents } from './CalendarDayEvents';

interface MonthCalendarProps {
  visibleMonth: Date;
  selectedDate: Date;
  today: Date;
  events: CalendarEvent[];
  dayDecorations: CalendarDayDecoration[];
  koreanEvents: KoreanCalendarEvent[];
  onSelectDate: (date: Date) => void;
}

function groupByDate<T extends { date: string }>(items: T[]) {
  return items.reduce<Record<string, T[]>>((grouped, item) => {
    (grouped[item.date] ??= []).push(item);
    return grouped;
  }, {});
}

function indexDecorations(items: CalendarDayDecoration[]) {
  return items.reduce<Record<string, CalendarDayDecoration>>((indexed, item) => {
    indexed[item.date] = item;
    return indexed;
  }, {});
}

export function MonthCalendar({
  visibleMonth,
  selectedDate,
  today,
  events,
  dayDecorations,
  koreanEvents,
  onSelectDate,
}: MonthCalendarProps) {
  const cells = useMemo(() => buildMonthCells(visibleMonth), [visibleMonth]);
  const eventsByDate = useMemo(() => groupByDate(events), [events]);
  const koreanEventsByDate = useMemo(() => groupByDate(koreanEvents), [koreanEvents]);
  const decorationsByDate = useMemo(() => indexDecorations(dayDecorations), [dayDecorations]);

  return (
    <div className="calendar-month-view">
      <div className="calendar-weekdays" aria-hidden="true">
        {weekdayLabels.map((weekday) => <span key={weekday}>{weekday}</span>)}
      </div>

      <div className="calendar-grid" role="grid" aria-label={`${visibleMonth.getFullYear()}년 ${visibleMonth.getMonth() + 1}월`}>
        {cells.map((cell) => {
          const dayEvents = eventsByDate[cell.key] ?? [];
          const dayKoreanEvents = koreanEventsByDate[cell.key] ?? [];
          const decoration = decorationsByDate[cell.key];
          const publicHoliday = dayKoreanEvents.find((event) => event.type === 'public');
          const calendarLabel = publicHoliday?.name ?? dayKoreanEvents[0]?.name;
          const isSelected = isSameDay(cell.date, selectedDate);
          const isToday = isSameDay(cell.date, today);
          const isSunday = cell.date.getDay() === 0;
          const isSaturday = cell.date.getDay() === 6;

          const classNames = [
            'calendar-day',
            !cell.isCurrentMonth ? 'is-outside' : '',
            isSelected ? 'is-selected' : '',
            isToday ? 'is-today' : '',
            isSunday || publicHoliday ? 'is-holiday' : '',
            isSaturday ? 'is-saturday' : '',
          ].filter(Boolean).join(' ');

          const description = [
            `${cell.date.getMonth() + 1}월 ${cell.date.getDate()}일`,
            calendarLabel,
            decoration?.label,
            dayEvents.length ? `공유 일정 ${dayEvents.length}개` : '',
          ].filter(Boolean).join(', ');

          return (
            <button
              aria-label={description}
              aria-pressed={isSelected}
              className={classNames}
              key={cell.key}
              onClick={() => onSelectDate(cell.date)}
              role="gridcell"
              type="button"
            >
              <span className="calendar-day__number">{cell.date.getDate()}</span>
              <span className="calendar-day__holiday" title={calendarLabel}>{calendarLabel ?? '\u00a0'}</span>
              <CalendarDayEvents decoration={decoration} events={dayEvents} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
