import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { addMonths, buildMonthDays, toIsoDate } from '../../services/calendarService';
import type { CalendarEvent } from '../../types';

interface CalendarGridProps {
  events: CalendarEvent[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
const monthLabels = Array.from({ length: 12 }, (_, index) => `${index + 1}월`);

type PickerMode = 'calendar' | 'months' | 'years';

export function CalendarGrid({ events, selectedDate, onSelectDate }: CalendarGridProps) {
  const initial = new Date();
  const [cursor, setCursor] = useState(new Date(initial.getFullYear(), initial.getMonth(), 1));
  const [mode, setMode] = useState<PickerMode>('calendar');
  const [yearBlockStart, setYearBlockStart] = useState(Math.floor(initial.getFullYear() / 10) * 10 - 1);
  const days = useMemo(() => buildMonthDays(cursor, events), [cursor, events]);

  const moveMonth = (amount: number) => {
    setCursor((current) => addMonths(current, amount));
    setMode('calendar');
  };

  const selectMonth = (month: number) => {
    setCursor((current) => new Date(current.getFullYear(), month, 1));
    setMode('calendar');
  };

  const selectYear = (year: number) => {
    setCursor((current) => new Date(year, current.getMonth(), 1));
    setMode('months');
  };

  return (
    <section className="calendar-card" aria-labelledby="calendar-heading">
      <header className="calendar-header">
        <button className="icon-button" aria-label="이전 달" onClick={() => moveMonth(-1)} type="button"><ChevronLeft size={18} /></button>
        <button className="calendar-title-button" onClick={() => setMode(mode === 'calendar' ? 'months' : mode === 'months' ? 'years' : 'calendar')} type="button">
          <span className="eyebrow">캘린더</span>
          <strong id="calendar-heading">{cursor.getFullYear()}년 {cursor.getMonth() + 1}월</strong>
        </button>
        <button className="icon-button" aria-label="다음 달" onClick={() => moveMonth(1)} type="button"><ChevronRight size={18} /></button>
      </header>

      {mode === 'months' ? (
        <div className="month-picker" aria-label={`${cursor.getFullYear()}년 월 선택`}>
          <button className="year-selector" onClick={() => setMode('years')} type="button">{cursor.getFullYear()}년</button>
          <div className="month-picker__grid">
            {monthLabels.map((label, month) => (
              <button className={cursor.getMonth() === month ? 'is-active' : ''} key={label} onClick={() => selectMonth(month)} type="button">{label}</button>
            ))}
          </div>
        </div>
      ) : mode === 'years' ? (
        <div className="year-picker" aria-label="연도 선택">
          <div className="year-picker__header">
            <button className="icon-button" aria-label="이전 연도 묶음" onClick={() => setYearBlockStart((year) => year - 10)} type="button"><ChevronLeft size={17} /></button>
            <strong>{yearBlockStart + 1}–{yearBlockStart + 10}</strong>
            <button className="icon-button" aria-label="다음 연도 묶음" onClick={() => setYearBlockStart((year) => year + 10)} type="button"><ChevronRight size={17} /></button>
          </div>
          <div className="year-picker__grid">
            {Array.from({ length: 12 }, (_, index) => yearBlockStart + index).map((year, index) => (
              <button className={`${cursor.getFullYear() === year ? 'is-active ' : ''}${index === 0 || index === 11 ? 'is-adjacent' : ''}`.trim()} key={year} onClick={() => selectYear(year)} type="button">{year}</button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="calendar-weekdays" aria-hidden="true">{weekdays.map((day) => <span key={day}>{day}</span>)}</div>
          <div className="calendar-grid">
            {days.map((day) => {
              const classes = [
                'calendar-day',
                day.isToday ? 'is-today' : '',
                selectedDate === day.isoDate ? 'is-selected' : '',
                !day.isCurrentMonth ? 'is-outside' : '',
                day.markers.some((marker) => marker.isHoliday) ? 'is-holiday' : '',
              ].filter(Boolean).join(' ');
              const eventCount = day.userEvents.length + day.markers.length;
              return (
                <button className={classes} key={day.isoDate} aria-label={`${day.isoDate}, 일정 ${eventCount}개`} onClick={() => {
                  onSelectDate(day.isoDate);
                  if (!day.isCurrentMonth) setCursor(new Date(day.date.getFullYear(), day.date.getMonth(), 1));
                }} type="button">
                  <span>{day.day}</span>
                  <span className="event-dots" aria-hidden="true">
                    {day.markers.slice(0, 1).map((marker) => <i className="event-dot event-dot--holiday" key={marker.id} />)}
                    {day.userEvents.slice(0, 2).map((event) => <i className={`event-dot event-dot--${event.owner}`} key={event.id} />)}
                  </span>
                </button>
              );
            })}
          </div>
          <button className="today-button" onClick={() => {
            const today = new Date();
            setCursor(new Date(today.getFullYear(), today.getMonth(), 1));
            onSelectDate(toIsoDate(today));
          }} type="button">오늘</button>
        </>
      )}
    </section>
  );
}
