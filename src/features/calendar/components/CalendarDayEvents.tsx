import { useLayoutEffect, useRef, useState } from 'react';
import type { CalendarDayDecoration, CalendarEvent } from '../../../types';
import { EventLabel } from './EventLabel';

const EVENT_ROW_HEIGHT = 17;
const EVENT_ROW_GAP = 2;

interface CalendarDayEventsProps {
  events: CalendarEvent[];
  decoration?: CalendarDayDecoration;
}

export function CalendarDayEvents({ events, decoration }: CalendarDayEventsProps) {
  const linesRef = useRef<HTMLSpanElement>(null);
  const [visibleCount, setVisibleCount] = useState(events.length);

  useLayoutEffect(() => {
    const element = linesRef.current;
    if (!element) {
      return undefined;
    }

    function measure() {
      const availableHeight = element.clientHeight;
      const maxRows = Math.max(
        0,
        Math.floor((availableHeight + EVENT_ROW_GAP) / (EVENT_ROW_HEIGHT + EVENT_ROW_GAP)),
      );
      const nextVisibleCount = events.length > maxRows
        ? Math.max(0, maxRows - 1)
        : Math.min(events.length, maxRows);

      setVisibleCount(nextVisibleCount);
    }

    measure();

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }

    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [events.length, decoration?.icon]);

  const hasOverflow = events.length > visibleCount;

  return (
    <span className="calendar-day__event-area" aria-hidden="true">
      {decoration ? (
        <span className="calendar-day__icon" title={decoration.label}>{decoration.icon}</span>
      ) : null}
      <span className="calendar-day__event-lines" ref={linesRef}>
        {events.slice(0, visibleCount).map((event) => (
          <EventLabel event={event} key={event.id} />
        ))}
        {hasOverflow ? <span className="calendar-day__overflow">…</span> : null}
      </span>
    </span>
  );
}
