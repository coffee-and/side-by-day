import { useEffect, useState } from 'react';
import type { ThemeName } from '../types';

const STORAGE_KEY = 'side-by-day-theme';
const DEFAULT_THEME: ThemeName = 'light';
const themeColors: Record<ThemeName, string> = {
  light: '#FFFFFF',
  dark: '#000000',
};

function normalizeTheme(value: string | null): ThemeName {
  return value === 'dark' ? 'dark' : 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState<ThemeName>(() => {
    return normalizeTheme(localStorage.getItem(STORAGE_KEY));
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
    document
      .querySelector<HTMLMetaElement>('meta[name="theme-color"]')
      ?.setAttribute('content', themeColors[theme]);
  }, [theme]);

  function toggleTheme() {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  }

  return { theme, setTheme, toggleTheme, defaultTheme: DEFAULT_THEME };
}
