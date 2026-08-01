import { buildMonthCells, createLocalDate, monthLabels } from '../lib/dateUtils';

interface MonthOverviewProps {
  year: number;
  selectedMonth: number;
  onSelectMonth: (year: number, month: number) => void;
}

function MiniMonth({ year, month }: { year: number; month: number }) {
  const cells = buildMonthCells(createLocalDate(year, month, 1));

  return (
    <span className="mini-month-grid" aria-hidden="true">
      {cells.map((cell) => (
        <span className={cell.isCurrentMonth ? '' : 'is-empty'} key={cell.key}>
          {cell.isCurrentMonth ? cell.date.getDate() : ''}
        </span>
      ))}
    </span>
  );
}

export function MonthOverview({ year, selectedMonth, onSelectMonth }: MonthOverviewProps) {
  const now = new Date();
  const visibleYears = [year, year + 1];

  return (
    <div className="month-overview-sequence" aria-label={`${year}년부터 ${year + 1}년까지 전체 월`}>
      {visibleYears.map((visibleYear) => (
        <section className="month-overview-year" key={visibleYear}>
          <header className="month-overview-year__header">
            <h2>{visibleYear}년</h2>
            {visibleYear === year + 1 ? <span>다음 해</span> : null}
          </header>
          <div className="month-overview">
            {monthLabels.map((label, month) => {
              const isSelected = visibleYear === year && month === selectedMonth;
              const isCurrent = visibleYear === now.getFullYear() && month === now.getMonth();

              return (
                <button
                  className={`mini-month${isSelected ? ' is-selected' : ''}${isCurrent ? ' is-current' : ''}`}
                  key={label}
                  onClick={() => onSelectMonth(visibleYear, month)}
                  type="button"
                >
                  <strong>{label}</strong>
                  <MiniMonth month={month} year={visibleYear} />
                </button>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
