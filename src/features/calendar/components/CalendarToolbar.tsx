import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { CalendarViewMode } from '../types';

interface CalendarToolbarProps {
  viewMode: CalendarViewMode;
  visibleMonth: Date;
  years: number[];
  onPrevious: () => void;
  onNext: () => void;
  onOpenMonths: () => void;
  onOpenYears: () => void;
  onToday: () => void;
}

export function CalendarToolbar({
  viewMode,
  visibleMonth,
  years,
  onPrevious,
  onNext,
  onOpenMonths,
  onOpenYears,
  onToday,
}: CalendarToolbarProps) {
  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth() + 1;

  return (
    <header className="calendar-toolbar">
      <button className="icon-button" type="button" onClick={onPrevious} aria-label="이전 기간">
        <ChevronLeft size={19} />
      </button>

      {viewMode === 'month' ? (
        <button className="calendar-period-button" type="button" onClick={onOpenMonths}>
          <span>{year}년</span>
          <strong>{month}월</strong>
        </button>
      ) : null}

      {viewMode === 'months' ? (
        <button className="calendar-period-button" type="button" onClick={onOpenYears}>
          <span>전체 월 보기</span>
          <strong>{year}년</strong>
        </button>
      ) : null}

      {viewMode === 'years' ? (
        <div className="calendar-period-button calendar-period-button--static">
          <span>연도 선택</span>
          <strong>{years[0]}–{years.at(-1)}</strong>
        </div>
      ) : null}

      <button className="icon-button" type="button" onClick={onNext} aria-label="다음 기간">
        <ChevronRight size={19} />
      </button>

      <button className="calendar-today-button" type="button" onClick={onToday}>오늘</button>
    </header>
  );
}
