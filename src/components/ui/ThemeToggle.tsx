import { Moon, Sun } from 'lucide-react';
import type { ThemeName } from '../../types';

interface ThemeToggleProps {
  theme: ThemeName;
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const nextTheme: ThemeName = theme === 'dark' ? 'light' : 'dark';
  const nextThemeLabel = nextTheme === 'light' ? '라이트' : '다크';
  const Icon = nextTheme === 'light' ? Sun : Moon;

  return (
    <button
      aria-label={`${nextThemeLabel} 테마로 변경`}
      className="theme-toggle"
      onClick={onToggle}
      title={`${nextThemeLabel} 테마로 변경`}
      type="button"
    >
      <Icon aria-hidden="true" size={18} strokeWidth={2} />
    </button>
  );
}
