import { CalendarDays, UserRound } from 'lucide-react';
import { useState } from 'react';
import { BottomNavigation } from './components/ui/BottomNavigation';
import { ThemeToggle } from './components/ui/ThemeToggle';
import { sampleDayDecorations } from './data/sampleData';
import { CalendarWorkspace } from './features/calendar/CalendarWorkspace';
import { NotesView } from './features/workspace/components/NotesView';
import { TodayView } from './features/workspace/components/TodayView';
import { TodoListView } from './features/workspace/components/TodoListView';
import { usePersonalWorkspace } from './features/workspace/hooks/usePersonalWorkspace';
import { useTheme } from './hooks/useTheme';
import type { AppSection } from './types';

export function App() {
  const { theme, toggleTheme } = useTheme();
  const workspace = usePersonalWorkspace();
  const [activeSection, setActiveSection] = useState<AppSection>('today');

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__brand">
          <span className="brand-mark" aria-hidden="true">
            <CalendarDays size={19} strokeWidth={2} />
          </span>
          <div>
            <h1>Side by Day</h1>
            <p className="app-header__description">내 하루를 한곳에</p>
          </div>
        </div>

        <div className="app-header__actions">
          <span className="personal-space-indicator">
            <UserRound aria-hidden="true" size={15} />
            {workspace.personalSpace.name}
          </span>
          <ThemeToggle onToggle={toggleTheme} theme={theme} />
        </div>
      </header>

      <main className="app-main">
        {activeSection === 'today' ? (
          <TodayView
            counters={workspace.counters}
            events={workspace.events}
            memos={workspace.memos}
            onAddCounter={workspace.addCounter}
            onToggleTodo={workspace.toggleTodo}
            todos={workspace.todos}
          />
        ) : null}

        {activeSection === 'calendar' ? (
          <section className="workspace-view" aria-labelledby="calendar-view-heading">
            <header className="workspace-view__header">
              <div>
                <p className="eyebrow">캘린더</p>
                <h2 id="calendar-view-heading">내 일정</h2>
              </div>
              <span className="space-chip">{workspace.personalSpace.name}</span>
            </header>
            <CalendarWorkspace dayDecorations={sampleDayDecorations} events={workspace.events} />
          </section>
        ) : null}

        {activeSection === 'todos' ? (
          <TodoListView
            onAddTodo={workspace.addTodo}
            onToggleTodo={workspace.toggleTodo}
            todos={workspace.todos}
          />
        ) : null}

        {activeSection === 'notes' ? (
          <NotesView memos={workspace.memos} onAddMemo={workspace.addMemo} />
        ) : null}
      </main>

      <BottomNavigation activeSection={activeSection} onChange={setActiveSection} />
    </div>
  );
}
