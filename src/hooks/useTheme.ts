import { useEffect, useState } from 'react';
import type { ThemeName } from '../types';

const STORAGE_KEY = 'side-by-day-theme';
const DEFAULT_THEME: ThemeName = 'light';
const themeColors: Record<ThemeName, string> = {
  light: '#FFFFFF',
  dark: '#000000',
};

function isThemeName(value: string | null): value is ThemeName {
  return value === 'light' || value === 'dark';
}

export function useTheme() {
  const [theme, setTheme] = useState<ThemeName>(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    return isThemeName(savedTheme) ? savedTheme : DEFAULT_THEME;
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

  return { theme, toggleTheme };
}
