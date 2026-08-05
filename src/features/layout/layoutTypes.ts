import type { CalendarState } from '../calendar/hooks/useCalendar';
import type { Workspace } from '../workspace/hooks/useWorkspace';
import type {
  AppSection,
  ThemeName,
  WorkspaceEditorTarget,
} from '../../types';

export interface DiaryLayoutProps {
  activeSection: AppSection;
  calendar: CalendarState;
  theme: ThemeName;
  workspace: Workspace;
  onChangeSection: (section: AppSection) => void;
  onEdit: (target: WorkspaceEditorTarget) => void;
  onSignOut: () => void | Promise<void>;
  onToggleTheme: () => void;
}
