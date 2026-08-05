import { LogOut } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { DiarySelector } from './DiarySelector';
import type { ThemeName } from '../../types';
import type { Workspace } from '../../features/workspace/hooks/useWorkspace';

interface AppHeaderProps {
  theme: ThemeName;
  workspace: Workspace;
  onSignOut: () => void | Promise<void>;
  onToggleTheme: () => void;
}

export function AppHeader({ onSignOut, theme, workspace, onToggleTheme }: AppHeaderProps) {
  return (
    <header className="app-header">
      <h1>SIDE BY DAY</h1>
      <div className="app-header__actions">
        <DiarySelector compact workspace={workspace} />
        <ThemeToggle onToggle={onToggleTheme} theme={theme} />
        <button
          aria-label="로그아웃"
          className="icon-button"
          onClick={() => void onSignOut()}
          title="로그아웃"
          type="button"
        >
          <LogOut aria-hidden="true" size={15} />
        </button>
      </div>
    </header>
  );
}
