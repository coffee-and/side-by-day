import { ChevronDown, Star } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toDateKey } from '../../../data/sampleData';
import type { TodoItem, WorkspaceEditorTarget } from '../../../types';

type TodoFilter = 'all' | 'today' | 'upcoming' | 'no-date';

interface TodoListViewProps {
  todos: TodoItem[];
  onEdit: (target: WorkspaceEditorTarget) => void;
  onToggleTodo: (todoId: string) => void;
}

const filters: { label: string; value: TodoFilter }[] = [
  { label: 'ALL', value: 'all' },
  { label: 'TODAY', value: 'today' },
  { label: 'UPCOMING', value: 'upcoming' },
  { label: 'NO DATE', value: 'no-date' },
];

export function TodoListView({ todos, onEdit, onToggleTodo }: TodoListViewProps) {
  const [filter, setFilter] = useState<TodoFilter>('all');
  const todayKey = toDateKey(new Date());
  const openTodos = useMemo(
    () => todos.filter((todo) => !todo.completedAt),
    [todos],
  );
  const completedTodos = useMemo(
    () => todos.filter((todo) => todo.completedAt),
    [todos],
  );
  const groups = [
    {
      id: 'today',
      title: 'TODAY',
      items: openTodos.filter((todo) => todo.dueDate === todayKey),
    },
    {
      id: 'upcoming',
      title: 'UPCOMING',
      items: openTodos
        .filter((todo) => todo.dueDate && todo.dueDate > todayKey)
        .sort((left, right) => (left.dueDate ?? '').localeCompare(right.dueDate ?? '')),
    },
    {
      id: 'no-date',
      title: 'NO DATE',
      items: openTodos.filter((todo) => !todo.dueDate),
    },
  ].filter((group) => filter === 'all' || filter === group.id);

  return (
    <section className="workspace-view todo-view" aria-labelledby="todo-view-heading">
      <header className="screen-heading">
        <h2 id="todo-view-heading">TO DO</h2>
      </header>

      <div className="text-tabs" role="tablist" aria-label="할 일 필터">
        {filters.map((item) => (
          <button
            aria-selected={filter === item.value}
            className={filter === item.value ? 'is-active' : ''}
            key={item.value}
            onClick={() => setFilter(item.value)}
            role="tab"
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>

      {groups.map((group) => (
        <section className="productivity-section" key={group.id}>
          <div className="productivity-section__heading">
            <h3>{group.title}</h3>
            <span>{group.items.length}</span>
          </div>
          {group.items.length ? (
            <ul className="todo-list">
              {group.items.map((todo) => (
                <TodoRow
                  key={todo.id}
                  onEdit={onEdit}
                  onToggleTodo={onToggleTodo}
                  todo={todo}
                />
              ))}
            </ul>
          ) : <p className="section-empty">항목이 없습니다.</p>}
        </section>
      ))}

      <details className="completed-section">
        <summary>
          <span>COMPLETED · {completedTodos.length}</span>
          <ChevronDown aria-hidden="true" size={16} />
        </summary>
        {completedTodos.length ? (
          <ul className="todo-list todo-list--completed">
            {completedTodos.map((todo) => (
              <TodoRow
                key={todo.id}
                onEdit={onEdit}
                onToggleTodo={onToggleTodo}
                todo={todo}
              />
            ))}
          </ul>
        ) : <p className="section-empty">완료한 할 일이 없습니다.</p>}
      </details>
    </section>
  );
}

function TodoRow({
  todo,
  onEdit,
  onToggleTodo,
}: {
  todo: TodoItem;
  onEdit: (target: WorkspaceEditorTarget) => void;
  onToggleTodo: (todoId: string) => void;
}) {
  return (
    <li className="todo-row">
      <label className="todo-check">
        <input
          checked={Boolean(todo.completedAt)}
          onChange={() => onToggleTodo(todo.id)}
          type="checkbox"
        />
        <span>{todo.title}</span>
      </label>
      <div className="todo-row__meta">
        {todo.important ? <Star aria-label="중요" fill="currentColor" size={13} /> : null}
        <time>{todo.dueDate ?? 'NO DATE'}</time>
        <button onClick={() => onEdit({ kind: 'todo', id: todo.id })} type="button">EDIT</button>
      </div>
    </li>
  );
}
