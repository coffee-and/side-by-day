import { useState } from 'react';
import { useCalendar } from './features/calendar/hooks/useCalendar';
import { DesktopDiaryLayout } from './features/layout/DesktopDiaryLayout';
import type { DiaryLayoutProps } from './features/layout/layoutTypes';
import { MobileDiaryLayout } from './features/layout/MobileDiaryLayout';
import { TabletDiaryLayout } from './features/layout/TabletDiaryLayout';
import { useResponsiveLayout } from './features/layout/useResponsiveLayout';
import { WorkspaceEditor } from './features/workspace/components/WorkspaceEditor';
import { useWorkspace } from './features/workspace/hooks/useWorkspace';
import { useTheme } from './hooks/useTheme';
import type { AppSection, WorkspaceEditorTarget } from './types';

export function App() {
  const { theme, toggleTheme } = useTheme();
  const workspace = useWorkspace();
  const calendar = useCalendar();
  const layout = useResponsiveLayout();
  const [activeSection, setActiveSection] = useState<AppSection>(
    () => layout === 'mobile' ? 'today' : 'calendar',
  );
  const [editorTarget, setEditorTarget] = useState<WorkspaceEditorTarget | null>(null);

  const layoutProps: DiaryLayoutProps = {
    activeSection,
    calendar,
    theme,
    workspace,
    onChangeSection: setActiveSection,
    onEdit: setEditorTarget,
    onToggleTheme: toggleTheme,
  };

  return (
    <>
      {layout === 'mobile' ? <MobileDiaryLayout {...layoutProps} /> : null}
      {layout === 'tablet' ? <TabletDiaryLayout {...layoutProps} /> : null}
      {layout === 'desktop' ? <DesktopDiaryLayout {...layoutProps} /> : null}
      {editorTarget ? (
        <WorkspaceEditor
          key={`${editorTarget.kind}-${editorTarget.id ?? 'new'}-${editorTarget.date ?? ''}`}
          onClose={() => setEditorTarget(null)}
          target={editorTarget}
          workspace={workspace}
        />
      ) : null}
    </>
  );
}
