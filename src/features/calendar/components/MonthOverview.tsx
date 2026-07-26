import { buildMonthCells, createLocalDate, monthLabels } from '../lib/dateUtils';

interface MonthOverviewProps {
  year: number;
  selectedMonth: number;
  onSelectMonth: (month: number) => void;
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

  return (
    <div className="month-overview" aria-label={`${year}년 전체 월`}>
      {monthLabels.map((label, month) => {
        const isSelected = month === selectedMonth;
        const isCurrent = year === now.getFullYear() && month === now.getMonth();

        return (
          <button
            className={`mini-month${isSelected ? ' is-selected' : ''}${isCurrent ? ' is-current' : ''}`}
            key={label}
            onClick={() => onSelectMonth(month)}
            type="button"
          >
            <strong>{label}</strong>
            <MiniMonth month={month} year={year} />
          </button>
        );
      })}
    </div>
  );
}
