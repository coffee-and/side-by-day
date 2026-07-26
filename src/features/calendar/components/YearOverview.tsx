interface YearOverviewProps {
  years: number[];
  selectedYear: number;
  onSelectYear: (year: number) => void;
}

export function YearOverview({ years, selectedYear, onSelectYear }: YearOverviewProps) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="year-overview" aria-label="연도 선택">
      {years.map((year) => (
        <button
          className={`year-option${year === selectedYear ? ' is-selected' : ''}${year === currentYear ? ' is-current' : ''}`}
          key={year}
          onClick={() => onSelectYear(year)}
          type="button"
        >
          <span>{year}</span>
          {year === currentYear ? <small>올해</small> : null}
        </button>
      ))}
    </div>
  );
}
