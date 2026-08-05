import { LogOut } from 'lucide-react';
import { ContextualAdd } from '../../components/ui/ContextualAdd';
import { DiarySelector } from '../../components/ui/DiarySelector';
import { SectionNavigation } from '../../components/ui/SectionNavigation';
import { ThemeToggle } from '../../components/ui/ThemeToggle';
import { toDateKey } from '../calendar/lib/dateUtils';
import { DiarySection, SelectedPanel } from './DiarySection';
import type { DiaryLayoutProps } from './layoutTypes';

export function DesktopDiaryLayout(props: DiaryLayoutProps) {
  return (
    <div className="desktop-layout">
      <aside className="desktop-sidebar">
        <header>
          <h1>SIDE BY DAY</h1>
          <div className="desktop-sidebar__actions">
            <ThemeToggle onToggle={props.onToggleTheme} theme={props.theme} />
            <button
              aria-label="로그아웃"
              className="icon-button"
              onClick={() => void props.onSignOut()}
              title="로그아웃"
              type="button"
            >
              <LogOut aria-hidden="true" size={15} />
            </button>
          </div>
        </header>
        <DiarySelector workspace={props.workspace} />
        <SectionNavigation
          activeSection={props.activeSection}
          className="desktop-navigation"
          onChange={props.onChangeSection}
        />
        <div className="desktop-sidebar__sharing">
          <p>TOGETHER DIARY</p>
          <span>COMING LATER</span>
          <button disabled type="button">+ INVITE</button>
        </div>
      </aside>

      <main className="desktop-center">
        <DiarySection
          activeSection={props.activeSection}
          calendar={props.calendar}
          onEdit={props.onEdit}
          workspace={props.workspace}
        />
      </main>

      <SelectedPanel
        calendar={props.calendar}
        onEdit={props.onEdit}
        workspace={props.workspace}
      />

      <ContextualAdd
        activeSection={props.activeSection}
        onSelect={props.onEdit}
        selectedDate={toDateKey(props.calendar.selectedDate)}
      />
    </div>
  );
}
