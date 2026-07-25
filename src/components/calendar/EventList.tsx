import type { CalendarEvent } from '../../types';

const ownerLabel = {
  mine: '나',
  partner: '상대',
  together: '함께',
} as const;

interface EventListProps {
  events: CalendarEvent[];
}

export function EventList({ events }: EventListProps) {
  return (
    <section className="agenda" aria-labelledby="agenda-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">오늘</p>
          <h2 id="agenda-heading">우리의 일정</h2>
        </div>
        <span className="count-badge">{events.length}</span>
      </div>

      <div className="event-list">
        {events.map((event) => (
          <article className="event-card" key={event.id}>
            <span className={`event-card__accent event-card__accent--${event.owner}`} aria-hidden="true" />
            <div className="event-card__body">
              <div className="event-card__topline">
                <span className={`owner-badge owner-badge--${event.owner}`}>{ownerLabel[event.owner]}</span>
                <time>{event.time ?? '종일'}</time>
              </div>
              <h3>{event.title}</h3>
              {event.note ? <p>{event.note}</p> : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
