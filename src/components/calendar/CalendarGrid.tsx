import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { CalendarEvent } from '../../types';

interface CalendarGridProps {
  events: CalendarEvent[];
}

const days = Array.from({ length: 31 }, (_, index) => index + 1);
const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

export function CalendarGrid({ events }: CalendarGridProps) {
  return (
    <section className="calendar-card" aria-labelledby="calendar-heading">
      <header className="calendar-header">
        <button className="icon-button" aria-label="이전 달"><ChevronLeft size={20} /></button>
        <div>
          <p className="eyebrow">이번 달</p>
          <h2 id="calendar-heading">2026년 7월</h2>
        </div>
        <button className="icon-button" aria-label="다음 달"><ChevronRight size={20} /></button>
      </header>

      <div className="calendar-weekdays" aria-hidden="true">
        {weekdays.map((day) => <span key={day}>{day}</span>)}
      </div>

      <div className="calendar-grid">
        {Array.from({ length: 3 }).map((_, index) => <span key={`blank-${index}`} />)}
        {days.map((day) => {
          const date = `2026-07-${String(day).padStart(2, '0')}`;
          const dayEvents = events.filter((event) => event.date === date);
          const isToday = day === 26;
          return (
            <button className={`calendar-day${isToday ? ' is-today' : ''}`} key={day} aria-label={`${day}일, 일정 ${dayEvents.length}개`}>
              <span>{day}</span>
              <span className="event-dots" aria-hidden="true">
                {dayEvents.slice(0, 3).map((event) => <i className={`event-dot event-dot--${event.owner}`} key={event.id} />)}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
