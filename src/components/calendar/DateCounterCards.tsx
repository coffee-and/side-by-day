import type { DateCounter } from '../../types';

interface DateCounterCardsProps {
  counters: DateCounter[];
  onSelect?: (id: string) => void;
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function getDays(counter: DateCounter) {
  const today = startOfDay(new Date());
  const target = new Date(`${counter.targetDate}T00:00:00`);
  const diff = Math.round((target.getTime() - today.getTime()) / 86400000);
  return counter.mode === 'countup' ? Math.abs(diff) + 1 : diff;
}

function getCounterLabel(counter: DateCounter, days: number) {
  if (counter.mode === 'countup') {
    return `${days}일`;
  }
  if (days === 0) {
    return 'D-Day';
  }
  return days > 0 ? `D-${days}` : `D+${Math.abs(days)}`;
}

export function DateCounterCards({ counters, onSelect }: DateCounterCardsProps) {
  return (
    <section className="counter-strip" aria-labelledby="counter-heading">
      <h2 className="visually-hidden" id="counter-heading">기억하고 싶은 날짜</h2>
      <div className="counter-strip__list">
        {counters.map((counter) => {
          const days = getDays(counter);
          return (
            <button
              className="counter-item"
              key={counter.id}
              onClick={() => onSelect?.(counter.id)}
              type="button"
            >
              {counter.icon ? <i aria-hidden="true" style={{ color: counter.color }}>{counter.icon}</i> : null}
              <span>{counter.title}</span>
              <strong>{getCounterLabel(counter, days)}</strong>
              <time className="counter-item__date" dateTime={counter.targetDate}>{counter.targetDate}</time>
            </button>
          );
        })}
      </div>
    </section>
  );
}
