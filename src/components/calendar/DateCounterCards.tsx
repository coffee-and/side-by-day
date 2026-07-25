import type { DateCounter } from '../../types';

interface DateCounterCardsProps {
  counters: DateCounter[];
}

function getDays(counter: DateCounter) {
  const today = new Date('2026-07-26T00:00:00');
  const target = new Date(`${counter.targetDate}T00:00:00`);
  const diff = Math.round((target.getTime() - today.getTime()) / 86400000);
  return counter.mode === 'countup' ? Math.abs(diff) + 1 : diff;
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
              <strong>{counter.mode === 'countup' ? `+${days}` : `D-${Math.max(days, 0)}`}</strong>
              <time>{counter.targetDate}</time>
            </article>
          );
        })}
      </div>
    </section>
  );
}
