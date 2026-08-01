import { Flag, MoonStar, Pencil, Pin } from 'lucide-react';
import { useMemo } from 'react';
import { DateCounterCards } from '../../../components/calendar/DateCounterCards';
import type {
  CalendarEvent,
  DateCounter,
  Memo,
  TodoItem,
  WorkspaceEditorTarget,
} from '../../../types';
import { formatLongDate, toDateKey } from '../lib/dateUtils';
import {
  hasOfficialHolidayData,
  OFFICIAL_HOLIDAY_DATA_RANGE,
} from '../services/koreanCalendarService';
import { getKoreanLunarDate } from '../services/lunarCalendarService';
import type { KoreanCalendarEvent } from '../types';
import {
  getEventAppearanceClassName,
  getEventAppearanceStyle,
} from './EventLabel';
import { EventIcon } from '../../events/EventIcon';

interface SelectedDatePanelProps {
  date: Date;
  events: CalendarEvent[];
  todos: TodoItem[];
  memos: Memo[];
  counters: DateCounter[];
  koreanEvents: KoreanCalendarEvent[];
  isCalendarDataLoading: boolean;
  hasCalendarDataError: boolean;
  onEdit: (target: WorkspaceEditorTarget) => void;
  onToggleTodo: (id: string) => void;
}

export function SelectedDatePanel({
  date,
  events,
  todos,
  memos,
  counters,
  koreanEvents,
  isCalendarDataLoading,
  hasCalendarDataError,
  onEdit,
  onToggleTodo,
}: SelectedDatePanelProps) {
  const dateKey = toDateKey(date);
  const lunar = useMemo(() => getKoreanLunarDate(date), [dateKey]);
  const dayEvents = events
    .filter((event) => event.date === dateKey)
    .sort((left, right) => (left.time ?? '').localeCompare(right.time ?? ''));
  const dayTodos = todos.filter((todo) => todo.dueDate === dateKey);
  const linkedMemos = memos.filter((memo) => memo.linkedDate === dateKey);
  const pinnedCounters = counters.filter((counter) => counter.pinned);
  const dayKoreanEvents = koreanEvents.filter((event) => event.date === dateKey);
  const isOfficialHolidayYearSupported = hasOfficialHolidayData(date.getFullYear());

  const emptyKoreanCalendarMessage = isCalendarDataLoading
    ? '공휴일 정보 확인 중'
    : hasCalendarDataError
      ? '주요 기념일만 표시 중'
      : isOfficialHolidayYearSupported
        ? '등록된 기념일 없음'
        : `공식 데이터 ${OFFICIAL_HOLIDAY_DATA_RANGE.start}–${OFFICIAL_HOLIDAY_DATA_RANGE.end}`;

  return (
    <aside className="date-details" aria-labelledby="date-details-heading">
      <header className="date-details__header">
        <p className="eyebrow">SELECTED DATE</p>
        <h2 id="date-details-heading">{formatLongDate(date)}</h2>
      </header>

      <div className="date-facts">
        <div className="date-fact">
          <MoonStar aria-hidden="true" size={16} />
          <span>음력 {lunar?.label ?? '지원 범위 밖'}</span>
          {lunar?.gapja ? <small>{lunar.gapja}</small> : null}
        </div>
        <div className="date-fact">
          <Flag aria-hidden="true" size={16} />
          <span>
            {dayKoreanEvents.length
              ? dayKoreanEvents.map((event) => event.name).join(' · ')
              : emptyKoreanCalendarMessage}
          </span>
        </div>
      </div>

      <section className="detail-section" aria-labelledby="selected-events-heading">
        <div className="detail-section__heading">
          <h3 id="selected-events-heading">EVENTS</h3>
          <span>{dayEvents.length}</span>
        </div>
        {dayEvents.length ? (
          <div className="event-list">
            {dayEvents.map((event) => (
              <button
                className={`event-card ${getEventAppearanceClassName(event.appearance)}`}
                key={event.id}
                onClick={() => onEdit({ kind: 'event', id: event.id })}
                style={getEventAppearanceStyle(event.appearance)}
                type="button"
              >
                <time>{event.allDay ? 'ALL DAY' : event.time ?? 'ALL DAY'}</time>
                <span className="event-card__title">
                  {event.iconId ? <EventIcon iconId={event.iconId} size={18} /> : null}
                  <strong>{event.title}</strong>
                </span>
                {event.note ? <small>{event.note}</small> : null}
                <Pencil aria-hidden="true" size={13} />
              </button>
            ))}
          </div>
        ) : <p className="section-empty">이 날짜의 일정이 없습니다.</p>}
      </section>

      <section className="detail-section" aria-labelledby="selected-todos-heading">
        <div className="detail-section__heading">
          <h3 id="selected-todos-heading">TO DO</h3>
          <span>{dayTodos.length}</span>
        </div>
        {dayTodos.length ? (
          <ul className="compact-todo-list">
            {dayTodos.map((todo) => (
              <li key={todo.id}>
                <label className="todo-check">
                  <input
                    checked={Boolean(todo.completedAt)}
                    onChange={() => onToggleTodo(todo.id)}
                    type="checkbox"
                  />
                  <span>{todo.title}</span>
                </label>
                <button
                  aria-label={`${todo.title} 편집`}
                  className="row-action"
                  onClick={() => onEdit({ kind: 'todo', id: todo.id })}
                  type="button"
                >
                  <Pencil aria-hidden="true" size={14} />
                </button>
              </li>
            ))}
          </ul>
        ) : <p className="section-empty">연결된 할 일이 없습니다.</p>}
      </section>

      <section className="detail-section" aria-labelledby="selected-notes-heading">
        <div className="detail-section__heading">
          <h3 id="selected-notes-heading">LINKED NOTES</h3>
          <span>{linkedMemos.length}</span>
        </div>
        {linkedMemos.length ? (
          <div className="memo-preview-list">
            {linkedMemos.map((memo) => (
              <button
                className="memo-preview"
                key={memo.id}
                onClick={() => onEdit({ kind: 'memo', id: memo.id })}
                type="button"
              >
                {memo.pinned ? <Pin aria-hidden="true" size={13} /> : null}
                <strong>{memo.title}</strong>
                <span>{memo.content}</span>
              </button>
            ))}
          </div>
        ) : <p className="section-empty">연결된 메모가 없습니다.</p>}
      </section>

      <section className="detail-section" aria-labelledby="selected-counters-heading">
        <div className="detail-section__heading">
          <h3 id="selected-counters-heading">D-DAY</h3>
          <span>{pinnedCounters.length}</span>
        </div>
        <DateCounterCards
          counters={pinnedCounters}
          onSelect={(id) => onEdit({ kind: 'counter', id })}
        />
      </section>
    </aside>
  );
}
