import { AppHeader } from '../../components/ui/AppHeader';
import { BottomNavigation } from '../../components/ui/BottomNavigation';
import { ContextualAdd } from '../../components/ui/ContextualAdd';
import { toDateKey } from '../calendar/lib/dateUtils';
import { DiarySection } from './DiarySection';
import type { DiaryLayoutProps } from './layoutTypes';

export function MobileDiaryLayout(props: DiaryLayoutProps) {
  return (
    <div className="mobile-layout">
      <AppHeader
        onSignOut={props.onSignOut}
        onToggleTheme={props.onToggleTheme}
        theme={props.theme}
        workspace={props.workspace}
      />
      <main className="mobile-layout__main">
        <DiarySection
          activeSection={props.activeSection}
          calendar={props.calendar}
          includeCalendarDetails
          onEdit={props.onEdit}
          workspace={props.workspace}
        />
      </main>
      <ContextualAdd
        activeSection={props.activeSection}
        onSelect={props.onEdit}
        selectedDate={toDateKey(props.calendar.selectedDate)}
      />
      <BottomNavigation
        activeSection={props.activeSection}
        onChange={props.onChangeSection}
      />
    </div>
  );
}
