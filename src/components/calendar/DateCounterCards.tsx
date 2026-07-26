import type { DateCounter } from '../../types';

interface DateCounterCardsProps {
  counters: DateCounter[];
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
    return `+${days}`;
  }
  if (days === 0) {
    return 'D-Day';
  }
  return days > 0 ? `D-${days}` : `D+${Math.abs(days)}`;
}

export function DateCounterCards({ counters }: DateCounterCardsProps) {
  return (
    <section aria-labelledby="counter-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">둘의 날짜</p>
          <h2 id="counter-heading">기억하고 싶은 날</h2>
        </div>
      </div>
      <div className="counter-list">
        {counters.map((counter, index) => {
          const days = getDays(counter);
          return (
            <article className={`counter-card counter-card--${index % 2 === 0 ? 'primary' : 'secondary'}`} key={counter.id}>
              <span>{counter.title}</span>
              <strong>{getCounterLabel(counter, days)}</strong>
              <time dateTime={counter.targetDate}>{counter.targetDate}</time>
            </article>
          );
        })}
      </div>
    </section>
  );
}
