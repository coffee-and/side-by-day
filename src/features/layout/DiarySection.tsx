import { sampleDayDecorations } from '../../data/sampleData';
import type { AppSection, WorkspaceEditorTarget } from '../../types';
import { CalendarWorkspace } from '../calendar/CalendarWorkspace';
import { SelectedDatePanel } from '../calendar/components/SelectedDatePanel';
import type { CalendarState } from '../calendar/hooks/useCalendar';
import { NotesView } from '../workspace/components/NotesView';
import { TodayView } from '../workspace/components/TodayView';
import { TodoListView } from '../workspace/components/TodoListView';
import type { Workspace } from '../workspace/hooks/useWorkspace';

interface DiarySectionProps {
  activeSection: AppSection;
  calendar: CalendarState;
  workspace: Workspace;
  onEdit: (target: WorkspaceEditorTarget) => void;
  includeCalendarDetails?: boolean;
}

export function DiarySection({
  activeSection,
  calendar,
  workspace,
  onEdit,
  includeCalendarDetails = false,
}: DiarySectionProps) {
  if (activeSection === 'today') {
    return (
      <TodayView
        counters={workspace.counters}
        diaryName={workspace.activeSpace.name}
        events={workspace.events}
        memos={workspace.memos}
        onEdit={onEdit}
        onToggleTodo={workspace.toggleTodo}
        todos={workspace.todos}
      />
    );
  }

  if (activeSection === 'todos') {
    return (
      <TodoListView
        onEdit={onEdit}
        onToggleTodo={workspace.toggleTodo}
        todos={workspace.todos}
      />
    );
  }

  if (activeSection === 'notes') {
    return (
      <NotesView
        memos={workspace.memos}
        onEdit={onEdit}
        onTogglePin={workspace.toggleMemoPin}
      />
    );
  }

  return (
    <section className="calendar-view">
      <CalendarWorkspace
        calendar={calendar}
        dayDecorations={sampleDayDecorations}
        events={workspace.events}
      />
      {includeCalendarDetails ? (
        <SelectedPanel calendar={calendar} onEdit={onEdit} workspace={workspace} />
      ) : null}
    </section>
  );
}

export function SelectedPanel({
  calendar,
  workspace,
  onEdit,
}: {
  calendar: CalendarState;
  workspace: Workspace;
  onEdit: (target: WorkspaceEditorTarget) => void;
}) {
  return (
    <SelectedDatePanel
      counters={workspace.counters}
      date={calendar.selectedDate}
      events={workspace.events}
      hasCalendarDataError={calendar.hasCalendarDataError}
      isCalendarDataLoading={calendar.isCalendarDataLoading}
      koreanEvents={calendar.koreanEvents}
      memos={workspace.memos}
      onEdit={onEdit}
      onToggleTodo={workspace.toggleTodo}
      todos={workspace.todos}
    />
  );
}
