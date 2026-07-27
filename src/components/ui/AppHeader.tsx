import { ThemeToggle } from './ThemeToggle';
import { DiarySelector } from './DiarySelector';
import type { ThemeName } from '../../types';
import type { Workspace } from '../../features/workspace/hooks/useWorkspace';

interface AppHeaderProps {
  theme: ThemeName;
  workspace: Workspace;
  onToggleTheme: () => void;
}

export function AppHeader({ theme, workspace, onToggleTheme }: AppHeaderProps) {
  return (
    <header className="app-header">
      <h1>SIDE BY DAY</h1>
      <div className="app-header__actions">
        <DiarySelector compact workspace={workspace} />
        <ThemeToggle onToggle={onToggleTheme} theme={theme} />
      </div>
    </header>
  );
}
