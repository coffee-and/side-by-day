import { CalendarClock, CheckCircle2, Pin, Plus } from 'lucide-react';
import { useState } from 'react';
import { DateCounterCards } from '../../../components/calendar/DateCounterCards';
import { toDateKey } from '../../../data/sampleData';
import type { CalendarEvent, DateCounter, Memo, TodoItem } from '../../../types';
import { EventLabel } from '../../calendar/components/EventLabel';

interface TodayViewProps {
  events: CalendarEvent[];
  todos: TodoItem[];
  memos: Memo[];
  counters: DateCounter[];
  onToggleTodo: (todoId: string) => void;
  onAddCounter: (title: string, targetDate: string, mode: DateCounter['mode']) => void;
}

function formatToday(date: Date) {
  return new Intl.DateTimeFormat('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(date);
}

export function TodayView({
  events,
  todos,
  memos,
  counters,
  onToggleTodo,
  onAddCounter,
}: TodayViewProps) {
  const today = new Date();
  const todayKey = toDateKey(today);
  const todayEvents = events
    .filter((event) => event.date === todayKey)
    .sort((left, right) => (left.time ?? '').localeCompare(right.time ?? ''));
  const todayTodos = todos.filter((todo) => todo.dueDate === todayKey && !todo.completedAt);
  const pinnedMemos = memos.filter((memo) => memo.pinned);
  const pinnedCounters = counters.filter((counter) => counter.pinned);
  const [counterTitle, setCounterTitle] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [counterMode, setCounterMode] = useState<DateCounter['mode']>('countdown');

  function submitCounter() {
    onAddCounter(counterTitle, targetDate, counterMode);
    setCounterTitle('');
    setTargetDate('');
  }

  return (
    <section className="workspace-view" aria-labelledby="today-view-heading">
      <header className="workspace-view__header">
        <div>
          <p className="eyebrow">오늘</p>
          <h2 id="today-view-heading">{formatToday(today)}</h2>
        </div>
        <span className="space-chip">내 공간</span>
      </header>

      <section className="productivity-section" aria-labelledby="counter-section-heading">
        <div className="productivity-section__heading">
          <div>
            <p className="eyebrow">D-Day</p>
            <h3 id="counter-section-heading">챙기고 싶은 날짜</h3>
          </div>
        </div>
        <DateCounterCards counters={pinnedCounters} />
        <div className="quick-entry quick-entry--counter">
          <label>
            <span>제목</span>
            <input
              onChange={(event) => setCounterTitle(event.target.value)}
              placeholder="예: 여름휴가"
              type="text"
              value={counterTitle}
            />
          </label>
          <label>
            <span>날짜</span>
            <span className="native-input-wrap">
              <input
                onChange={(event) => setTargetDate(event.target.value)}
                type="date"
                value={targetDate}
              />
            </span>
          </label>
          <label>
            <span>방식</span>
            <select
              onChange={(event) => setCounterMode(event.target.value as DateCounter['mode'])}
              value={counterMode}
            >
              <option value="countdown">다가오는 날</option>
              <option value="countup">지나온 날</option>
            </select>
          </label>
          <button className="compact-action" onClick={submitCounter} type="button">
            <Plus aria-hidden="true" size={16} /> 추가
          </button>
        </div>
      </section>

      <div className="today-grid">
        <section className="productivity-section" aria-labelledby="today-events-heading">
          <div className="productivity-section__heading">
            <div>
              <p className="eyebrow">일정</p>
              <h3 id="today-events-heading">오늘 일정</h3>
            </div>
            <span className="count-badge">{todayEvents.length}</span>
          </div>
          {todayEvents.length ? (
            <div className="today-event-list">
              {todayEvents.map((event) => (
                <article className="today-event" key={event.id}>
                  <time>{event.time ?? '종일'}</time>
                  <EventLabel event={event} />
                </article>
              ))}
            </div>
          ) : (
            <p className="section-empty"><CalendarClock aria-hidden="true" size={18} /> 오늘 일정이 없어요.</p>
          )}
        </section>

        <section className="productivity-section" aria-labelledby="today-todos-heading">
          <div className="productivity-section__heading">
            <div>
              <p className="eyebrow">할 일</p>
              <h3 id="today-todos-heading">오늘 할 일</h3>
            </div>
            <span className="count-badge">{todayTodos.length}</span>
          </div>
          {todayTodos.length ? (
            <ul className="compact-todo-list">
              {todayTodos.map((todo) => (
                <li key={todo.id}>
                  <label className="todo-check">
                    <input
                      checked={Boolean(todo.completedAt)}
                      onChange={() => onToggleTodo(todo.id)}
                      type="checkbox"
                    />
                    <span>{todo.title}</span>
                  </label>
                </li>
              ))}
            </ul>
          ) : (
            <p className="section-empty"><CheckCircle2 aria-hidden="true" size={18} /> 오늘 할 일을 마쳤어요.</p>
          )}
        </section>
      </div>

      <section className="productivity-section" aria-labelledby="pinned-memos-heading">
        <div className="productivity-section__heading">
          <div>
            <p className="eyebrow">메모</p>
            <h3 id="pinned-memos-heading">고정 메모</h3>
          </div>
        </div>
        <div className="memo-preview-list">
          {pinnedMemos.map((memo) => (
            <article className="memo-preview" key={memo.id}>
              <Pin aria-hidden="true" size={15} />
              <div>
                <h4>{memo.title}</h4>
                <p>{memo.content}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
