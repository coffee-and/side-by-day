import { Pin } from 'lucide-react';
import { DateCounterCards } from '../../../components/calendar/DateCounterCards';
import { toDateKey } from '../../../data/sampleData';
import type {
  CalendarEvent,
  DateCounter,
  Memo,
  TodoItem,
  WorkspaceEditorTarget,
} from '../../../types';
import {
  getEventAppearanceClassName,
  getEventAppearanceStyle,
} from '../../calendar/components/EventLabel';

interface TodayViewProps {
  events: CalendarEvent[];
  todos: TodoItem[];
  memos: Memo[];
  counters: DateCounter[];
  diaryName: string;
  onEdit: (target: WorkspaceEditorTarget) => void;
  onToggleTodo: (todoId: string) => void;
}

function formatToday(date: Date) {
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date).toUpperCase();
  const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date).toUpperCase();
  return `${month} ${date.getDate()} · ${weekday}`;
}

export function TodayView({
  events,
  todos,
  memos,
  counters,
  diaryName,
  onEdit,
  onToggleTodo,
}: TodayViewProps) {
  const today = new Date();
  const todayKey = toDateKey(today);
  const todayEvents = events
    .filter((event) => event.date === todayKey)
    .sort((left, right) => (left.time ?? '').localeCompare(right.time ?? ''));
  const todayTodos = todos.filter((todo) => todo.dueDate === todayKey && !todo.completedAt);
  const pinnedMemos = memos.filter((memo) => memo.pinned);
  const pinnedCounters = counters.filter((counter) => counter.pinned);

  return (
    <section className="workspace-view today-view" aria-labelledby="today-view-heading">
      <header className="screen-heading">
        <div>
          <h2 id="today-view-heading">{formatToday(today)}</h2>
          <p>{diaryName}</p>
        </div>
      </header>

      <section className="productivity-section" aria-labelledby="today-counters-heading">
        <div className="productivity-section__heading">
          <h3 id="today-counters-heading">D-DAY</h3>
          <span>{pinnedCounters.length}</span>
        </div>
        {pinnedCounters.length ? (
          <DateCounterCards
            counters={pinnedCounters}
            onSelect={(id) => onEdit({ kind: 'counter', id })}
          />
        ) : <p className="section-empty">고정된 D-Day가 없습니다.</p>}
      </section>

      <section className="productivity-section" aria-labelledby="today-events-heading">
        <div className="productivity-section__heading">
          <h3 id="today-events-heading">TODAY SCHEDULE</h3>
          <span>{todayEvents.length}</span>
        </div>
        {todayEvents.length ? (
          <div className="today-event-list">
            {todayEvents.map((event) => (
              <button
                className={`today-event ${getEventAppearanceClassName(event.appearance)}`}
                key={event.id}
                onClick={() => onEdit({ kind: 'event', id: event.id })}
                style={getEventAppearanceStyle(event.appearance)}
                type="button"
              >
                <time>{event.allDay ? 'ALL DAY' : event.time ?? 'ALL DAY'}</time>
                <strong>{event.title}</strong>
              </button>
            ))}
          </div>
        ) : <p className="section-empty">오늘 일정이 없습니다.</p>}
      </section>

      <section className="productivity-section" aria-labelledby="today-todos-heading">
        <div className="productivity-section__heading">
          <h3 id="today-todos-heading">TO DO</h3>
          <span>{todayTodos.length}</span>
        </div>
        {todayTodos.length ? (
          <ul className="compact-todo-list">
            {todayTodos.map((todo) => (
              <li key={todo.id}>
                <label className="todo-check">
                  <input onChange={() => onToggleTodo(todo.id)} type="checkbox" />
                  <span>{todo.title}</span>
                </label>
                <button
                  className="text-action"
                  onClick={() => onEdit({ kind: 'todo', id: todo.id })}
                  type="button"
                >
                  EDIT
                </button>
              </li>
            ))}
          </ul>
        ) : <p className="section-empty">오늘 할 일이 없습니다.</p>}
      </section>

      <section className="productivity-section" aria-labelledby="pinned-memos-heading">
        <div className="productivity-section__heading">
          <h3 id="pinned-memos-heading">PINNED NOTE</h3>
          <span>{pinnedMemos.length}</span>
        </div>
        {pinnedMemos.length ? (
          <div className="memo-preview-list">
            {pinnedMemos.map((memo) => (
              <button
                className="memo-preview"
                key={memo.id}
                onClick={() => onEdit({ kind: 'memo', id: memo.id })}
                type="button"
              >
                <Pin aria-hidden="true" size={14} />
                <strong>{memo.title}</strong>
                <span>{memo.content}</span>
              </button>
            ))}
          </div>
        ) : <p className="section-empty">고정된 메모가 없습니다.</p>}
      </section>
    </section>
  );
}
