import { Check, Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { TodoItem } from '../../../types';

interface TodoListViewProps {
  todos: TodoItem[];
  onAddTodo: (title: string, dueDate?: string) => void;
  onToggleTodo: (todoId: string) => void;
}

export function TodoListView({ todos, onAddTodo, onToggleTodo }: TodoListViewProps) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const openTodos = useMemo(
    () => todos.filter((todo) => !todo.completedAt),
    [todos],
  );
  const completedTodos = useMemo(
    () => todos.filter((todo) => todo.completedAt),
    [todos],
  );

  function submitTodo() {
    onAddTodo(title, dueDate || undefined);
    setTitle('');
    setDueDate('');
  }

  return (
    <section className="workspace-view" aria-labelledby="todo-view-heading">
      <header className="workspace-view__header">
        <div>
          <p className="eyebrow">할 일</p>
          <h2 id="todo-view-heading">내가 챙길 일</h2>
        </div>
        <span className="space-chip">내 공간</span>
      </header>

      <section className="productivity-section" aria-labelledby="todo-add-heading">
        <div className="productivity-section__heading">
          <div>
            <p className="eyebrow">빠른 추가</p>
            <h3 id="todo-add-heading">새 할 일</h3>
          </div>
        </div>
        <div className="quick-entry quick-entry--todo">
          <label className="quick-entry__wide">
            <span>할 일</span>
            <input
              onChange={(event) => setTitle(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  submitTodo();
                }
              }}
              placeholder="할 일을 입력하세요"
              type="text"
              value={title}
            />
          </label>
          <label>
            <span>기한</span>
            <span className="native-input-wrap">
              <input
                onChange={(event) => setDueDate(event.target.value)}
                type="date"
                value={dueDate}
              />
            </span>
          </label>
          <button className="compact-action" onClick={submitTodo} type="button">
            <Plus aria-hidden="true" size={16} /> 추가
          </button>
        </div>
      </section>

      <section className="productivity-section" aria-labelledby="open-todos-heading">
        <div className="productivity-section__heading">
          <h3 id="open-todos-heading">진행 중</h3>
          <span className="count-badge">{openTodos.length}</span>
        </div>
        <ul className="todo-list">
          {openTodos.map((todo) => (
            <li className="todo-row" key={todo.id}>
              <label className="todo-check">
                <input onChange={() => onToggleTodo(todo.id)} type="checkbox" />
                <span>{todo.title}</span>
              </label>
              <time>{todo.dueDate ?? '날짜 없음'}</time>
            </li>
          ))}
        </ul>
      </section>

      <section className="productivity-section" aria-labelledby="completed-todos-heading">
        <div className="productivity-section__heading">
          <h3 id="completed-todos-heading">완료</h3>
          <span className="count-badge">{completedTodos.length}</span>
        </div>
        {completedTodos.length ? (
          <ul className="todo-list todo-list--completed">
            {completedTodos.map((todo) => (
              <li className="todo-row" key={todo.id}>
                <label className="todo-check">
                  <input checked onChange={() => onToggleTodo(todo.id)} type="checkbox" />
                  <span>{todo.title}</span>
                </label>
                <Check aria-hidden="true" size={16} />
              </li>
            ))}
          </ul>
        ) : <p className="section-empty">완료한 할 일이 아직 없어요.</p>}
      </section>
    </section>
  );
}
