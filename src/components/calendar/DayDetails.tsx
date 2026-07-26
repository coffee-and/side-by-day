import { CalendarHeart, Moon } from 'lucide-react';
import { formatLunarDate, formatSolarDate, fromIsoDate, getMarkers } from '../../services/calendarService';
import type { CalendarEvent } from '../../types';

const ownerLabel = { mine: '나', partner: '상대', together: '함께' } as const;

interface DayDetailsProps {
  selectedDate: string;
  events: CalendarEvent[];
}

export function DayDetails({ selectedDate, events }: DayDetailsProps) {
  const date = fromIsoDate(selectedDate);
  const markers = getMarkers(date);
  const dayEvents = events.filter((event) => event.date === selectedDate);

  return (
    <section className="day-details" aria-labelledby="day-detail-heading">
      <header className="day-details__header">
        <div>
          <p className="eyebrow">선택한 날짜</p>
          <h2 id="day-detail-heading">{formatSolarDate(date)}</h2>
        </div>
        <span className="lunar-badge"><Moon size={14} /> {formatLunarDate(date)}</span>
      </header>

      {markers.length > 0 ? (
        <div className="marker-list">
          {markers.map((marker) => (
            <div className={`marker-card marker-card--${marker.type}`} key={marker.id}>
              <CalendarHeart size={17} />
              <div><strong>{marker.title}</strong><span>{marker.isHoliday ? '대한민국 공휴일' : '대한민국 기념일'}</span></div>
            </div>
          ))}
        </div>
      ) : <p className="empty-message">등록된 대한민국 공휴일이나 기념일이 없어요.</p>}

      <div className="event-list day-details__events">
        {dayEvents.map((event) => (
          <article className="event-card" key={event.id}>
            <span className={`event-card__accent event-card__accent--${event.owner}`} aria-hidden="true" />
            <div className="event-card__body">
              <div className="event-card__topline"><span className={`owner-badge owner-badge--${event.owner}`}>{ownerLabel[event.owner]}</span><time>{event.time ?? '종일'}</time></div>
              <h3>{event.title}</h3>{event.note ? <p>{event.note}</p> : null}
            </div>
          </article>
        ))}
        {dayEvents.length === 0 ? <p className="empty-message">둘이 등록한 일정은 아직 없어요.</p> : null}
      </div>
    </section>
  );
}
