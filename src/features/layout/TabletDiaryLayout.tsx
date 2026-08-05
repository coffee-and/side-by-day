import { AppHeader } from '../../components/ui/AppHeader';
import { ContextualAdd } from '../../components/ui/ContextualAdd';
import { SectionNavigation } from '../../components/ui/SectionNavigation';
import { DateCounterCards } from '../../components/calendar/DateCounterCards';
import { Pin } from 'lucide-react';
import { toDateKey } from '../calendar/lib/dateUtils';
import { DiarySection, SelectedPanel } from './DiarySection';
import type { DiaryLayoutProps } from './layoutTypes';

export function TabletDiaryLayout(props: DiaryLayoutProps) {
  const pinnedMemos = props.workspace.memos.filter((memo) => memo.pinned);
  const pinnedCounters = props.workspace.counters.filter((counter) => counter.pinned);

  return (
    <div className="tablet-layout">
      <AppHeader
        onSignOut={props.onSignOut}
        onToggleTheme={props.onToggleTheme}
        theme={props.theme}
        workspace={props.workspace}
      />
      <SectionNavigation
        activeSection={props.activeSection}
        className="tablet-navigation"
        onChange={props.onChangeSection}
      />
      <main className="tablet-workspace">
        <div className="tablet-workspace__primary">
          <DiarySection
            activeSection={props.activeSection}
            calendar={props.calendar}
            onEdit={props.onEdit}
            workspace={props.workspace}
          />
        </div>
        <SelectedPanel
          calendar={props.calendar}
          onEdit={props.onEdit}
          workspace={props.workspace}
        />
        <section className="tablet-overview" aria-label="고정 항목">
          <div className="tablet-overview__section">
            <h2>D-DAY</h2>
            <DateCounterCards
              counters={pinnedCounters}
              onSelect={(id) => props.onEdit({ kind: 'counter', id })}
            />
          </div>
          <div className="tablet-overview__section">
            <h2>PINNED NOTES</h2>
            {pinnedMemos.map((memo) => (
              <button
                className="memo-preview"
                key={memo.id}
                onClick={() => props.onEdit({ kind: 'memo', id: memo.id })}
                type="button"
              >
                <Pin aria-hidden="true" size={14} />
                <strong>{memo.title}</strong>
                <span>{memo.content}</span>
              </button>
            ))}
          </div>
        </section>
      </main>
      <ContextualAdd
        activeSection={props.activeSection}
        onSelect={props.onEdit}
        selectedDate={toDateKey(props.calendar.selectedDate)}
      />
    </div>
  );
}
